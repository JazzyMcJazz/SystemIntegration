import yaml

class YamlParser:
    
    def __init__(self) -> None:
        pass

    def parse():
        with open('../data/teams.yaml') as f:
            data = yaml.safe_load(f)
        return YamlParser.__parse(data)
    
    def parseUpload(file):
        data = yaml.safe_load(file)
        return YamlParser.__parse(data)
        
    def __parse(data):
        teams = []
        for line in data['teams']:
            teams.append(line)
        
        return teams
