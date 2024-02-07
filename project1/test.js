let data = {
    "AF": {
        "country-id": 1000,
        "country-iso": "AF",
        "country-eng": "Afghanistan",
        // ... rest of the data for "AF"
    },
    "AL": {
        "country-id": 4000,
        "country-iso": "AL",
        "country-eng": "Albania",
        // ... rest of the data for "AL"
    }
    // ... rest of the countries
};

for (let country in data) {
    console.log('Country ISO: ' + country);
    console.log('Country ID: ' + data[country]['country-id']);
    console.log('Country Name (English): ' + data[country]['country-eng']);
    // ... print other properties as needed
}
