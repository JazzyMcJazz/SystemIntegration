from parsers import JsonParser
from parsers import CsvParser
from parsers import XmlParser
from parsers import YamlParser
from parsers import TxtParser

parsedJSON = JsonParser.parse()
parsedCSV = CsvParser.parse()
parsedXML = XmlParser.parse()
parsedYAML = YamlParser.parse()
parsedTXT = TxtParser.parse()

print(parsedJSON)
print(parsedCSV)
print(parsedXML)
print(parsedYAML)
print(parsedTXT)
