from django.utils.translation import gettext_lazy as _
from django.urls import reverse_lazy, reverse

contents = {
    "menu": [
        {
            "title": _("Tentang Kami"),
            "uri": "about-us",
            "has_dropdown": False,
            "is_navbar": True,
            "link": reverse_lazy("landing:about"),
            # "has_breadcrumb": True,
            # "breadcrumb_title": _("Tentang Kami"),
            # "breadcrumb_subtitle": _("Siapa Kami?"),
            # "breadcrumbs": [
            #     {'link': f"{reverse_lazy('about-us')}", "title": _("Beranda")},
            #     {"link": "#", "title": _("Tentang Kami")}
            # ]
        },
        {
            "title": _("Visi & Misi"),
            "uri": "vision-and-mission",
            "has_dropdown": False,
            "is_navbar": True,
            "link": "#",
        },
        {
            "title": "Program",
            "uri": "program",
            "has_dropdown": False,
            "is_navbar": True,
            "link": reverse_lazy("landing:program"),
        },
        {
            "title": _("Berita & Artikel"),
            "uri": "news-update",
            "link": "#",
            "has_dropdown": True,
            "is_navbar": True,
            "dropdown": [
                {
                    "title": _("Berita"),
                    "link": "#"
                },
                {
                    "title": _("Artikel"),
                    "link": "#"
                },
                {
                    "title": _("Blog"),
                    "link": "#"
                }
            ]
        },
        {
            "title": _("Hubungi Kami"),
            "uri": "contact-us",
            "has_dropdown": False,
            "is_navbar": True,
            "link": reverse_lazy("landing:contact"),
        },
        {
            "title": _("Bantuan"),
            "uri": "support",
            "is_navbar": False,
            "link": "#",
        },
        {
            "title": _("Keamanan Data"),
            "uri": "data-security",
            "is_navbar": False,
            "link": "#",
        },
        {
            "title": _('Privasi dan Kebijakan'),
            "uri": "privacy-policy",
            "is_navbar": False,
            "link": "#",
        },
        {
            "title": _("Syarat & Ketentuan"),
            "uri": "terms-conditions",
            "is_navbar": False,
            "link": "#",
        }
    ],
    "pages": [
        {
            "title": _("Beranda"),
            "section": {
                "hero": {
                    "title": _("Mentransformasi Investasi CSR <br/>Menjadi Dampak Nyata dan Berkelanjutan"),
                    "brief_desc": _('''
                        LERA menghubungkan visi strategis korporasi dengan kebutuhan riil 
                        masyarakat di lingkungan melalui pendekatan professional berbasis bukti.
                    '''),
                    "back_img": "charity.jpg",
                    "buttons": [
                        {
                            "title": _("Konsultasi Strategi Anda"),
                            "link": '#'
                        },
                        {
                            "title": _("Pelajari Layanan Kami"),
                            "link": '#'
                        }
                    ]
                },
                "featured_product": {
                    "title": _('Produk & Layanan Unggulan'),
                    "brief_desc": _('''
                        Tingkatkan wawasan Anda bersama kami. Pelajari segala hal tentang <em>machine 
                        learning</em> dalam menyelesaikan permasalahan sosial.
                    '''),
                    "carousel": [
                        {
                            "title": _("Strategi & Tata Kelola CSR"),
                            "brief_desc": _('''
                                Penyusunan <em>Theory of Change</em>, Audit Materialitas, 
                                dan Roadmap CSR jangka panjang.
                            '''),
                            'img': 'img/charity/cause01.jpg',
                            'alt': 'Image description'
                        },
                        {
                            "title": _("Kinerja Sosial & Stakeholder"),
                            "brief_desc": _('''
                                <em>Community Mapping</em>, mitigasi konflik, dan penguatan <em>Social License to 
                                Operate</em> (SLO) untuk perusahaan dan masyarakat.
                            '''),
                            'img': 'img/charity/cause02.jpg',
                            'alt': 'Image description'
                        },
                        {
                            "title": _("Pemberdayaan Masyarakat"),
                            "brief_desc": _('''
                                Pengembangan ekonomi lokal, UMKM, serta pemberdayaan perempuan dan pemuda.
                            '''),
                            'img': 'img/charity/cause03.jpg',
                            'alt': 'Image description'
                        },
                        {
                            "title": _("Layanan Lingkungan & Iklim"),
                            "brief_desc": _('''
                                Perhitungan jejak karbon, strategi emisi, dan dukungan Program Penilaian 
                                Peringkat Kinerja Perusahaan.
                            '''),
                            'img': 'img/charity/cause04.jpg',
                            'alt': 'Image description'
                        },
                        {
                            "title": _("Branding & Komunikasi"),
                            "brief_desc": _('''
                                Mengemas komitmen CSR menjadi reputasi positif yang kredibel bagi publik
                            '''),
                            'img': 'img/charity/cause06.jpg',
                            'alt': 'Image description'
                        }
                    ]
                },
                "strategic_challenges": {
                    "title": _("Tantangan Strategis CSR"),
                    "brief_desc": _('''
                        Banyak organisasi menghadapi celah kapasitas dalam mengelola CSR. 
                        Kami hadir untuk menjawab 7 tantangan inti.
                    '''),
                    "details": [
                        {
                            "icon": "fluent-mdl2:compliance-audit",
                            "desc": _('''
                                Transisi dari kepatuhan (<em>compliance</em>) menuju strategis bisnis.
                            ''')
                        },
                        {
                            "icon": "grommet-icons:stakeholder",
                            "desc": _('''
                                Fragmentasi keterlibatan pemangku kepentingan.
                            ''')
                        },
                        {
                            "icon": "tdesign:indicator",
                            "desc": _('''
                                Standarisasi pengukuran dampak yang belum optimal.
                            ''')
                        },

                        {
                            "icon": "grommet-icons:line-chart",
                            "desc": _('''
                                Tingginya ekspektasi pasar terhadap standar ESG.
                            ''')
                        },

                        {
                            "icon": "lucide:git-merge-conflict",
                            "desc": _('''
                                Mitigasi konflik sosial dan risiko operasional.
                            ''')
                        },

                        {
                            "icon": "carbon:sustainability",
                            "desc": _('''
                                Tekanan peningkatan <em>sustainability rating</em>.
                            ''')
                        },

                        {
                            "icon": "grommet-icons:document-performance",
                            "desc": _('''
                                Transparansi reputasi di era digital.
                            ''')
                        }
                    ]
                },
                "our_team": {
                    "title": _("Tim Kami"),
                    "brief_desc": _('''
                        Didukung oleh tenaga profesional berpengalaman yang berkompeten 
                        di bidangnya untuk memastikan kesuksesan proyek Anda.
                    '''),
                    "details": [
                        {
                            "full_name": "Armaen",
                            "occupation": "Tukang Pikir",
                            "img": "img/client/09.jpg",
                            "sosmed": [
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "X",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "LinkedIn",
                                    "link": "",
                                    "icon": ""
                                }
                            ]
                        },
                        {
                            "full_name": "Emil",
                            "occupation": "Tukang Tulis",
                            "img": "img/client/10.jpg",
                            "sosmed": [
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "X",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "LinkedIn",
                                    "link": "",
                                    "icon": ""
                                }
                            ]
                        },
                        {
                            "full_name": "Nelli",
                            "occupation": "Tukang Hitung",
                            "img": "img/client/15.jpg",
                            "sosmed": [
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "X",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "LinkedIn",
                                    "link": "",
                                    "icon": ""
                                }
                            ]
                        },
                        {
                            "full_name": "Mawardi",
                            "occupation": "Tukang Ketik",
                            "img": "img/client/14.jpg",
                            "sosmed": [
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "Instagram",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "X",
                                    "link": "",
                                    "icon": ""
                                },
                                {
                                    "title": "LinkedIn",
                                    "link": "",
                                    "icon": ""
                                }
                            ]
                        }
                    ]
                }
            }
        }
    ]
}