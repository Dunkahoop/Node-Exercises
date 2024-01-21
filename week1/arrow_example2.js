let setValues = (id, surname, givenName, age, program) => ({ id: id, surname: surname, givenName: givenName, age: age, program: program });
let student = setValues(1, "Wade", "Duncan", 21, "CPA3");
console.log(`id: ${student.id} \nname: ${student.surname}, ${student.givenName} \nage: ${student.age} \nprogram: ${student.program}`);