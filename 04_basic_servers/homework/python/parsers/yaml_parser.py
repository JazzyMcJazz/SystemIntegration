import yaml

class YamlParser:
    
    def __init__(self) -> None:
        pass

    def parse():
        with open('../data/teams.yaml') as f:
            data = yaml.safe_load(f)
            teams = []
            for team in data['teams']:
                teams.append(team['team'])
            return teams
