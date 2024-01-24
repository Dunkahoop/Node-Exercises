import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  provinces,
  residentNamePromise,
  transferPaymentsPromise,
  provinceTransferPayment,
} from "./lab3_routines.js";

//console line arguments
const argv = yargs(hideBin(process.argv))
  .options({
    firstname: {
      demandOption: true,
      alias: "firstname",
      describe: "Resident's first name",
      string: true,
    },
    lastname: {
      demandOption: true,
      alias: "lastname",
      describe: "Resident's last name",
      string: true,
    },
    province: {
      demandOption: true,
      alias: "province",
      describe: "Resident's home province",
      string: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

const main = async (provArray) => {
    //cast to uppercase to ensure correct operation, put in variable due to multiple calls
    const province = argv.province.toUpperCase();
  try {
    //output resident name and province with promise
    const results = await residentNamePromise(
      argv.firstname,
      argv.lastname,
      province,
    );
    console.log(results);
    
    //output province transfer payment using promise
    let value = provinceTransferPayment(await transferPaymentsPromise(), province);
    console.log(value + "\n");//spacing

    //get transfer payments for all provinces with promise
    let paymentArray = Promise.allSettled(
        provArray.map(async (province) => {
            return provinceTransferPayment(await transferPaymentsPromise(), province.code);
        })
    );

    //transfer payments for all provinces in paymentArray, highlight user's province
    (await paymentArray).forEach((result) => {
      result.value === value ?
      console.log(`\x1b[1m${result.value}`)
      : console.log(`\x1b[0m${result.value}`);
    });

    
  } catch (err) {
    console.log(`Error ==> ${err}`);
    process.exit(1, err);
  }
}
//start main functionality with provinces array from lab3_rountines.js
main(provinces);
