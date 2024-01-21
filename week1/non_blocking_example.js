const fs = require('fs');
console.log('Node version ' + process.version);
fs.readFile('./sampledata/users', 'utf8', (err, contents) => {
    console.log('\nNames:');
    let names = contents;   
    console.log(names);
});

fs.readFile('./sampledata/emailids', 'utf8', (err, contents) => {
    console.log('\nEmail Addresses:')
    let emails = contents;
    console.log(emails);
});
