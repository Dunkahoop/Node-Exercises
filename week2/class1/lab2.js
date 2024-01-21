import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { residentNamePromise, transferPaymentsPromise, provinceTransferPayment } from "./lab2_routines.js";

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
//console.log(`${argv.firstname}, ${argv.lastname} lives in ${argv.province}`);
residentNamePromise(argv.firstname, argv.lastname, argv.province.toUpperCase())
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(`Error ==> ${err}`);
    process.exit(1, err);
  });
transferPaymentsPromise()
.then((result) => {
  provinceTransferPayment(result, argv.province);
})
.catch((err) => {
  console.log(`Error ==> ${err}`);
  process.exit(1, err);
});