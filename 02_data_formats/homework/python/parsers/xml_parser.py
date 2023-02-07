import xml.etree.ElementTree as ET

class XmlParser:
    
    def __init__(self) -> None:
        pass

    def parse():
        # open('../data/teams.xml', 'r')
        tree = ET.parse(open('../data/teams.xml', 'r'))
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