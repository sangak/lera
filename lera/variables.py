from django.utils.translation import gettext_lazy as _

app_name = {
    'portal_app': 'LERA',
    'tagline': 'Yayasan Lingkar Lentera Raya',
    'website': 'https://www.lera.or.id',
    'email': 'contact@lera.or.id',
    'domain': 'lera.or.id',
    'version': 'alpha 1.0'
}

menu_setting = {
    'add_new': _('Tambah Baru'),
    'address': _('Alamat'),
    'birthday': _('Tanggal lahir'),
    'cancel': _('Batal'),
    'change_password': _('Ubah kata sandi'),
    'deactivate_account': _('Nonaktifkan akun'),
    'delete': _('Hapus'),
    'edit': _('Ubah'),
    'email_address': _('Alamat email'),
    'email_preferences': _('Preferensi Email'),
    'email_confirmation': _('Konfirmasi Email'),
    'finish': _('Selesai'),
    'forgot_password': _('Lupa kata sandi'),
    'full_name': _('Nama lengkap'),
    'gender': _('Jenis kelamin'),
    'language': _('Bahasa'),
    'next': _('Selanjutnya'),
    'no_data_available': _('Data tidak tersedia'),
    'previous': _('Sebelumnya'),
    'user_profile': _('Lihat Profil'),
    'save': _('Simpan'),
    'sign_in': _('Masuk'),
    'sign_out': _('Keluar'),
    'sign_up': _('Daftar'),
    'update': _('Pembaharui'),
    'privacy': _('Kebijakan Privasi'),
    'terms': _('Syarat & Ketentuan'),
    'password': _('Kata sandi'),
    'no_tel': _('No. WhasApp'),
    'password_confirmation': _('Konfirmasi kata sandi'),
    'settings': _('Pengaturan Akun'),
    'timezone': _('Zona waktu'),
    'postal_code': _('Kode pos'),
    'profile': _('Profil'),
}

GENDER_CHOICES = (
    ('ml', _('Pria')),
    ('fl', _('Wanita'))
)

LANGUAGES = (
    ('id', _('Bahasa Indonesia')),
    ('en', _('English')),
)

LABEL_TEXT = {
    'no_blank': _('%s tidak boleh kosong'),
    'been_used': _('%s tidak tersedia karena sudah digunakan'),
    'topics': _('Topik yang diminati'),
    'description': _('Keterangan'),
    'required': '<sup><span class="error d-inline">*</span></sup>',
    'please_select': '---- Silahkan Pilih ----',
    'is_personal': _('Rekening pribadi tidak memiliki %s'),
    'nik_pattern': "/^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/g",
    'npwp_pattern': "/^\\d{2}\\.?\\d{3}\\.?\\d{3}\\.?\\d{1}-?\\d{3}\\.?\\d{3}/g"
}

MONTH_CHOICES = (
    (1, _('Januari')),
    (2, _('Februari')),
    (3, _('Maret')),
    (4, _('April')),
    (5, _('Mei')),
    (6, _('Juni')),
    (7, _('Juli')),
    (8, _('Agustus')),
    (9, _('September')),
    (10, _('Oktober')),
    (11, _('November')),
    (12, _('Desember'))
)

SELECT_WIDGET_ATTRS = {
    'data-placeholder': LABEL_TEXT.get('please_select'),
    'data-minimum-results-for-search': 'Infinity',
    'data-allow-clear': False
}
SELECT_WIDGET_MODEL_NO_SEARCH_ATTRS = {
    'data-minimum-results-for-search': 'Infinity',
    "data-minimum-input-length": 0,
    "data-allow-clear": False
}

SELECT_WIDGET_MODEL_WITH_SEARCH_ATTRS = {
    # 'data-minimum-results-for-search': 'Infinity',
    "data-minimum-input-length": 0,
    "data-allow-clear": False
}

ORIENTATION_CHOICES = (
    (1, 'Landscape'),
    (2, 'Portrait')
)