import requests
from bs4 import BeautifulSoup

html = requests.get("https://en.wikipedia.org/wiki/List_of_Monty_Python_projects")
page = html.text
parsed = BeautifulSoup(page, "lxml")

tags = parsed.find("div", { "class": "mw-parser-output" })

projects = {}
current_category = None


for tag in tags:
    if tag.name == "h2":
        current_category = tag.text.replace("[edit]", "").strip()
        projects[current_category] = []
    elif tag.name == "ul": 
        for li in tag.find_all("li"):
            projects[current_category].append(li.text)


del projects["Notes"]
del projects["References"]
del projects["Further reading"]
from pprint import pprint
pprint(projects)