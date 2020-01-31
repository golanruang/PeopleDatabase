"""
Author: Nicholas Liu + Commenting by Rolan because Nicholas can't comment
Date: January 2020
Purpose: Convert a text file with info(data.txt) to a json object in another text file
"""
from os.path import isfile

def convertData():
    dataHold = []
    dataTemp = ""
    WRITEPEOPLE = False                     # when to write people part of the json obj
    WRITECOMPANY = False                    # when to write company part of the json obj
    datafile = open("data.txt", 'r')
    jsonfile = open("json.txt",'w')
    for line in datafile:
        if line[:2] == "//":                # skip the comment in the data file
            continue

        if line == "":                      # skip blank lines
            continue

        if line.strip() == "PSTOP":         # finds the end of the person data
            WRITEPEOPLE = False
            WRITECOMPANY = False
            jsonfile.write('\n\t],')
            continue

        if line.strip() == "CSTOP":         # finds the end of the company data
            WRITEPEOPLE = False
            WRITECOMPANY = False
            jsonfile.write('\n\t]\n};')
            continue

        if line.strip() == "PEOPLE":        # finds the start of the people data
            WRITEPEOPLE = True
            WRITECOMPANY = False
            jsonfile.write('var richPeopleData = {\n\t"people":[')
            continue

        elif line.strip() == "COMPANY":     # finds the start of the company data
            WRITEPEOPLE = False
            WRITECOMPANY = True
            jsonfile.write('\n\t"companies":[')
            continue

        if WRITEPEOPLE:                     # if writing people part of json obj
            for char in line:
                if char != ",":
                    dataTemp += char
                elif "[" in dataTemp and "]" not in dataTemp:
                    dataTemp += char
                else:
                    dataHold.append(dataTemp.strip())
                    dataTemp = ""           # formatting for json obj
            jsonfile.write('\n\t\t{\n\t\t\t"id":%s,\n\t\t\t"name":"%s",\n\t\t\t"netWorth":"%s",\n\t\t\t"occupation":"%s",\n\t\t\t"chonkiness":"%s",\n\t\t\t"companies":%s,\n\t\t\t"alphaLevel":"%s",\n\t\t\t"attractiveness":"%s",\n\t\t},' % (dataHold[0], dataHold[1], dataHold[2], dataHold[3], dataHold[4], dataHold[5], dataHold[6], dataHold[7]))
            dataHold = []

        if WRITECOMPANY:                    # if writing company part of json obj
            for char in line:
                if char != ",":
                    dataTemp += char
                else:
                    dataHold.append(dataTemp.strip())
                    dataTemp = ""           # formatting for json
            jsonfile.write('\n\t\t{"id":%s,\n\t\t\t"name":"%s",\n\t\t\t"stonks":"%s",\n\t\t\t"employees":"%s",\n\t\t\t"description":"%s",\n\t\t},' % (dataHold[0], dataHold[1], dataHold[2], dataHold[3], dataHold[4]))
            dataHold = []

    datafile.close()                        # close the txt files
    jsonfile.close()


def main():
    convertData()

main()
