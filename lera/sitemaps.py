import pendulum
from datetime import timezone
from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse


class StaticSitemap(Sitemap):
    priority = 0.5
    # changefreq = 'weekly'
    protocol = 'https'

    def items(self):
        return [
            'landing:index',
            'landing:about',
            'landing:vision-mission',
            'landing:program',
            'landing:contact'
        ]

    def location(self, item):
        return reverse(item)

    def lastmod(self, item):
        print(item)
        now = pendulum.now('Asia/Jakarta')
        return now