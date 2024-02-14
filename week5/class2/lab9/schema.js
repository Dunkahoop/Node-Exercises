const schema = ` 
type Query {
 countries: [Country],
 countrybycode(code: String): Country,
 countrybyname(name: String): Country
},
type Country {
 name: String
 code: String
},
type Mutation {
 addcountry(name: String, code: String): Country
}   
`;
export { schema };
