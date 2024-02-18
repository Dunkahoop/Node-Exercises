import { loadCountries } from "./project1_setup.js";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
    project1_setup: async () => {
        return await loadCountries();
    },
    alerts: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.alertcollection, {}, {});
    },
    alertsforregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.alertcollection, { region: args.region }, {});
    },
    alertsforsubregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.alertcollection, { subregion: args.subregion }, {});
    },
    regions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.alertcollection, "region");
    },
    subregions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.alertcollection, "subregion");
    }

};
export { resolvers };