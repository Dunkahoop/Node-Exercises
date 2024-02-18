// objects are passed ByRef
let var1 = { name: 'Evan' }
let var2 = var1;
console.log(`var2 ==> '${var2.name}' after first assignment`); 
var2.name = 'Sam';
console.log(`var2 ==> '${var2.name}' after second assignment`); 
console.log(`var1 ==> '${var1.name}' after second assignment`); // original overwritten
