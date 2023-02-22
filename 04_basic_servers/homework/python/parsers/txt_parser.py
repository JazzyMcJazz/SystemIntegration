class TxtParser:
    
    def __init__(self) -> None:
        pass

    def parse():
        with open('../data/teams.txt') as f:
            lines = f.readlines()
        return TxtParser.__parse(lines)
    
    async def parseUpload(file):
        contents = await file.read()
        return TxtParser.__parse(contents.decode().split('\n'))
    
    def __parse(lines):
        teams = []
        teamsDict = {}
        
        # improvised parsing
        teamCount = 0
        for line in lines:

            # make a new dict in teamsDict (dict of dicts)
            # 'name' is the first key per team
            if line.startswith('name'): 
                teamCount += 1
                teamsDict[teamCount] = {}

            line = line.replace('\n', '') 

            if line == '':
                continue
            
            pairs = line.split('=') # split key/value pairs

            if pairs[0] == 'roster': # roster should be a list
                players = pairs[1].split(',')
                teamsDict[teamCount][pairs[0]] = players
            else :
                teamsDict[teamCount][pairs[0]] = pairs[1]
        
        # apped to array instead of keeping as dict (conforms to parsed results of other data types)
        for _, value in teamsDict.items(): 
            teams.append(value)
        
        return teams