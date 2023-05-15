import requests
from bs4 import BeautifulSoup
import re

BASE_URL = "https://en.wikipedia.org"

visited_pages = set()
visit_queue = []


def get_parsed_wiki_page(path):
    html_page = requests.get(BASE_URL + path).text
    parsed_page = BeautifulSoup(html_page, "lxml")
    print("Parsed page: ", parsed_page.title.text)
    return parsed_page

# Rules for internal Wikipedia links:
# They reside within the div with the id set to bodyContent
# The URLs do not contain colons
# The URLs begin with /wiki/
def get_internal_wiki_link_tags(parsed_page):
    return parsed_page.find('div', { "id": "bodyContent" }).find_all('a', href=re.compile("^(/wiki/)((?!:).)*$"))

def add_paths_to_visit_queue(link_tags):
    # no links found
    if link_tags is None:
        return

    new_queue = []
    for tag in link_tags:
        if "href" in tag.attrs:
            internal_link = tag.attrs["href"]
            if internal_link not in visited_pages and internal_link not in visit_queue:
                new_queue.append(internal_link)
    
    return new_queue



parsed_root_page = get_parsed_wiki_page("/wiki/Monty_Python")
root_internal_links = get_internal_wiki_link_tags(parsed_root_page)
visit_queue = add_paths_to_visit_queue(root_internal_links)

pages_scraped = 0
for i in range(5):
    print("Iteration: ", i)
    new_visit_queue = []
    for path in visit_queue:
        page = get_parsed_wiki_page(path)
        internal_links = get_internal_wiki_link_tags(page)
        new_visit_queue = add_paths_to_visit_queue(internal_links)
        visited_pages.add(path)
        pages_scraped += 1
    
    visit_queue.extend(new_visit_queue)

print("Pages scraped: ", pages_scraped)