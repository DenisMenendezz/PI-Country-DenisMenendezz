function formatActivities(activities) {
    return activities.map((activity) => {
      const countries = activity.countries
        .map((country) => country.name)
        .join(", ");
      return {
        ...activity.toJSON(),
        countries,
      };
    });
  }
  

  
  module.exports = {
    formatActivities,
  };