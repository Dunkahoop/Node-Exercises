import {config} from 'dotenv';
config();
 export const atlas = process.env.DBURL;
 export const appdb = process.env.DB;
 export const countries = process.env.ISOCOUNTRIES;
 export const countryCollection = process.env.COLLECTION;
 export const port = process.env.PORT;