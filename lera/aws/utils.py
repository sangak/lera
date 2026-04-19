import mimetypes

from storages.backends.s3boto3 import S3Boto3Storage
from .conf import (
    AWS_STATIC_LOCATION, AWS_PUBLIC_MEDIA_LOCATION, AWS_PRIVATE_MEDIA_LOCATION,
    AWS_S3_REGION_NAME
)


class SafeS3Boto3Storage(S3Boto3Storage):
    """
    Base S3 storage with safety fix for empty key lookups.
    Prevents 400 Bad Request during collectstatic.
    """

    def __init__(self, *args, **kwargs):
        kwargs["region_name"] = AWS_S3_REGION_NAME
        super().__init__(*args, **kwargs)

    def exists(self, name):
        if not name:
            return False
        return super().exists(name)


class StaticStorage(SafeS3Boto3Storage):
    location = AWS_STATIC_LOCATION
    default_acl = "public-read"
    # file_overwrites = True

    def get_object_parameters(self, name):
        params = super().get_object_parameters(name)
        content_type, _ = mimetypes.guess_type(name)
        if content_type:
            params["ContentType"] = content_type
        return params


class PublicMediaStorage(SafeS3Boto3Storage):
    location = AWS_PUBLIC_MEDIA_LOCATION
    default_acl = "public-read"
    file_overwrite = False


class PrivateMediaStorage(SafeS3Boto3Storage):
    location = AWS_PRIVATE_MEDIA_LOCATION
    default_acl = "private"
    file_overwrite = False
    custom_domain = False