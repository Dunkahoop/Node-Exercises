import * as util from "./utilities.js";
import * as cfg from "./config.js";
import * as dbUtils from "./db_routines.js";

const loadCountries = async () => {
    let alerts = [];

    //const db = await dbUtils.getDBInstance();
    //dbUtils.deleteAll(db, cfg.alertcollection);

    let countries = await util.getJSONFromWWWPromise(cfg.countries);
    if(countries) console.log("Retrieved Country JSON data");
    
    let alertJson = await util.getJSONFromWWWPromise(cfg.gocalerts);
    if(alertJson.data) console.log("Retrieved Alert JSON data");

    countries.forEach(element => {
        if(dbUtils.findAll(alertJson, element, {}, {}))
        console.log(element);
    });

    //for (let i = 0; i < countries.length; i++) {
        //if(countries.data[i] == alertJson.data[i])
            //console.log(countries.data[i]);
            //alerts[i] = {country: countries.data[i].alpha-2, name: countries.data[i].name, text: countries.data[i].advisory-text, };
    //}
    console.log(`There are ${Object.keys(alertJson.data).length} alerts and ${Object.keys(countries).length} countries`);
}

loadCountries();