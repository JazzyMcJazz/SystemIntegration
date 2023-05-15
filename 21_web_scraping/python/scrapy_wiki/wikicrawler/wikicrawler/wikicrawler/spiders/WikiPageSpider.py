import scrapy


class WikipagespiderSpider(scrapy.Spider):
    name = "WikiPageSpider"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = ["https://en.wikipedia.org/wiki/List_of_common_misconceptions"]

    def parse(self, response):
        pass
