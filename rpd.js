//data for all rich people
var richPeopleData = {
	"people":[
		{
			"id":69420,
			"name":"Bill Gates",
			"netWorth":"1.1e11",
			"occupation":"rich",
			"chonkiness":"5",
			"companies":[12345],
			"alphaLevel":"2",
			"attractiveness":"10",
		},
		{
			"id":89564,
			"name":"Jeff Bezos",
			"netWorth":"1.1e11",
			"occupation":"CEO of Amazon",
			"chonkiness":"10",
			"companies":[23456,88888],
			"alphaLevel":"8",
			"attractiveness":"6",
		},
		{
			"id":50568,
			"name":"Warren Buffett",
			"netWorth":"8.7e10",
			"occupation":"makes money",
			"chonkiness":"9",
			"companies":[89012],
			"alphaLevel":"7",
			"attractiveness":"6",
		},
		{
			"id":07984,
			"name":"Bernard Arnault",
			"netWorth":"1.0e11",
			"occupation":"CEO boi",
			"chonkiness":"5",
			"companies":[90123],
			"alphaLevel":"3",
			"attractiveness":"3",
		},
		{
			"id":94406,
			"name":"Mark Zuckerberg",
			"netWorth":"7.4e10",
			"occupation":"not being a robot",
			"chonkiness":"6",
			"companies":[67890],
			"alphaLevel":"10",
			"attractiveness":"3",
		},
		{
			"id":16131,
			"name":"Amancio Ortega",
			"netWorth":"7.7e10",
			"occupation":"fashion dude",
			"chonkiness":"3",
			"companies":[01234],
			"alphaLevel":"3",
			"attractiveness":"0",
		},
		{
			"id":35029,
			"name":"Larry Ellison",
			"netWorth":"6.9e10",
			"occupation":"having a fine mustache",
			"chonkiness":"3",
			"companies":[78901],
			"alphaLevel":"7",
			"attractiveness":"7",
		},
		{
			"id":56544,
			"name":"Donald Trump",
			"netWorth":"3.1e9",
			"occupation":"professional tweeter",
			"chonkiness":"9001",
			"companies":[15973],
			"alphaLevel":"69",
			"attractiveness":"-1000000000",
		},
		{
			"id":86243,
			"name":"Larry Page",
			"netWorth":"5.7e10",
			"occupation":"unemployed",
			"chonkiness":"5",
			"companies":[56789],
			"alphaLevel":"2",
			"attractiveness":"2",
		},
		{
			"id":09138,
			"name":"Carlos Slim",
			"netWorth":"7.6e10",
			"occupation":"being slim",
			"chonkiness":"1",
			"companies":[13579],
			"alphaLevel":"2",
			"attractiveness":"1",
		},
		{
			"id":98254,
			"name":"Mukesh Ambani",
			"netWorth":"6.1e10",
			"occupation":"business man",
			"chonkiness":"10",
			"companies":[24680],
			"alphaLevel":"8",
			"attractiveness":"7",
		},
		{
			"id":45233,
			"name":"Sergey Brin",
			"netWorth":"5.3e10",
			"occupation":"google",
			"chonkiness":"10",
			"companies":[56789],
			"alphaLevel":"8",
			"attractiveness":"10",
		},
	],
	"companies":[
		{"id":12345,
			"name":"microsoft",
			"stonks":"33243224432",
			"employees":"1.5e5",
			"description":"making computers and windows",
		},
		{"id":23456,
			"name":"amazon",
			"stonks":"6.9e12",
			"employees":"7.5e5",
			"description":"not paying taxes",
		},
		{"id":34567,
			"name":"apple",
			"stonks":"3.8e13",
			"employees":"1.3e5",
			"description":"iPhone2049S SE+ with thirteen additional cameras",
		},
		{"id":45678,
			"name":"tesla",
			"stonks":"3.9e10",
			"employees":"4.5e4",
			"description":"electric bots",
		},
		{"id":56789,
			"name":"google",
			"stonks":"4.8e12",
			"employees":"1.0e5",
			"description":"big brother",
		},
		{"id":67890,
			"name":"facebook",
			"stonks":"2.6e10",
			"employees":"4.0e4",
			"description":"like a book with faces",
		},
		{"id":78901,
			"name":"oracle",
			"stonks":"1.4e11",
			"employees":"1.4e6",
			"description":"2 million devices",
		},
		{"id":15973,
			"name":"Trump Sales and Leasing",
			"stonks":"4.2e11",
			"employees":"3000",
			"description":"sells things with Trump’s name on it",
		},
		{"id":89012,
			"name":"berkshire hathaway",
			"stonks":"4.2e11",
			"employees":"389000",
			"description":"stonks",
		},
		{"id":90123,
			"name":"LVMH moet hennessy",
			"stonks":"4.2e11",
			"employees":"136000",
			"description":"rich french bois",
		},
		{"id":01234,
			"name":"zara",
			"stonks":"4.2e11",
			"employees":"174000",
			"description":"dress me up like one of your french girls",
		},
		{"id":13579,
			"name":"america movil",
			"stonks":"4.2e11",
			"employees":"189000",
			"description":"el telecom de meheeko",
		},
		{"id":24680,
			"name":"reliance limited",
			"stonks":"4.2e11",
			"employees":"29000",
			"description":"rich indian bois that aren’t in comp sci",
		},
		{"id":88888,
			"name":"blue origin",
			"stonks":"4.2e11",
			"employees":"2600",
			"description":"spaaaaccccceeee",
		},
	]
};

