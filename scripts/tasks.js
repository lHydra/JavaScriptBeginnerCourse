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
function isEven(x) { if (x%2===0) { return true } }
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
function generateBroadcastAndNetworsAddresses(ip, mask) {
    var arr;
    arr = ip.split('.');
    for(var i=0; i<arr.length; i++) {
        arr[i] = +arr[i]; // переводим строки в числа
        arr[i] = arr[i].toString(2); // затем переводим в 2 СС
        while (arr[i].length < 8) {
            arr[i] = '0' + arr[i]; // добавляем незначащих нулей
        }
    }
    var str = '';
    arr = arr.join('');
    network = 32-mask;
    for(var j=0; j<mask; j++) {
        str = '1' + str;
    }
    for(j=0; j<network; j++) {
        str = str + '0';
    }
    var net ='';
    var broad = '';
    for(i=0; i<32; i++) {
        if (i%8===0 && i !== 0) {
            net = net + '.';
            broad = broad + '.';
        }
        if (str[i] === '1') {
            net = net + arr[i];
            broad = broad + arr[i];
        } else {
            net = net + '0';
            broad = broad + '1';
        }
    }
    broad = broad.split('.');
    net = net.split('.');
    for (i=0; i<net.length; i++) {
        broad[i] = parseInt(broad[i], 2);
        net[i] = parseInt(net[i], 2);
    }
    return "Its broadcast " + broad + " its network " + net;
}

console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0
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
