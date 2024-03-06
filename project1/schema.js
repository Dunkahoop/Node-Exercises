const schema = ` 
type Query {
    project1_setup: Results,
    alerts: [Alert],
    alertsforregion(region: String): [Alert],
    alertsforsubregion(subregion: String): [Alert],
    regions: [String],
    subregions: [String],
    travellers: [String],
    travellersbyname(name: String): [Traveller]
},
type Results {
    results: String
},
type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
},
type Traveller { 
    name: String
    country: String
    text: String
    date: String
}
type Mutation {
    addadvisory(name: String, country: String): Traveller
}
`;
export { schema };
