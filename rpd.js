
/*
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
/*
  beginExp = string.substring(4,string.length)
  var int = parseInt(beginInt);
  var exp = parseInt(beginExp);
  var value = int * Math.pow(10, exp);
  var valueInt = parseInt(value)
  return valueInt;
  //}
};
*/




function convExp(string) {
	var eFound = False
	var preE = ""
	var postE = ""
	var i = 0
	while (e==False) {
		if (string[i] == "e") {
			preE = parseInt(string.substring(0,i-1))
			postE = parseInt(string.substring(i+1,string.length))
			break
	}
}
	var value = preE * Math.pow(10,postE)


}



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
