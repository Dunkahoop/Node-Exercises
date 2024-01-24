import got from "got";
const provinces = [
  { code: "NS", name: "Nova Scotia" },
  { code: "NL", name: "Newfoundland" },
  { code: "NB", name: "New Brunswick" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "ON", name: "Ontario" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "NT", name: "North West Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon Territory" },
];
const FISCALYEAR = "2022-2023";
// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(numberToFormat);

//resident name promise
const residentNamePromise = (firstName, lastName, province) => {
  let provName = provinces.find((provinces) => provinces.code === province);
  //if (!provName) province = "err";
  return new Promise((resolve, reject) => {
    if (firstName === "err" || lastName === "err" || province === "err") {
      reject("some error");
    } else {
      //let data = { val1: firstName, val2: lastName, val3: provName.name };
      //resolve(data);
      resolve(`${firstName}, ${lastName} lives in ${provName.name}`);
    }
  });
};

//transfer payment promise
const transferPaymentsPromise = () => {
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
  return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
      .then((response) => {
        resolve(response.body.gtf);
      })
      .catch((err) => {
        console.log(`Error ==> ${err}`);
        reject(err);
      });
  });
};

//output province transfer payment
const provinceTransferPayment = (gocData, province) => {
  //check if province input is valid
  let provName = provinces.find(provinces => provinces.code === province);
  //get province payment
  let data = gocData[province.toLowerCase()][FISCALYEAR];
  //output string with payment
  return `${provName.name} received ${currencyFormatter(data)} in transfer payments`;
}
export {
  provinces,
  currencyFormatter,
  residentNamePromise,
  transferPaymentsPromise,
  provinceTransferPayment,
};
