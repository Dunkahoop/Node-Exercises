import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
import * as rtnLib from "./iso_country_routines.js";

//yargs
const argv = yargs(hideBin(process.argv))
  .options({
    refresh: {
      demandOption: false,
      alias: "r",
      describe: "download a fresh copy from the web",
      boolean: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

  const main = async () => {
    let countries = [];//initialization

    //get stats from countries.json
    let countryData = await rtnLib.fileStatsFromFSPromise(cfg.countries);

    //create countries.json if it doesn't exist or user specified refresh file
    if(!countryData || argv.refresh) {
      //get json data from rawdata (which is a URL)
      countries = await rtnLib.getJSONFromWWWPromise(cfg.rawdata);
      console.log(`${cfg.countries} was created on ${new Date()}`);

      //create json file for data
      await rtnLib.writeFileFromFSPromise(cfg.countries, countries);
      //get json file stats
      countryData = await rtnLib.fileStatsFromFSPromise(cfg.countries);
    }
    //if countries.json exists, read json file
    else countries = await rtnLib.readFileFromFSPromise(cfg.countries);
    
    //loop through countries and count each object
    let countryCount = 0;
    countries.forEach(() => countryCount++);

    console.log(`${cfg.countries} has ${countryCount} countries`);
  }

  //run main
  main();