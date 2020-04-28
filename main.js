var combs = [];

var ITERATIONS = 1000;

/* arr - array to store the  
combination  
index - next location in array 
num - given number 
reducedNum - reduced number */
function findCombinationsUtil(arr, index, num, reducedNum) {
	// Base condition 
	if (reducedNum < 0) {
		return;
	}

	// If combination is  
	// found, print it 
	if (reducedNum == 0) {
		var combArray = [];
		for (var i = 0; i < index; i++) {
			combArray.push(arr[i]);
		}
		combs.push(combArray);
		return;
	}

	// Find the previous number  
	// stored in arr[]. It helps  
	// in maintaining increasing  
	// order 
	var prev = ((index == 0) ? 1 : arr[index - 1]);

	// note loop starts from  
	// previous number i.e. at 
	// array location index - 1 
	for (var k = prev; k <= num; k++) {
		// next element of 
		// array is k 
		arr[index] = k;

		// call recursively with 
		// reduced number 
		findCombinationsUtil(arr, index + 1, num, reducedNum - k);
	}
}

/* Function to find out all  
combinations of positive  
numbers that add upto given 
number. It uses findCombinationsUtil() */
function findCombinations(n) {
	// array to store the combinations 
	// It can contain max n elements 
	var arr = [];
	
	combs = [];

	// find all combinations 
	findCombinationsUtil(arr, 0, n, n);
	return combs;
}

/** 
* permutation function 
* @param str string to calculate permutation for 
* @param l starting index 
* @param r end index 
*/
function permute(str, l, r) {
	if (l == r) {
		var returnArray = [];
		for(var i = 0; i < str.length; i++) {
			returnArray[i] = str[i];
		}
		combs.push(returnArray);
	}else{ 
		for (var i = l; i <= r; i++) { 
			str = swap(str,l,i);
			permute(str, l+1, r);
			str = swap(str,l,i);
		}
	}
}
  
/** 
* Swap Characters at position
* @param a string value
* @param i position 1 
* @param j position 2
* @return swapped string
*/
function swap(a, i, j) {
	var temp; 
	var charArray = a; 
	
	temp = charArray[i];
	charArray[i] = charArray[j]; 
	charArray[j] = temp; 
	
	return charArray;
}

function getPermutations(array) {
	combs = [];
	permute(array, 0, array.length-1);
	return combs;
}

function getNumPermutations(n) {
	var array = [];
	for(var i = 0; i < n; i++) {
		array.push(i);
	}
	return getPermutations(array);
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
}

function getWeekCombos(n, weekLength) {
	if(!weekLength) {
		weekLength = 5;
	}
	var combs = findCombinations(n);
	var newCombs = [];
	
	for(var i = 0; i < combs.length; i++) {
		if(combs[i].length == weekLength) {
			newCombs.push(combs[i]);
		}else
		if(combs[i].length < weekLength) {
			for(var j = combs[i].length; j < weekLength; j++) {
				combs[i][j] = 0;
			}
			newCombs.push(combs[i]);
		}
	}

	return newCombs;
}

function getListsFromWeekCombo(weekCombo, items) {
	var lists = [];
	
	for(var i = 0; i < ITERATIONS; i++) {
		var list = [];
		for(var k = 0; k < weekCombo.length; k++) {
			list[k] = [];
		}
		for(var j = 0; j < items; j++) {
			var index = Math.floor(Math.random()*weekCombo.length);
			while(list[index].length >= weekCombo[index]) {
				index = Math.floor(Math.random()*weekCombo.length);
			}
			list[index].push(j);
			list[index].sort();
		}
		lists.push(list);
	}
	return lists;
}

