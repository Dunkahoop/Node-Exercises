// Load the got module
import got from "got";
// Try to make an HTTP GET using got to Fanshawe's website.
const dumpPage = async () => {
    try {
        const response = await got("http://www.fanshaweonline.ca");
        console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
};
dumpPage();