const { Router } = require("express");
const { getHandlersCountries, getHandlerByIdCountry } = require("../handlers/countriesHandlers");


const countriesRouter = Router();

countriesRouter.get("/", getHandlersCountries);

countriesRouter.get("/:idPais", getHandlerByIdCountry);

module.exports = countriesRouter;