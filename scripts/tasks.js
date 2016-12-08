// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать будет массив значений одного из полей (отсортированных в порядке возрастания):

function getFieldValues(obj, attr) {
    var arr = [];
    for(var i=0; i<usersData.length; i++) {
        arr.push(obj[i][attr]);
    }
    return arr.sort();
}

var usersData = [
  { 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
  { 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];

console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']

// 2) Написать функцию, фильтрующую массив с использованием предиката:

var numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
function isEven(x) { if (x%2===0) { return x } }
function filter(array, pred) {
    var arr = [];
    for(var i=0; i < numbers.length; i++) {
        if (isEven(numbers[i])) {
            arr.push(numbers[i]);
        }
    }
    return arr;
}
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках

function findSimilarWords(str1, str2) {
    var arr = [];

    first = str1.split(" ");
    second = str2.split(" ");
    for(var i=0; i<first.length; i++) {
        if (second.includes(first[i]) && !arr.includes(first[i])) {
            arr.push(first[i]);
        }
    }
    return arr;
}

var firstLongString = 'Load up on guns and bring your friends it\'s fun to lose and to pretend';
var secondLongString = 'She\'s over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and'];

// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:

var IpAddress = '10.223.98.2';
var subnetMask = 28;
function generateBroadcastAndNetworsAddresses(IpAddress, subnetMask) {
  ip = IpAddress.split('.');
  var str = [];
  var ip2 = "";
  for (var i = 0; i < ip.length; i++) {
    str[i] = "";
    while (ip[i] > 0) {
      if (ip[i] % 2 == 0) {
        str[i] = str[i] + '0';
        ip[i] /= 2;
      }else {
        str[i] = str[i] + '1';
        ip[i]--;
        ip[i] /= 2;
      }
    }
    str[i] = str[i].split("").reverse().join("");
    while (str[i].length < 8) {
      str[i] = '0' + str[i];
    }
    ip2 += str[i];
  }
  

  var broadcastMask = 32-subnetMask;

  var mask = "";
  while (mask.length < 32) {
    if (subnetMask > 0) {
      mask += '1';
      subnetMask--;
    }else {
      mask += '0';
    }
  }
  var network = "";
  for (var i = 0; i < 32; i++) {
    if (parseInt(ip2[i]) * parseInt(mask[i]) == 1) {
      network += '1';
    }else {
      network += '0';
    }
  }

  var networkList = [];
  var k = 0;
  while (network != "") {
    networkList[k] = network.slice(0,8);
    network = network.replace(networkList[k], "");
    k++;
  }

  var networkListInt = [];
  k = 0;
  for(var i = 0; i < networkList.length; i++) {
    networkListInt[k] = 0;
    for (var j = 0; j < networkList[i].length; j++) {
      networkListInt[k] += parseInt(networkList[i][j] * Math.pow(2,7-j));
    }
    k++;
  }
  console.log("Broadcast - " + IpAddress.split(".", 3).join(".") + "." + (Math.pow(2, broadcastMask)-1) + ", Network - " + networkListInt.join("."));

}
generateBroadcastAndNetworsAddresses(IpAddress, subnetMask); // Broadcast - 10.223.98.15, Network - 10.223.98.0
// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// P. S. 1 == '1' (строковое и числовое представление number'ов считать идентичными)

function makeItClean(array) {
    var arr = [];
    for(var i=0; i<array.length; i++) {
        for(var j=0; j<array[i].length; j++) {
            if (!arr.includes(array[i][j]) && !arr.includes(+array[i][j])) {
                arr.push(array[i][j]);
            }
        }
    } 
    return arr;
}

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];

console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, undefined, true];
