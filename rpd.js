/*
Author: Lots of people
Date: January 2020
Purpose: js for richpeopledatabase; formats a bunch of stuff and accesses data from the json object
*/
var inCompanyIframe = false; /*variables tracking whether webpage is in one of three popup window types*/
var inAddPersonBox = false;
var inAddCompanyBox = false;
var sort = "" /*variable tracking by which category database is being sorted*/
var wikipediaUrl = "" /*due to jank with window.open, have to store wikipediaUrl as variable and open it in a separate function*/
var stonksCode; /*same story as last variable*/
changeSort('name') /*default sets to sort by name, first creates table*/

function convExp(toConvert) {
  /*
  Converts num in scientific notation to regular integer notation
  */
  var beginInt = toConvert.substring(0,3);
  var beginExp = "";
  beginExp = toConvert.substring(4,toConvert.length) // parses it at the e in the sci notation
  var int = parseFloat(beginInt);              // splits it in half(1/2 int 1/2 num zeros)
  var exp = parseInt(beginExp);
  var value = int * Math.pow(10, exp);         // multiplies the decimal by how many e's it has
  var valueInt = parseInt(value)
  return valueInt;                             // returns the integer form of scientific notation
}

function addCommasToInt(int) {
  /*
  Adds commas to the integers (since they are very big numbers)
  */
    var intString = int.toString();
    var stringWithCommas = intString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return stringWithCommas;
}

function updateTable() {
  /*
  Update the data table every time we get the dat afor one rich boi
  */
  clearTableRows();
  var table = document.getElementById("table");
  richPeopleData["people"].forEach(function(item) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = item.name;
    if(item.netWorth > 999) { /* rich people */
      cell2.innerHTML = "$" + addCommasToInt(convExp(item.netWorth)) + " ($" + expToTextDescription(item.netWorth) + ")";
    } else { /* not rich people */
      cell2.innerHTML = "$" + convExp(item.netWorth);
    }
    cell3.innerHTML = item.occupation;
    if(item.chonkiness > 9000) { /* don't know why but they wanted it */
      cell4.innerHTML = "over 9000";
    } else {
      cell4.innerHTML = item.chonkiness;
    }
    var companies = [];
    var companyIds = [];
    item.companies.forEach(function(item) { /* since company stored by ID, have to find company name + info here */
      var companyInfo = findCompany(item);    // find the company corresponding to a rich person
      if(companyInfo != "") {                 // add the info + format it
        if(companies.length >= 0) {
          companies.push(" " + capitalizeWords(companyInfo[1]));
          companyIds.push(companyInfo[0]);
        } else {
          companies.push(capitalizeWords(companyInfo[1]))
          companyIds.push(companyInfo[0]);
        }
      }
    })
    if (companies != []) {                    // if done finding companies
      cell5.innerHTML = companies;
      cell5.onclick = function() { displayCompany(companyIds[0]); };
    } else {                                  // if company name clicked display info box
      cell5.innerHTML = "none"
    }
    cell6.innerHTML = item.alphaLevel;
    cell7.innerHTML = item.attractiveness;
  });
}

function findCompany(idToFind) {
  /*
  finds company in json obj given the company's id
  */
  var toReturn = []
  richPeopleData["companies"].forEach(function(company) {
    if(company.id == idToFind) {              // all the stuff related to a company
      toReturn = [company.id, company.name, company.stonks, company.employees, company.description, company.logo, company.wikiPage, company.stonksCode];
    }
  });
  return toReturn;
}

function findCompanyByName(nameToFind) {
  /*
  finds a company give nthe company's name
  */
  var toReturn = []
  richPeopleData["companies"].forEach(function(company) {
    if(company.name.toUpperCase() == nameToFind.toUpperCase()) {          // if company's name is the name you want
      toReturn = [company.id, company.name, company.stonks, company.employees, company.description, company.logo, company.wikiPage, company.stonksCode];
    }
  });
  return toReturn;
}

function clearTableRows() {
  /*
  clears the rows of the table
  */
  var table = document.getElementById("table");
  var numRows = table.rows.length;
  while(numRows > 1) {
    table.deleteRow(table.rows.length - 1);
    numRows = numRows - 1;
  }
}

function capitalizeWords(words) {
  /*
  Capitalizes first letter of each word (pretty self explanatory)
  */
  var wordsArray = words.split(" ");        // makes an array of each letter in str
  var stringToReturn = ""
  for(i = 0; i < wordsArray.length; i++) {
      wordsArray[i] = wordsArray[i].slice(0, 1).toUpperCase() + wordsArray[i].slice(1, wordsArray[i].length);
      stringToReturn = stringToReturn + wordsArray[i] + " "
  }                                         // capitalize the words
  return stringToReturn.slice(0, stringToReturn.length - 1);
}

