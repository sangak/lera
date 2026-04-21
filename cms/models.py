from django.db import models
from django.conf import settings
from django.template.defaultfilters import title
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save, pre_save
from django.db.models import Q
from thumbnails.fields import ImageField

from lera.helpers import BaseModel
from lera.utils import (
    unique_id_generator, saved_directory_based_app, unique_slug_generator
)


class Language(BaseModel):
    code = models.CharField(max_length=2, unique=True)
    lang = models.CharField(max_length=20, unique=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return self.code


def pre_save_language_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_language_create, sender=Language)


class Menu(BaseModel):
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="menus", null=True, blank=True)
    title = models.CharField(max_length=50, unique=True)
    uri = models.CharField(max_length=60, unique=True)
    is_navbar = models.BooleanField(default=True)
    link = models.CharField(max_length=100, default="#")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']

    @property
    def has_submenu(self):
        try:
            if self.submenu.count() > 0:
                return True
            else:
                return False
        except ValueError as e:
            return False

    def has_breadcrumb(self):
        try:
            if self.breadcrumbs:
                return True
        except ValueError as e:
            return False


def pre_save_menu_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_menu_create, sender=Menu)


class SubMenu(BaseModel):
    parent = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True, blank=True, related_name='submenu')
    title = models.CharField(max_length=50, unique=True, null=True, blank=True)
    link = models.CharField(max_length=100, default="#")

    def __str__(self):
        return self.title


def pre_save_submenu_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_submenu_create, sender=SubMenu)


class Breadcrumb(BaseModel):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True, blank=True, related_name='breadcrumbs')
    title = models.CharField(max_length=50, null=True, blank=True)
    link = models.CharField(max_length=100, null=True, blank=True, default="#")

    def __str__(self):
        return self.title


def pre_save_breadcrumb_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_breadcrumb_create, sender=Breadcrumb)


class Page(BaseModel):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="pages", null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.title


def pre_save_page_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_page_create, sender=Page)


class SectionQuerySet(models.query.QuerySet):
    def recent(self):
        return self.order_by("-date_updated")

    def get_section(self, title):
        return self.filter(title=title)


class SectionManager(models.Manager):
    def get_queryset(self):
        return SectionQuerySet(self.model, using=self._db)

    def all_sections(self):
        return self.get_queryset().filter(~Q(title="Hero"))

    def get_section(self, section):
        qs = self.get_queryset().get_section(section)
        if qs.exists():
            return qs.first()
        return None


class Section(BaseModel):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="sections", null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=250, null=True, blank=True, editable=False)

    objects = SectionManager()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']


def pre_save_section_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


def post_save_section_create(instance, created, *args, **kwargs):
    if created:
        instance.slug = unique_slug_generator(instance)
        instance.save()


pre_save.connect(pre_save_section_create, sender=Section)
post_save.connect(post_save_section_create, sender=Section)


def save_image_subsection(instance, filename):
    final_name, _ = saved_directory_based_app(instance, filename, app_name='subsection', is_include_klass=False)
    return final_name


class Button(BaseModel):
    title = models.CharField(max_length=100, null=True, blank=True)
    css_id = models.CharField(max_length=50, null=True, blank=True)
    css_class = models.CharField(max_length=150, null=True, blank=True)
    link = models.CharField(max_length=250, default="#")

    def __str__(self):
        return self.title


def pre_save_button_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_button_create, sender=Button)


class SubSection(BaseModel):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="subsections", null=True, blank=True)
    title = models.CharField(max_length=300, null=True, blank=True)
    brief_desc = models.TextField(null=True, blank=True)
    image = ImageField(upload_to=save_image_subsection, pregenerated_sizes=['avatar', 'small'], null=True,
                       blank=True)
    button = models.ManyToManyField(Button, related_name="subsections", blank=True)

    def __str__(self):
        return self.title


def pre_save_subsection_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_subsection_create, sender=SubSection)


def save_image_detail(instance, filename):
    final_name, _ = saved_directory_based_app(instance, filename, app_name='detail', is_include_klass=False)
    return final_name


DETAIL_TYPE_IMG_CHOICES = (
    ('ico', 'Icon'),
    ('img', 'Image'),
)


class Detail(BaseModel):
    subsection = models.ForeignKey(SubSection, on_delete=models.CASCADE, related_name="details", null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    brief_desc = models.TextField(null=True, blank=True)
    img_type = models.CharField(max_length=3, choices=DETAIL_TYPE_IMG_CHOICES, default='img')
    image = models.ImageField(upload_to=save_image_detail, null=True, blank=True)
    icon_name = models.CharField(max_length=100, null=True, blank=True)
    alt_text = models.CharField(max_length=150, default='Image Description')
    instagram = models.CharField(max_length=255, default='#')
    facebook = models.CharField(max_length=255, default='#')
    twitter = models.CharField(max_length=255, default='#')
    linkedin = models.CharField(max_length=255, default='#')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']


def pre_save_detail_create(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_detail_create, sender=Detail)