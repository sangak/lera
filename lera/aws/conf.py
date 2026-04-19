import datetime
from decouple import config

# --- AWS Credentials ---
AWS_ACCESS_KEY_ID = config("AWS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = "ap-southeast-1"
AWS_S3_SIGNATURE_VERSION = "s3v4"

# --- Domain / URL setup ---
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com"

# --- S3 behavior settings ---
AWS_QUERYSTRING_AUTH = False          # Don't append auth tokens to URLs
AWS_S3_FILE_OVERWRITE = False         # Avoid overwriting files with same name
AWS_DEFAULT_ACL = None                # We'll define ACLs per storage class
AWS_S3_ADDRESSING_STYLE = "path"

# --- Locations inside the bucket ---
AWS_STATIC_LOCATION = "cdn"
AWS_PUBLIC_MEDIA_LOCATION = "media"
AWS_PRIVATE_MEDIA_LOCATION = "protected"

# --- Storage backends ---
STATICFILES_STORAGE = "ideajar.aws.utils.StaticStorage"
DEFAULT_FILE_STORAGE = "ideajar.aws.utils.PublicMediaStorage"
PRIVATE_FILE_STORAGE = "ideajar.aws.utils.PrivateMediaStorage"

# --- URLs for serving static/media files ---
STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_STATIC_LOCATION}/"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_PUBLIC_MEDIA_LOCATION}/"
ADMIN_MEDIA_PREFIX = f"{STATIC_URL}admin/"

# --- Caching headers (optional, but good for performance) ---
one_month = datetime.timedelta(days=30)
expires = (datetime.date.today() + one_month).strftime("%A, %d %B %Y 20:00:00 GMT")

AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": f"max-age={int(one_month.total_seconds())}",
    "ContentDisposition": "inline",
    "Expires": expires,
}