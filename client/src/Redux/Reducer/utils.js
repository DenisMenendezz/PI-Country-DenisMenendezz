export function applyFilters(countries, filters) {
    let filtered = countries;
  
    if (filters.continent) {
      filtered = filtered.filter((country) => country.continent === filters.continent);
    }
  
    if (filters.activity) {
      filtered = filtered.filter((country) =>
        country.activities.some((activity) => activity.name === filters.activity)
      );
    }
  
    return filtered;
  }

  export const sortCountriesByName = (countries, order) => {
    return countries.sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
};

export const sortCountriesByPopulation = (countries, order) => {
  return countries.sort((a, b) => {
      if (order === 'asc') {
          return a.population - b.population;
      } else {
          return b.population - a.population;
      }
  });
};