function changeSort(newSort) {
  /* exactly what it says it does */
  sort = newSort;
  sortRows();
}

function sortRows() {
  /*
  Purpose: Sort rows
  Parameters: None
  Return: None, but overwrites rows array in local storage with sorted array
  */
  var people = richPeopleData["people"];
  var temp = []
  var sortedArray = []
  var i = 0;
  richPeopleData["people"].forEach(function(item) {
    if(sort != "companies" && sort != "netWorth" && sort != "chonkiness" && sort != "alphaLevel" && sort != "attractiveness") {
      temp.push(item[sort].toLowerCase() + "," + i.toString());
    } else if (sort == "companies") {
      var companies = []
        var companyName = findCompany(item.companies[0])[1].toLowerCase();
        if(companyName != "") {
            temp.push(companyName + "," + i.toString());
        }
    } else if (sort == "netWorth") {
      netWorthVal = convExp(item[sort]);
      temp.push([netWorthVal, i])
    } else {
      temp.push([parseInt(item[sort]),i]);
    }
    i = i + 1;
  })
  temp.sort();
  if(sort != "netWorth" && sort != "chonkiness" && sort != "alphaLevel" && sort != "attractiveness") {
    for (j = 0; j < temp.length; j++) {
      splitString = temp[j].split(",");
      arrayIndex = splitString[1];
      sortedArray.push(people[arrayIndex]);
    }
  } else { //sorting by age, needs separate algorithm because can't sort 3-digit numbers as strings easily
    var rowIndexes = []; //array for indexes of ages in row array
    var min; //new variable to track smallest age in array
    var minIndex; //index of smallest age
    while(temp.length != 0) {
      min = Number.MAX_VALUE;
      minIndex = 0;
      for(var j = 0; j < temp.length; j++) { //loops through temp, finds smallest age
        if(temp[j][0] < min) {
          minIndex = j;
          min = temp[j][0];
        }
      }
      rowIndexes.push(temp[minIndex][1]); //adds index to array
      temp.splice(minIndex, 1); //removes age from temp array
    }
    for(l = 0; l < rowIndexes.length; l++) {
      sortedArray.push(people[rowIndexes[l]]); //adds rows to sorted rows array
    }
  }
  richPeopleData["people"] = sortedArray;     //updating table to sorted table
  updateTable();
}

function addPerson() {                        //collecting all the information for the rich person
    /*adds a new person to the array of people, checking if person is valid and if their company is in database*/
    var id = generateId();
    var nm = capitalizeWords(document.getElementById("nmInput").value); /*getting data from the input boxes in the form*/
    var nw = intToScientificNotation(document.getElementById("nwInput").value);
    var occ = document.getElementById("occInput").value;
    var chk = document.getElementById("chkInput").value;
    var comp = findCompanyByName(document.getElementById("compInput").value)[0];
    var al = document.getElementById("alInput").value;
    var att = document.getElementById("attInput").value;

    if(nm != "" && findCompanyByName(document.getElementById("compInput").value).length != 0) { /*person has a name, company exists in database*/
      //pushing the json object of the person to the database and updating table
      richPeopleData["people"].push({"id":id,"name":nm,"netWorth":nw,"occupation":occ,"chonkiness":chk,"companies":[comp],"alphaLevel":al,"attractiveness":att,},)
      updateTable();
    	localStorage.setItem('richPeopleData', richPeopleData)
      document.getElementById("nmInput").value = "";
      document.getElementById("nwInput").value = null;
      document.getElementById("occInput").value = "";
      document.getElementById("chkInput").value = null;
      document.getElementById("compInput").value = "";
      document.getElementById("alInput").value = null;
      document.getElementById("attInput").value = null;
      document.getElementById("addPersonErrorMessage").innerHTML = "";
      document.getElementById("cancelAddPerson").style.top = "345px";
  } else if (findCompanyByName(document.getElementById("compInput").value).length == 0 && nm != "") {
    document.getElementById("addPersonErrorMessage").innerHTML = "Error: Company does not exist in database"
    document.getElementById("cancelAddPerson").style.top = "379px";
  }
}

