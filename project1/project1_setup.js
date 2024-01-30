import * as util from "./utilities.js";
import * as cfg from "./config.js";

const loadCountries = async () => {
    let countries = await util.getJSONFromWWWPromise(cfg.countries);
    if(countries) console.log("Retrieved Country JSON data");
    
    let alertJson = await util.getJSONFromWWWPromise(cfg.gocalerts);
    if(alertJson) console.log("Retrieved Alert JSON data");

    console.log(`There are ${Object.keys(alertJson.data).length} alerts and ${Object.keys(countries).length} countries`);
}

loadCountries();