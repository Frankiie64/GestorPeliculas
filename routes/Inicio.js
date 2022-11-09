const express = require('express');
const router =  express.Router();

const inicioController = require("../controllers/InicioController");


router.get("/",inicioController.GetAllMovies);
router.post("/",inicioController.GetAllMoviesFilter);


module.exports = router;
