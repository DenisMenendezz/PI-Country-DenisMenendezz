const { Country } = require("../db.js");
const { Activity } = require("../db.js");
const { Op } = require("sequelize");


const getAllCountries = async () => {
  const countries = await Country.findAll({
    include: {
      model: Activity,
      through: { attributes: [] },
    },
  });
  return countries;
};


const getCountryByName = async (name) => {
    const country = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Activity,
        through: { attributes: [] },
      },
    });
    return country;
  };
  
  
  const getCountryById = async (idPais) => {
  
    const country = await Country.findAll({
      where: {
        id: idPais.toUpperCase(),
      },
      include: {
        model: Activity,
        through: { attributes: [] },
      },
    });


    return country;
  };
  

  module.exports = {
    getCountryByName,
    getAllCountries,
    getCountryById,
  };