import { config } from "dotenv";
config();
export const rawdata = process.env.ISOCOUNTRIES;
export const countries = process.env.COUNTRIES;