function addCompany() {                        //collecting all the information for the rich person
    /*adds a new company to the array of people, checking if company is valid and if it already exists in database*/
    var id = generateId();
    var companyName = capitalizeWords(document.getElementById("nameInput").value); /*again, gets data from input boxes in form*/
    var companyStonks = intToScientificNotation(document.getElementById("stonksInput").value);
    var companyEmployees = intToScientificNotation(document.getElementById("employeesInput").value);
    var companyDescription = document.getElementById("descriptionInput").value;
    var companyLogo = document.getElementById("logoInput").value;
    var companyInfoPage = document.getElementById("wikiPageInput").value;
    var companyStonkCode = document.getElementById("stonksCodeInput").value;

    if(companyName != "" && findCompanyByName(companyName).length == 0) { /*company does not already exist in database, has a name*/
      //pushing the json object of the person to the database and updating table
      richPeopleData["companies"].push({"id":id,"name":companyName,"stonks": companyStonks,"employees":companyEmployees,"description":companyDescription,"logo":companyLogo,"wikiPage": companyInfoPage,"stonksCode":companyStonkCode,},)
      updateTable();
    	localStorage.setItem('richPeopleData', richPeopleData)
      document.getElementById("nameInput").value = "";
      document.getElementById("stonksInput").value = null;
      document.getElementById("employeesInput").value = null;
      document.getElementById("descriptionInput").value = "";
      document.getElementById("logoInput").value = "";
      document.getElementById("wikiPageInput").value = "";
      document.getElementById("stonksCodeInput").value = "";
      document.getElementById("addCompanyErrorMessage").innerHTML = "";
      document.getElementById("cancelAddCompany").style.top = "345px";
  } else if (findCompanyByName(companyName).length != 0 && companyName != "") {
    document.getElementById("addCompanyErrorMessage").innerHTML = "Error: Company already in database.";
    document.getElementById("cancelAddCompany").style.top = '379px';
  }
}

function expandScientificNotation(string) {
  /*expands scientific notation from using e(power of ten) to using 10^exponent*/
  if(string.substring(3, 4) == 'e') {
    var number = string.substring(0, 3);
    var exponent = string.substring(4);
  } else {
    var number = string.substring(0, 1);
    var exponent = string.substring(2);
  }
  return number + " * 10" + exponent.sup();
}

function expToTextDescription(string) {
  /*converts scientific notation to a text description (e.g. 10 billion)*/
  if(string.substring(3, 4) == 'e') { /* formatted good */
    var number = string.substring(0, 3);
    var exponent = string.substring(4);
  } else { /* you didn't follow my formatting so I'm going to assume what you did */
    var number = string.substring(0, 1);
    var exponent = string.substring(2);
  }
  number = parseFloat(number);
  exponent = parseInt(exponent);
  moneyUnit = ""
  if(exponent >= 10) { /* janky set of if statements to determine what the string should say*/
    var moneyAmount = parseInt(number * (Math.pow(10, exponent % 3)));
    moneyUnit = "billion"
  } else if (exponent == 9){
    var moneyAmount = number;
    moneyUnit = "billion";
  } else if(exponent >= 7) {
      var moneyAmount = parseInt(number * (Math.pow(10, exponent % 3)));
      moneyUnit = "million"
  } else if (exponent == 6){
    var moneyAmount = number;
    moneyUnit = "million";
  } else if(exponent >= 4) {
      var moneyAmount = parseInt(number * (Math.pow(10, exponent % 3)));
      moneyUnit = "thousand"
  } else if (exponent == 3){
    var moneyAmount = number;
    moneyUnit = "thousand";
  } else if(exponent >= 1) {
      var moneyAmount = parseInt(number * (Math.pow(10, exponent % 3)));
      moneyUnit = ""
  } else if (exponent == 0){
    var moneyAmount = number;
    moneyUnit = "";
  }
      var string = moneyAmount + " " + moneyUnit
  return string
}

function intToScientificNotation(toConvert) {
  /* converts an integer to scientific notation */
  var float = parseFloat(toConvert);
  var numTens = 0;
  while(float >= 10) {
    float = float/10;
    numTens += 1;
  }
  return float.toFixed(1) + "e" + numTens;
}

function displayCompany(companyId) {
  /* opens company pop-up window and displays information about company on it */
  if(inAddPersonBox == false && inAddCompanyBox == false) {
    inCompanyIframe = true;
    document.getElementById('moneyVideo').className = "backgroundVideo fade";
    document.getElementById('mainJumbotron').className = "jumbotron graybackground"; /*makes everything else fade out, pop-up appears*/
    document.getElementById('companyInfo').className = "jumbotron onscreen whitebackground";

    var companyInfo = findCompany(companyId)
    document.getElementById('companyLogo').src = companyInfo[5];
    document.getElementById('companyLogo').className = "companyLogo center" /*displays company logo*/

    document.getElementById("companyName").innerHTML = capitalizeWords(companyInfo[1]);
    document.getElementById('companyStonks').innerHTML = "Stonks: $" + addCommasToInt(convExp(companyInfo[2])) + " ($" + expToTextDescription(companyInfo[2]) + ")";
    document.getElementById("companyEmployees").innerHTML = "Employees: " + addCommasToInt(convExp(companyInfo[3])) + " employees";
    document.getElementById('companyDescription').innerHTML = "Description: " + companyInfo[4];
    wikipediaUrl = companyInfo[6];
    if(stonksCode != "N/A") { /*don't know if this works but it probably should (we aren't using it anyway)*/
      document.getElementById("seeStonks").className = ""
      document.getElementById("seeStonks").style.opacity = 1.0;
      stonksCode = companyInfo[7];
    } else {
      document.getElementById("seeStonks").className = "invisible"
    }
    closeAddPersonBox();
  }
}

