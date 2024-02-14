import {config} from 'dotenv';
config();
export const countries = process.env.ISOCOUNTRIES;
export const gocalerts = process.env.GOCALERTS;
export const alertcollection = process.env.ALERTCOLLECTION;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQL;