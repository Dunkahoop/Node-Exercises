const getOriginalCountries = () => {
  let originalCountries = [
    { name: "Canada", pop: 37000000 },
    { name: "USA", pop: 300000000 },
  ];
  let endCountries = [
    { name: "England", pop: 66500000 },
    { name: "Japan", pop: 127000000 },
  ];
  originalCountries.push(...endCountries); // appends on the end using spread
  return originalCountries;
};
const getAllCountries = () => {
  let original = getOriginalCountries();
  let beginCountries = [
    { name: "Germany", pop: 82000000 },
    { name: "Mexico", pop: 130000000 },
  ];
  original.unshift(...beginCountries); // appends to beginning using spread
  return original;
};
// nice way to dump an array on the console
console.table(getAllCountries());
// old school string
getAllCountries().forEach((country) =>
  console.log("%s %i", country.name, country.pop)
);
// old school template object
getAllCountries().forEach((country) => console.info("%o", country));
// es6+ template object
getAllCountries().forEach((country) => console.info(`${country}`));
// es6+ template string
getAllCountries().forEach((country) =>
  console.log(`${country.name}, ${country.pop}`)
);