function openWikiPage() {
  /*lol*/
  window.open(wikipediaUrl, '_blank');
}

function openStonksPage() {
  /*guess what it does*/
  if(stonksCode.substring(0, 4) != "http" && stonksCode != "N/A") {
    window.open("https://finance.yahoo.com/quote/" + stonksCode, '_blank');
  } else if(stonksCode.substring(0, 4) == "http") {
    window.open(stonksCode, '_blank');
  }
}

function exitCompanyWindow() {
  /*exactly what the function title says it does*/
  if(inCompanyIframe == true) {
    inCompanyIframe = false;
    document.getElementById('moneyVideo').className = "backgroundVideo background"; /*makes background/table prominent again, makes popup invisible and hides it*/
    document.getElementById('mainJumbotron').className = "jumbotron whitebackground";
    document.getElementById('companyInfo').className = "jumbotron invisible offscreen";

    document.getElementById('companyLogo').src = "https://i5.walmartimages.com/asr/6d1014f4-682b-4720-818a-615f754e923d_1.ee2acf1cc97d6ac3258af5453afac656.jpeg";
    document.getElementById("companyName").innerHTML = "";
    document.getElementById('companyStonks').innerHTML = "";
    document.getElementById("companyEmployees").innerHTML = "";
    document.getElementById('companyDescription').innerHTML = "" ;
  }
}

function closeAddPersonBox() {
  /*guess what this does*/
  if(inAddPersonBox == true) {
    inAddPersonBox = false;
    document.getElementById('moneyVideo').className = "backgroundVideo background"; /*makes background/table prominent again, makes popup w/form invisible and hides it*/
    document.getElementById('mainJumbotron').className = "jumbotron whitebackground";
    document.getElementById('addPersonBox').className = "jumbotron invisible offscreen";
    document.getElementById("nmInput").value = "";
    document.getElementById("nwInput").value = null;
    document.getElementById("occInput").value = "";
    document.getElementById("chkInput").value = null;
    document.getElementById("compInput").value = "";
    document.getElementById("alInput").value = null;
    document.getElementById("attInput").value = null;
    document.getElementById("addPersonErrorMessage").innerHTML = "";
    document.getElementById("cancelAddPerson").style.top = '345px';
  }
}

function closeAddCompanyBox() {
  /*hmmmmmm (see above)*/
  if(inAddCompanyBox == true) {
    inAddCompanyBox = false;
    document.getElementById('moneyVideo').className = "backgroundVideo background"; /*makes background/table prominent again, makes popup w/ form invisible and hides it*/
    document.getElementById('mainJumbotron').className = "jumbotron whitebackground";
    document.getElementById('addCompanyBox').className = "jumbotron invisible offscreen";
    document.getElementById("nameInput").value = "";
    document.getElementById("stonksInput").value = null;
    document.getElementById("employeesInput").value = null;
    document.getElementById("descriptionInput").value = "";
    document.getElementById("logoInput").value = "";
    document.getElementById("wikiPageInput").value = "";
    document.getElementById("stonksCodeInput").value = "";
    document.getElementById("addCompanyErrorMessage").innerHTML = "";
    document.getElementById("cancelAddCompany").style.top = '345px';
  }
}

function generateId() {
  /* generates a randomized ID for a company */
  var id = Math.floor(Math.random()*90000) + 10000;
  while(findCompany(id) == []) {
    id = Math.floor(Math.random()*90000) + 10000;
  }
  return id;
}

function openAddPersonBox() {
  /* opens popup with form for adding person */
  exitWindow() //closes other windows and pop-ups
  inAddPersonBox = true;
  document.getElementById('moneyVideo').className = "backgroundVideo fade"; //makes other stuff fade out, popup appears
  document.getElementById('mainJumbotron').className = "jumbotron graybackground";
  document.getElementById('addPersonBox').className = "jumbotron onscreen whitebackground";
  addPerson();
}

function openAddCompanyBox() {
  /* see above, but replace "person" with "company" */
  exitWindow()
  inAddCompanyBox = true;
  document.getElementById('moneyVideo').className = "backgroundVideo fade"; //makes other stuff fade out, popup appaers
  document.getElementById('mainJumbotron').className = "jumbotron graybackground";
  document.getElementById('addCompanyBox').className = "jumbotron onscreen whitebackground";
  addCompany();
}

function exitWindow() {
  /*closes everything*/
  if(inAddPersonBox == true) {
    closeAddPersonBox();
  }
  if (inCompanyIframe == true) {
    exitCompanyWindow();
  }
  if (inAddCompanyBox == true) {
    closeAddCompanyBox();
  }
}
