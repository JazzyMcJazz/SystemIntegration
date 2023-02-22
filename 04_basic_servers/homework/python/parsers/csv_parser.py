import csv
import codecs

class CsvParser:
    def __init__(self) -> None:
        pass

    def parse():
        reader = csv.DictReader(open('../data/teams.csv', 'r'))
        return CsvParser.__parse(reader)
    
    def parseUpload(file):
        reader = csv.DictReader(codecs.iterdecode(file, 'utf-8'))
        return CsvParser.__parse(reader)
    
    def __parse(reader):
        teams = []
        for line in reader:
            teams.append(line)
        
        return teams