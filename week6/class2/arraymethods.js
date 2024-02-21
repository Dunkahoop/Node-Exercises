// find even numbers
let allnumbers = [1, 2, 3, 4];
let newarray = allnumbers.filter((el) => el % 2 === 0); // [2, 4]
console.table(newarray);
// sum all numbers
allnumbers = [1, 2, 3, 4, 5];
let total = allnumbers.reduce((total, item) => total + item, 0); // 15
console.log(total);
// existence check
allnumbers = [1, 2, 3, 4, 5];
let exists = allnumbers.includes(3);
exists ? console.log(`there is a 3 in the array `) : console.log(`no 3 in the array`);
// put a new element at the start
allnumbers = [1, 2, 3, 4, 5];
allnumbers.unshift(0);
console.table(allnumbers); // [0, 1, 2, 3, 4, 5]
// Build a custom string
allnumbers = [1, 2, 3, 4, 5];
let custom_string = allnumbers.join(', '); 
console.log(custom_string); // "1, 2, 3, 4, 5"
