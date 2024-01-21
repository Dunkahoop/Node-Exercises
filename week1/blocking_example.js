const fs = require('fs');
let users = fs.readFileSync('./sampledata/users', 'utf8');
let emails = fs.readFileSync('./sampledata/emailids', 'utf8');
const userNames = users.split("\r\n");
const emailList = emails.split("\n");
for (var i = 0; i < userNames.length && i < emailList.length; i++)
console.log(`${userNames[i]}, ${emailList[i]}`);
//console.log('Hello Node\n');

//console.log(emails);
//console.log('Hello again!');