function convExp(string) {
  var beginInt = string.substring(0,3);
  var beginExp = "";
  /*for (i = 0; i < string.length; i++) {
    if (string[i] != "e" || string[i] != "E") {
      beginInt += string[i];
    }
    else {
      for (x = i+1; x<string.length; x++){
        beginExp += string[x];
      }
    }*/
  beginExp = string.substring(4,string.length)
  var int = parseInt(beginInt);
  var exp = parseInt(beginExp);
  var value = int * Math.pow(10, exp);
  var valueInt = parseInt(value)
  return valueInt;
  //}
};

function addCommasToInt(int) {
    var intString = int.toString();
    var stringWithCommas = intString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return stringWithCommas;
}

function updateTable() {
  //var database = JSON.parse(richPeopleData);
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
    cell2.innerHTML = addCommasToInt(convExp(item.netWorth));
    cell3.innerHTML = item.occupation;
    if(item.chonkiness > 9000) {
      cell4.innerHTML = "over 9000";
    } else {
      cell4.innerHTML = item.chonkiness;
    }
    var companies = [];
    item.companies.forEach(function(item) {
      var companyName = findCompany(item);
      if(companyName != "") {
        if(companies.length >= 0) {
          companies.push(" " + companyName);
        } else {
          companies.push(companyName)
        }
      }
    })
    if (companies != []) {
      cell5.innerHTML = companies;
    } else {
      cell5.innerHTML = "none"
    }
    cell6.innerHTML = item.alphaLevel;
    cell7.innerHTML = item.attractiveness
  });
}

function findCompany(idToFind) {
  var toReturn = ""
  richPeopleData["companies"].forEach(function(company) {
    if(company.id == idToFind) {
      toReturn = company.name;
    }
  });
  toReturn = capitalizeWords(toReturn);
  return toReturn;
}

function clearTableRows() {
  var table = document.getElementById("table");
  var numRows = table.rows.length;
  while(numRows > 1) {
    table.deleteRow(table.rows.length - 1);
    numRows = numRows - 1;
  }
}

function capitalizeWords(words) {
  var wordsArray = words.split(" ");
  var stringToReturn = ""
  for(i = 0; i < wordsArray.length; i++) {
      wordsArray[i] = wordsArray[i].slice(0, 1).toUpperCase() + wordsArray[i].slice(1, wordsArray[i].length);
      stringToReturn = stringToReturn + wordsArray[i] + " "
  }
  return stringToReturn.slice(0, stringToReturn.length - 1);
}

function changeSort(newSort) {
  sort = "name";
  sortRows();
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
        var companyName = findCompany(item.companies[0]);
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
  //document.getElementById("troubleshoot").innerHTML = temp;
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
  richPeopleData["people"] = sortedArray;
  updateTable();
}

function addPerson() {
  var id = Math.floor(Math.random()*90000) + 10000;
  var nm = document.getElementById("nmInput").value;
  var nw = document.getElementById("nwInput").value;
  var occ = document.getElementById("occInput").value;
  var chk = document.getElementById("chkInput").value;
  var comp = document.getElementById("compInput").value;
  var al = document.getElementById("alInput").value;
  var att = document.getElementById("attInput").value;
  richPeopleData["people"].push({"id":id,"name":nm,"netWorth":nw,"occupation":occ,"chonkiness":chk,"companies":[comp],"alphaLevel":al,"attractiveness":att,},)
  updateTable();
	localStorage.setItem('richPeopleData',)
}

var sort = ""
changeSort('netWorth');
