import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import got from "got";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";

//yargs, get country code in string
const argv = yargs(hideBin(process.argv))
  .options({
    code: {
      demandOption: true,
      alias: "code",
      describe: "ISO Country Code",
      string: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

const main = async () => {
  //use got to retrieve data from countries json file
  let countries = await got(cfg.countries).json();

  //map the names and codes from countries into new array
  let countryCodes = countries.map((element) => ({
    name: element.name,
    code: element["alpha-2"],
  }));

  try {
    //get collection from database instance
    const db = await dbRtns.getDBInstance();
 
    //clean out collection
    await dbRtns.deleteAll(db, cfg.countryCollection);

    //add countryCodes to collection, output total number of added documents
    let results = await dbRtns.addMany(db, cfg.countryCollection, countryCodes);
    console.log(
      `There are ${results.insertedCount} documents in the countries collection`
    );
    
    //find country in collection using code gathered by yargs
    let countryName = await dbRtns.findOne(db, cfg.countryCollection, {
      code: argv.code,
    });

    //if country code belongs to a country, output country name
    //else, output not found message
    if (countryName)
      console.log(
        `The country code ${argv.code} belongs to ${countryName.name}`
      );
    else
      console.log(`The country code ${argv.code} is not a known country code`);

    //exit program
    process.exit(0);

    //stops program if error in dbRtns occurs
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//run program
main();
