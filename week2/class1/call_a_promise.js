import { someRtnWithAPromise } from "./non_blocking_routines.js";
let someParam = "no err";
// use promise
someRtnWithAPromise(someParam)
  .then((results) => {
    console.log(`The call ${results.val1} ${results.val2}`);
  })
  .catch((err) => {
    console.log(`Error ==> ${err}`);
  });

// call it again with an error
someParam = "err";
someRtnWithAPromise(someParam)
  .then((results) => {
    console.log(`The call ${results.val1} ${results.val2}`);
  })
  .catch((err) => {
    console.log(`Error ==> ${err}`);
  });
