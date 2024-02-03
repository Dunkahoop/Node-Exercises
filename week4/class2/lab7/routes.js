import { Router } from "express";
import got from "got";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const router = Router();
// define a default route
router.get("/", (req, res) => {
  res
    .status(200)
    .send("<html><body>Add a country code to the end of the URL</body></html>");
});
// define a get route with a name parameter
router.get("/:code", async (req, res) => {
  let code = req.params.code;

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
      code: code,
    });

    //if country code belongs to a country, output country name
    //else, output not found message
    if (countryName)
      res
        .status(200)
        .send(
          `<html><body>The country code ${code} belongs to ${countryName.name}</body></html>`
        );
    else
      res
        .status(200)
        .send(
          `<html><body>The country code ${code} is not a known country code</body></html>`
        );

    //stops program if error in dbRtns occurs
  } catch (err) {
    console.log(err);
  }
});
export default router;
