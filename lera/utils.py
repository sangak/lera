import datetime
import calendar
import os
import random
import re
import string
from babel import numbers
import pendulum

from django.utils.safestring import mark_safe
from django.utils.text import slugify
from django.utils.translation import get_language
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.db.models import Q
from lera.aws.utils import PublicMediaStorage, PrivateMediaStorage

DEFAULT_ACTIVATION_DAYS = getattr(settings, 'DEFAULT_ACTIVATION_DAYS', 2)


def email_expire_duration(default_days=DEFAULT_ACTIVATION_DAYS):
    now = pendulum.now()
    start_range = now - pendulum.duration(days=default_days)
    end_range = now
    return start_range, end_range


def get_date_time_local(date_model, tz_info='Asia/Jakarta'):
    dt = pendulum.instance(date_model)
    zone_info = pendulum.timezone(tz_info)
    localtime = dt.astimezone(zone_info)
    return localtime


def last_time_today(date_model):
    last_time = date_model.max.time()
    dt = date_model.combine(date_model, last_time)
    tgl = pendulum.instance(dt, pendulum.tz.UTC)
    return tgl


def convert_string_to_datetime(str_date):
    dt = pendulum.parse(str_date)
    return dt


def get_time_diff(instance, interval='years'):
    start = instance.date_start
    end = instance.date_end
    start_date = pendulum.date(start.year, start.month, start.day)
    end_date = pendulum.date(end.year, end.month, end.day)
    timediff = end_date - start_date
    if interval == 'years':
        diff_ = timediff.years
    elif interval == 'months':
        diff_ = timediff.months
    else:
        diff_ = timediff.days
    return diff_


def get_due_date_time(date_model, skip, include_time=True):
    due_date = date_model + datetime.timedelta(days=skip)
    date_format = "%d-%m-%Y %H:%M:%S" if include_time else "%d-%m-%Y"
    return due_date.strftime(date_format)


def get_format_date_time(tanggal, include_time=True, full_year=False):
    if full_year:
        date_format = "%d-%m-%Y %H:%M:%S" if include_time else "%d %B %Y"
    else:
        date_format = "%d-%m-%y %H:%M:%S" if include_time else "%d-%m-%y"
    return tanggal.strftime(date_format)


def get_format_date_local(tanggal, full_year=False, tzinfo='Asia/Jakarta'):
    local_date = get_date_time_local(tanggal, tz_info=tzinfo)
    date_format = "%d %B %Y" if full_year else "%d/%m/%y"
    return local_date.strftime(date_format)


def get_last_month_date(dt_model):
    year = dt_model.year
    month = dt_model.month
    cal = calendar.monthrange(year, month)
    return cal[1]


def get_month_data_range(months_ago=1, include_this_month=False):
    today = datetime.datetime.now().today()
    dates_ = []
    if include_this_month:
        next_month = today.replace(day=28) + datetime.timedelta(days=4)
        start, end = get_last_month_date(next_month)
        dates_.insert(0, {
            "start": start.timestamp(),
            "end": end.timestamp(),
            "start_json": start.isoformat(),
            "end_json": end.isoformat(),
            "timesince": 0,
            "year": start.year,
            "month": str(start.strftime("%B")),
        })
    for x in range(0, months_ago):
        start, end = get_last_month_date(today)
        today = start
        dates_.insert(0, {
            "start": start.timestamp(),
            "end": end.timestamp(),
            "start_json": start.isoformat(),
            "end_json": end.isoformat(),
            "timesince": int((datetime.datetime.now() - end).total_seconds()),
            "year": start.year,
            "month": str(start.strftime("%B")),
        })
    return dates_


def get_filename(path):
    return os.path.basename(path)


def get_filename_ext(filepath):
    basename = os.path.basename(filepath)
    name, ext = os.path.splitext(basename)
    return name, ext


