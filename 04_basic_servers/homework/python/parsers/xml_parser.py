import xml.etree.ElementTree as ET

class XmlParser:
    
    def __init__(self) -> None:
        pass

    def parse():
        tree = ET.parse(open('../data/teams.xml', 'r'))
        return XmlParser.__parse(tree)
    
    def parseUpload(file):
        tree = ET.parse(file)
        return XmlParser.__parse(tree)
    
    def __parse(tree):
        root = tree.getroot()
        
        teams = []
        for data in root.findall('./'):
            team = {}
            for prop in data:
                if prop.tag == 'roster':
                    players = []
                    for player in prop:
                        players.append(player.text)
                    team[prop.tag] = players
                else:
                    team[prop.tag] = prop.text
            teams.append(team)
        return teams