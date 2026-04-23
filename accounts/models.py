from datetime import timedelta
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models import Q
from django.db.models.signals import post_save, pre_save
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext as _
from django.urls import reverse

from lera.utils import (
    unique_id_generator, get_format_date_local, get_date_time_local,
    get_due_date_time, saved_directory_based_app, email_expire_duration,
    unique_key_generator, file_storage, unique_slug_generator, DEFAULT_ACTIVATION_DAYS
)

from lera.helpers import BaseModel, split_name
from pgcrypto.fields import EncryptedCharField, EncryptedEmailField, EncryptedDateField
from thumbnails.fields import ImageField
from lera.variables import (
    LANGUAGES, GENDER_CHOICES
)


def save_photo_avatar(instance, filename):
    final_name, _ = saved_directory_based_app(instance, filename, app_name='profile', is_include_klass=False)
    return final_name


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        user_obj = self.model(email=self.normalize_email(email), **extra_fields)
        user_obj.set_password(password)
        user_obj.save()
        return user_obj

    def create_staffing(self, email, first_name=None, last_name=None, password=None):
        user_obj = self.create_user(
            email, first_name=first_name,
            last_name=last_name,
            password=password,
            is_staff=True
        )
        return user_obj

    def create_superuser(self, email, first_name=None, last_name=None, password=None):
        user_obj = self.create_user(
            email, first_name=first_name,
            last_name=last_name,
            password=password,
            is_staff=True, is_admin=True
        )
        return user_obj

    def user_exists(self, email):
        qs = self.filter(email=email)
        return True if qs.exists() else False

    def is_inactive(self, email):
        qs = self.filter(email=email, is_active=False)
        return True if qs.exists() else False


class User(AbstractBaseUser, BaseModel):
    email = EncryptedEmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    is_profile_filled = models.BooleanField(default=False)
    is_password_changed = models.BooleanField(default=False)
    last_change_password = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = UserManager()

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return reverse('accounts:update', kwargs={'uid': self.uid})

    @property
    def full_name(self):
        if self.last_name:
            return f'{self.first_name} {self.last_name}'
        return f'{self.first_name}'

    @full_name.setter
    def full_name(self, value):
        self.first_name, self.last_name = split_name(value)
        self.save()

    @property
    def offer_display_name(self):
        if self.last_name:
            return f"{self.first_name} {self.last_name[:1]}"
        return self.first_name

    @property
    def is_admin(self):
        return self.admin

    @is_admin.setter
    def is_admin(self, value):
        self.admin = value
        self.save()

    @property
    def is_staff(self):
        return self.staff

    @is_staff.setter
    def is_staff(self, value):
        self.staff = value
        self.save()

    @property
    def pre_icon(self):
        full_name = self.full_name.split(" ")
        icon = str()
        if len(full_name) > 2:
            full_name = full_name[:2]
        for name in full_name:
            icon += name[0]
        return icon

    @property
    def has_change_password(self):
        return self.is_password_changed

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def save_profile(self):
        try:
            self.is_profile_filled = True
            self.save()
            return True
        except ValueError:
            return False


class EmailActivationQuerySet(models.query.QuerySet):
    def confirmable(self):
        start_range, end_range = email_expire_duration(DEFAULT_ACTIVATION_DAYS)
        return self.filter(
            activated=False, force_expired=False
        ).filter(
            date_created__gt=start_range, date_created__lte=end_range
        )


class EmailActivationManager(models.Manager):
    def get_queryset(self):
        return EmailActivationQuerySet(self.model, using=self._db)

    def confirmable(self):
        return self.get_queryset().confirmable()

    def email_exists(self, email):
        return self.get_queryset().filter(
            Q(email=email) | Q(user__email=email)
        ).filter(activated=False)

    def can_activated(self, pk):
        return self.get_queryset().filter(pk=pk)