function getList(weekCombos, items) {
	shuffle(weekCombos);
	
	while(true) {
		for(var h = 0; h < weekCombos.length; h++) {
			
			var list = [];/*
			var valid = true;
			for(var i = 0; i < weekCombos[h].length; i++) {
				var used = [];
				list[i] = [];
				for(var j = 0; j < weekCombos[h][i]; j++) {		
					var index = Math.floor(Math.random()*items.length);
					var attempts = 0;
					while((items[index][1] < i || used.includes(index)) && valid) {
						index = Math.floor(Math.random()*items.length);
						attempts++;
						if(attempts > 100) {
							valid = false;
						}
					}
					if(valid) {
						used.push(index);
						list[i].push(index);
						list[i].sort();
					}else{
						i = weekCombos[h].length;
						j = weekCombos[h][i];
					}
				}
			}
			if(valid) {
				//console.log(weekCombos[h]);
				return list;
			}
			*/
			
			for(var k = 0; k < weekCombos[h].length; k++) {
				list[k] = [];
			}
			
			var valid = true;
			for(var j = 0; j < items.length; j++) {
				var index = Math.floor(Math.random()*weekCombos[h].length);
				var attempts = 0;
				while((list[index].length >= weekCombos[h][index] || items[j][1] < index) && valid) {
					index = Math.floor(Math.random()*weekCombos[h].length);
					attempts++;
					if(attempts > 100) {
						valid = false;
					}
				}
				if(valid) {
					list[index].push(j);
					list[index].sort();
				}else{
					j = items.length;
				}
			}
			if(valid) {
				return list;
			}
			
		}
	}
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getListScore(items, list) {
	var times = [];
	for(var i = 0; i < list.length; i++) {
		var timeSum = 0;
		for(var j = 0; j < list[i].length; j++) {
			timeSum += (items[list[i][j]][2]+items[list[i][j]][3])/2;
		}
		times.push(timeSum);
	}
	
	var mean = 0;
	for(var i = 0; i < times.length; i++) {
		mean += times[i];
	}
	mean /= times.length;
	
	var variance = 0;
	for(var i = 0; i < times.length; i++) {
		variance += Math.pow((times[i] - mean), 2);
	}
	variance /= times.length;
	
	return Math.sqrt(variance);
}

//each element in items array needs to have a name, due date relative to week start (Mon: 0, Tues: 1...), least time, and most time
function getBestList(iterations, weekLength, items) {
	weekCombos = getWeekCombos(items.length, weekLength);
	
	var winner = [[], 1000000];
	
	for(var i = 0; i < iterations; i++) {
		var newList = false;
		while(newList == false) {
			newList = getList(weekCombos, items);
		}
		var newListScore = getListScore(items, newList);
		if(newListScore < winner[1]) {
			winner[0] = newList;
			winner[1] = newListScore;
		}
	}
	
	for(var i = 0; i < winner[0].length; i++) {
		winner[0][i] = winner[0][i].sort(function(a, b){return a-b});
	}

	return winner;
}

function getDayNumFromStr(dateStr) {
	var today = new Date();

	// If the date is valid, proceed with the calculations
	// Strip out the month, day and year
	// JavaScript stores months as 0-11 as opposed to 1-12
	var dateParts = dateStr.split("/");
	dateParts[0]--;
	if(dateParts[0].length < 2) {
		dateParts[0] = "0" + dateParts[0];
	}
	try {
		if(dateParts[1].length < 2) {
			dateParts[1] = "0" + dateParts[1];
		}
	} catch(e){
		console.log(dateStr);
	}
	if(dateParts[2]) {
		if(dateParts[2].length < 4) {
			dateParts[2] = "20" + dateParts[2];
		}
	}else{
		dateParts[2] = today.getFullYear();
	}
	var EnteredDate = new Date(dateParts[2], dateParts[0], dateParts[1], 0, 0, 0);
	var startofyear=new Date(EnteredDate.getFullYear(), 0, 1);
	var one_day=1000*60*60*24;
	var DayOfYear = Math.ceil((EnteredDate.getTime() - startofyear.getTime()) / one_day) + 1;
	return DayOfYear;
}

function getStrFromDayNum(dayNum) {
	var today = new Date();
	var startOfYear = new Date(today.getFullYear(), 0, 1);
	var oneDay = 1000*60*60*24;
	var msOfDay = oneDay*(dayNum-1);
	var date = new Date(startOfYear.getTime()+msOfDay);
	var month = (date.getMonth()+1) + "";
	var day = date.getDate() + "";
	return month + "/" + day;
}

function getItemFromStr(str) {
	var itemArray = str.split("(");
	itemArray[0] = itemArray[0].substring(0, itemArray[0].length-1);
	itemArray[1] = itemArray[1].replace(")", "");
	itemArray[1] = getDayNumFromStr(itemArray[1]);
	itemArray[2] = itemArray[2].replace(")", "");
	var timeRange = itemArray[2].split("-");
	itemArray[2] = parseInt(timeRange[0]);
	itemArray[3] = parseInt(timeRange[1]);
	return itemArray;
}

function getItemsFromStr(str) {
	var itemStrs = str.split("\n");
	var items = [];
	for(var i = 0; i < itemStrs.length; i++) {
		items.push(getItemFromStr(itemStrs[i]));
	}
	return items;
}

function generate() {
	var items = getItemsFromStr(document.getElementById('todoKeepFormat').value);
	
	var dates = [];
	for(var i = 0; i < items.length; i++) {
		if(!dates.includes(items[i][1])) {
			dates.push(items[i][1]);
		}
	}
	dates.sort();
	for(var i = 0; i < items.length; i++) {
		items[i][1] = dates.indexOf(items[i][1]);
	}
	
	var weekLength = parseInt(document.getElementById('weekLengthInput').value);
	var iterations = parseInt(document.getElementById('iterationsInput').value);
	
	var bestList = getBestList(iterations, weekLength, items);
	
	console.log("Standard Deviation: " + bestList[1]);
	
	var output = "";
	for(var i = 0; i < bestList[0].length; i++) {
		output += getStrFromDayNum(dates[i]) + "\n";
		var dayCost = 0;
		for(var j = 0; j < bestList[0][i].length; j++) {
			output += items[bestList[0][i][j]][0] + "\n";
			dayCost += (items[bestList[0][i][j]][2]+items[bestList[0][i][j]][3])/2;
		}
		output += "\n";
		console.log(getStrFromDayNum(dates[i]) + " Cost: " + dayCost);
	}
	document.getElementById('output').value = output;
}

var items = [
	["Message Ms. Hicks about Legion Assignment", 0, 1, 5],
	["BNW Chapters 6,9 Social Commentary", 0, 15, 30],
	["Physics Unit 7 MCQ Part A", 0, 30, 60],
	["Physics Unit 7 MCQ Part B", 1, 30, 60],
	["Message Brandon for Birthday", 1, 5, 10],
	["Web Powerpoint and Worksheet", 2, 10, 30],
	["Physics Practice FRQ 1", 2, 30, 60],
	["Latin Vocab Quiz", 3, 10, 20],
	["Physics Practice FRQ 2", 3, 30, 60],
	["Micro FRQ 7, 8, and 9", 4, 30, 90],
	["Physics Practice FRQ 3", 4, 30, 60],
	["Latin 2020 Practice Exam 1 FRQ", 4, 80, 160],
	["Latin Unit 1 FRQ Part A", 4, 25, 50],
	["Latin Unit 1 FRQ Part B", 4, 25, 50],
	["Final Transcript Survey", 4, 10, 20],
	["Read BNW Chapters 10,12", 5, 70, 80],
	["Complete BNW Chapters 10,12 Quiz", 5, 20, 40],
	["BNW Chapters 10,12 Social commentary", 5, 15, 30]
];

//console.log(getBestList(100000, 5, items));