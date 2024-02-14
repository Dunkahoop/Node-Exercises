import { loadCountries } from "./project1_setup.js";
const resolvers = {
    project1_setup: async () => {
        return await loadCountries();
    }
};
export { resolvers };