class EmailActivation(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = EncryptedEmailField()
    key = models.CharField(max_length=100, blank=True, null=True)
    activated = models.BooleanField(default=False)
    force_expired = models.BooleanField(default=False)
    expires = models.SmallIntegerField(default=DEFAULT_ACTIVATION_DAYS)

    objects = EmailActivationManager()

    def __str__(self):
        return self.email

    def can_activate(self):
        qs = EmailActivation.objects.filter(pk=self.pk).confirmable()
        if qs.exists():
            return True
        return False

    def activate(self, pk):
        if self.can_activate():
            user = self.user
            user.is_active = True
            user.save()
            self.activated = True
            self.save()
            return True
        return False

    def regenerate(self):
        self.key = None
        self.save()
        if self.key is not None:
            return True
        return False

    @property
    def get_due_date(self):
        local_date = get_date_time_local(self.date_created)
        return get_due_date_time(local_date, self.expires)

    def send_activation(self):
        if not self.activated and not self.force_expired:
            if self.key:
                user_data = {
                    'first_name': str(self.user.first_name),
                    'full_name': str(self.user.full_name),
                    'key': str(self.key),
                    'email': str(self.email),
                    'expires': str(self.get_due_date)
                }
                return user_data
        return False


def pre_save_email_activation(instance, *args, **kwargs):
    if not instance.activated and not instance.force_expired:
        if not instance.key:
            instance.key = unique_key_generator(instance)


pre_save.connect(pre_save_email_activation, sender=EmailActivation)


class ProfileQuerySet(models.query.QuerySet):
    def recent(self):
        return self.order_by('-date_updated')

    def profile_by_uid(self, uid):
        return self.filter(uid=uid)


class ProfileManager(models.Manager):
    def get_queryset(self):
        return ProfileQuerySet(self.model, using=self._db)

    def profile_by_uid(self, uid):
        qs = self.get_queryset().profile_by_uid(uid)
        if qs.exists():
            return qs.first()
        return None


class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    no_tel = models.CharField(max_length=20, null=True, blank=True)
    birthday = EncryptedDateField(null=True, blank=True)
    display_name = models.CharField(max_length=100, null=True, blank=True)
    language = models.CharField(default=settings.LANGUAGE_CODE, max_length=2)
    photo = ImageField(upload_to=save_photo_avatar, resize_source_to='medium',
                       null=True, blank=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, null=True, blank=True)

    objects = ProfileManager()

    def __str__(self):
        return self.user.full_name

    # def get_absolute_url(self):
    #     return reverse('account:profile-update', kwargs={'uid': self.uid})
    #
    # def get_post_registration_url(self):
    #     return reverse('account:profile-post-registration', kwargs={'uid': self.uid})

    def profile_filled(self):
        self.user.save_profile()

    def check_photo_is_available(self):
        try:
            if self.photo.url:
                return True
        except ValueError as e:
            return False

    @property
    def photo_avatar(self):
        if self.check_photo_is_available():
            return self.photo.url
        return self.user.pre_icon

    @property
    def photo_avatar_small(self):
        if self.check_photo_is_available():
            return self.photo.thumbnail.small.url
        return self.user.pre_icon

    @property
    def joined(self):
        created_at = self.user.date_created
        return get_format_date_local(created_at, full_year=True)

    @property
    def get_display_name(self):
        if self.display_name:
            return self.display_name
        return self.user.offer_display_name

    @property
    def dob(self):
        if self.birthday:
            return self.birthday.day
        return None

    @property
    def mob(self):
        if self.birthday:
            return self.birthday.month
        return None

    @property
    def yob(self):
        if self.birthday:
            return self.birthday.year
        return None

    def save_language(self, lang):
        self.language = lang
        try:
            self.save()
        except ValueError:
            return False
        return True


def pre_save_user_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_user_create, sender=User)


def post_save_user_create(instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)

        obj = EmailActivation.objects.create(user=instance, email=instance.email)
        obj.send_activation()


post_save.connect(post_save_user_create, sender=User)


def pre_save_user_profile_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_user_profile_create, sender=Profile)


class UserLoginQuerySet(models.query.QuerySet):
    def recent(self):
        return self.order_by('id')


class UserLoginManager(models.Manager):
    def get_queryset(self):
        return UserLoginQuerySet(self.model, using=self._db)

    def create_user_login(self, request, session_key):
        try:
            self.create(
                user=request.user, session_key=session_key
            )
            return True
        except:
            return False


class UserSession(BaseModel):
    user = models.OneToOneField(User, verbose_name='Staff', on_delete=models.CASCADE, related_name='active_session')
    session_key = models.CharField(
        max_length=255, verbose_name='Session key', blank=True, null=True
    )
    token_key = models.CharField(max_length=255, blank=True, null=True)
    device_info = models.CharField(max_length=255, blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    objects = UserLoginManager()

    class Meta:
        unique_together = ('user', 'device_info')

    def __str__(self):
        return f"{self.user.email} session"

    def is_expired(self):
        return self.expires_at and timezone.now() > self.expires_at

    def refresh_expiry(self, duration_minutes=30):
        self.expires_at = timezone.now() + timedelta(minutes=duration_minutes)
        self.save(update_fields=['expires_at', 'date_updated'])


def pre_save_user_session_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_user_session_create, sender=UserSession)