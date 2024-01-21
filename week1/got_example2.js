// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in 
JSON
const dumpJson = async () => {
const srcAddr =
"http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
// Create a currency formatter.
const formatter = new Intl.NumberFormat("en-US", {
style: "currency",
currency: "USD",
minimumFractionDigits: 0,
});
try {
let period = "2019-2020"; 
const response = await got(srcAddr, { responseType: "json" });
//alberta
console.log(`Alberta's transfer amount for ${period} was ${formatter.format(response.body.gtf.ab[period])}`);
//british columbia
console.log(`British Columbia's transfer amount for ${period} was ${formatter.format(response.body.gtf.bc[period])}`);
//manitoba
console.log(`Manitoba's transfer amount for ${period} was ${formatter.format(response.body.gtf.mb[period])}`);
//new brunswick
console.log(`New Brunswick's transfer amount for ${period} was ${formatter.format(response.body.gtf.nb[period])}`);
//newfoundland
console.log(`Newfoundland and Labrador's transfer amount for ${period} was ${formatter.format(response.body.gtf.nl[period])}`);
//nova scotia
console.log(`Nova Scotia's transfer amount for ${period} was ${formatter.format(response.body.gtf.ns[period])}`);
//northwest territories
console.log(`The Nortwest Territories' transfer amount for ${period} was ${formatter.format(response.body.gtf.nt[period])}`);
//nunavut
console.log(`Nunavut's transfer amount for ${period} was ${formatter.format(response.body.gtf.nu[period])}`);
//ontario
console.log(`Ontario's transfer amount for ${period} was ${formatter.format(response.body.gtf.on[period])}`);
//prince edward island
console.log(`Prince Edward Island's transfer amount for ${period} was ${formatter.format(response.body.gtf.pe[period])}`);
//quebec
console.log(`Quebec's transfer amount for ${period} was ${formatter.format(response.body.gtf.qc[period])}`);
//saskatchewan
console.log(`Saskatchewan's transfer amount for ${period} was ${formatter.format(response.body.gtf.sk[period])}`);
//yukon territories
console.log(`Yukon's transfer amount for ${period} was ${formatter.format(response.body.gtf.yt[period])}`);

} catch (error) {
console.log(error);
//=> 'Internal server error ...'
}
};
dumpJson();