def saved_directory_based_app(instance, filename, app_name, is_include_klass=True, root=None):
    size = random.randint(3, 5)
    uid = instance.uid
    name, ext = get_filename_ext(filename)
    new_str = random_string_generator(size=size)
    directory_name = f"{app_name}/"
    if is_include_klass:
        klass = instance.__class__
        klass_name = klass.__name__
        directory_name = f"{str(klass_name.lower())}/{directory_name}"

    new_filename = "{}{}".format(uid, new_str)
    if root is None:
        final_name = f"{directory_name}{new_filename}{ext}"

    else:
        final_name = "{}/{}{}{}".format(
            root, directory_name, new_filename, ext
        )

    return final_name, filename


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def random_string_generator(size=10, chars=f"{string.ascii_lowercase}{string.digits}"):
    return ''.join(random.choice(chars) for _ in range(size))


def generate_password(size=8):
    chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$_'
    password = random_string_generator(size=size, chars=chars)
    return password


def unique_key_generator(instance):
    size = random.randint(8, 8)
    key = random_string_generator(size, chars='0123456789')
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(key=key).exists()
    if qs_exists:
        return unique_key_generator(instance)
    return key


def unique_id_generator(instance):
    size = random.randint(40, 45)
    new_id = random_string_generator(size=size)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(uid=new_id).exists()
    if qs_exists:
        return unique_slug_generator(instance)
    return new_id


def unique_channel_id(instance):
    new_id = random_string_generator(size=12)
    Klass = instance.__class__
    qs = Klass.objects.filter(channel_id=new_id)
    if qs.exists():
        return unique_channel_id(instance)
    return new_id


def unique_slug_generator(instance, new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        if instance.title:
            slug = slugify(instance.title)
        else:
            slug = random_string_generator(size=20)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).filter(
        ~Q(slug=instance.slug)
    ).exists()

    if qs_exists:
        new_slug = "{}-{}".format(
            slug, random_string_generator(size=6)
        )
        return unique_slug_generator(instance, new_slug=new_slug)

    return slug


def currency(amount):
    lang = get_language()
    return numbers.format_decimal(amount, locale=lang)


def year_list(years=5, start=15):
    current_year = datetime.datetime.today().year - start
    list_of_year = [current_year - i for i in range(years)]
    keys = [str(x) for x in list_of_year]
    return tuple(zip(keys, keys))


def string_separator_to_number(string_number):
    pattern = r"\,|\.|(?=\d{3})\,|\.|-"
    angka = re.sub(pattern, "", string_number)
    return int(angka)


def parse_amount(instance, request=None):
    cur = instance.get('currency')
    amount = instance.get('amount')
    if request is None:
        bhs = 'en'
    else:
        bhs = request.LANGUAGE_CODE

    pattern = '#,##0.##;(#)' if bhs == 'en' else '#.##0,##;(#)'
    dec = numbers.format_decimal(amount, format=pattern, locale=bhs)
    amount_ = f'''
                    <div class="d-flex justify-content-between align-items-center">
                        <span>{cur}</span>
                        <span class="ms-auto me-0">{dec}</span>
                    </div>
                '''
    return mark_safe(amount_)


def parse_amount_curr(instance, request=None):
    cur = instance.get('currency')
    amount = instance.get('amount')
    if request is None:
        bhs = 'en'
    else:
        bhs = request.LANGUAGE_CODE

    pattern = '#,##0.##;(#)' if bhs == 'en' else '#.##0,##;(#)'
    dec = numbers.format_decimal(amount, format=pattern, locale=bhs)
    amount_ = f"{cur} {dec}"
    return mark_safe(amount_)


def convert_date_to_wib(tgl):
    dt = pendulum.instance(tgl)
    tz = pendulum.timezone('Asia/Jakarta')
    wib = dt.astimezone(tz)
    return wib.to_datetime_string()


def convert_date_to_iso(tgl):
    dt = pendulum.instance(tgl)
    tz = pendulum.timezone('Asia/Jakarta')
    wib = dt.astimezone(tz)
    return wib.to_iso8601_string()


def twitter_style(twit: str):
    twit_style = twit.lower().replace(" ", "")
    return twit_style


def file_storage(base_url=settings.BASE_URL, protected=False):
    if '127.0.0.1' in base_url:
        if protected:
            return FileSystemStorage(location=settings.PROTECTED_ROOT)
        return FileSystemStorage(location=settings.MEDIA_ROOT)
    else:
        if protected:
            return PrivateMediaStorage
        return PublicMediaStorage