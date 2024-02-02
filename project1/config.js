import {config} from 'dotenv';
config();
export const countries = process.env.ISOCOUNTRIES;
export const gocalerts = process.env.GOCALERTS;
export const alertcollection = process.env.ALERTCOLLECTION;
//need expansion?