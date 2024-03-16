import * as util from "./utilities.js";
import * as cfg from "./config.js";
import * as dbUtils from "./db_routines.js";

const loadCountries = async () => {
  try {
    const db = await dbUtils.getDBInstance();
    var results = "";

    let deletedAlerts = await dbUtils.deleteAll(db, "alerts");
    results += `Deleted ${deletedAlerts.deletedCount} alerts|`;

    let deletedTravellers = await dbUtils.deleteAll(db, "travellers");
    results += `Deleted ${deletedTravellers.deletedCount} travellers|`;

    let countries = await util.getJSONFromWWWPromise(cfg.countries);
    if (countries) results += `Retrieved ${countries.length} countries|`;

    let alertJson = await util.getJSONFromWWWPromise(cfg.gocalerts);
    if (alertJson)
    results += `Retrieved ${Object.keys(alertJson.data).length} alerts|`;

    let alerts = [];
    let count = 0;

    countries.forEach((element) => {
      if (alertJson.data.hasOwnProperty(element["alpha-2"]))
        alerts[count] = {
          country: element["alpha-2"],
          name: element["name"],
          text: alertJson.data[element["alpha-2"]].eng["advisory-text"],
          date: alertJson.data[element["alpha-2"]]["date-published"].date,
          region: element.region,
          subregion: element["sub-region"],
        };
      else
        alerts[count] = {
          country: element["alpha-2"],
          name: element["name"],
          text: "No travel alerts",
          date: "",
          region: element.region,
          subregion: element["sub-region"],
        };

      count++;
    });

    let result = await dbUtils.addMany(db, cfg.alertcollection, alerts);
    results += `Added ${result.insertedCount} documents|`;

    //process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    return { results: results };
  }
};

export {loadCountries}
