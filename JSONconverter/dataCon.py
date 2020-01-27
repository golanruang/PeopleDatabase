from os.path import isfile

def convertData():
    dataHold = []
    dataTemp = ""
    WRITEPEOPLE = False
    WRITECOMPANY = False
    datafile = open("data.txt", 'r')
    jsonfile = open("json.txt",'w')
    for line in datafile:
        if line[:2] == "//":
            continue

        if line == "":
            continue

        if line.strip() == "PSTOP":
            WRITEPEOPLE = False
            WRITECOMPANY = False
            jsonfile.write('\n\t],')
            continue

        if line.strip() == "CSTOP":
            WRITEPEOPLE = False
            WRITECOMPANY = False
            jsonfile.write('\n\t]\n};')
            continue

        if line.strip() == "PEOPLE":
            WRITEPEOPLE = True
            WRITECOMPANY = False
            jsonfile.write('var richPeopleData = {\n\t"people":[')
            continue

        elif line.strip() == "COMPANY":
            WRITEPEOPLE = False
            WRITECOMPANY = True
            jsonfile.write('\n\t"companies":[')
            continue

        if WRITEPEOPLE:
            for char in line:
                if char != ",":
                    dataTemp += char
                elif "[" in dataTemp and "]" not in dataTemp:
                    dataTemp += char
                else:
                    dataHold.append(dataTemp.strip())
                    dataTemp = ""
            print(dataHold)
            jsonfile.write('\n\t\t{\n\t\t\t"id":%s,\n\t\t\t"name":"%s",\n\t\t\t"netWorth":"%s",\n\t\t\t"occupation":"%s",\n\t\t\t"chonkiness":"%s",\n\t\t\t"companies":%s,\n\t\t\t"alphaLevel":"%s",\n\t\t\t"attractiveness":"%s",\n\t\t},' % (dataHold[0], dataHold[1], dataHold[2], dataHold[3], dataHold[4], dataHold[5], dataHold[6], dataHold[7]))
            dataHold = []

        if WRITECOMPANY:
            for char in line:
                if char != ",":
                    dataTemp += char
                else:
                    dataHold.append(dataTemp.strip())
                    dataTemp = ""
            print(dataHold)
            jsonfile.write('\n\t\t{"id":%s,\n\t\t\t"name":"%s",\n\t\t\t"stonks":"%s",\n\t\t\t"employees":"%s",\n\t\t\t"description":"%s",\n\t\t},' % (dataHold[0], dataHold[1], dataHold[2], dataHold[3], dataHold[4]))
            dataHold = []

    datafile.close()
    jsonfile.close()


def main():
    convertData()

main()
