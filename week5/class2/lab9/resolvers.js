import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
  countries: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.collection, {}, {});
  },
  countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { code: args.code });
  },
  countrybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { name: args.name });
  },
  addcountry: async (args) => {
    let db = await dbRtns.getDBInstance();
    let user = { name: args.name, code: args.code };
    let results = await dbRtns.addOne(db, cfg.collection, user);
    return results.acknowledged ? user : null;
  },
};
export { resolvers };
