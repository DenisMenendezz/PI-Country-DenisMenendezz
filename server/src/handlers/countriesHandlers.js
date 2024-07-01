const { getCountryByName, getAllCountries, getCountryById } = require("../controllers/countryController");



const getHandlersCountries = async (req, res) => {
    const { name } = req.query;
    try {
        if(name) {
            const queryName = await getCountryByName(name);
            if (queryName.length > 0) {
                res.status(200).send(queryName);
            } else {
                res.status(404).send({ message: "Country not found" });
            }
        } else {
            const allCountries = await getAllCountries();
            res.status(200).send(allCountries)
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getHandlerByIdCountry = async (req, res) => {
    const { idPais } = req.params;

    try {
        const countryId = await getCountryById(idPais);

        res.status(200).send(countryId);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    getHandlersCountries,
    getHandlerByIdCountry,
};