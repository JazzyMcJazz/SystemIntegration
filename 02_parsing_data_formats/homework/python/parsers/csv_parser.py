import csv

class CsvParser:
    def __init__(self) -> None:
        pass

    def parse():
        reader = csv.DictReader(open('../data/teams.csv', 'r'))
        teams = []
        for line in reader:
            teams.append(line)
        
        return teams