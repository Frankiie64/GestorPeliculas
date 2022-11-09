const express = require("express");
const route = express.Router();

const movieController = require("../controllers/movieController");

route.get("/movies/",movieController.GetIndex);
route.post("/movies/",movieController.GetIndexPost);

route.get("/movies/addMovie",movieController.AddMovie);
route.post("/movies/addMovie", movieController.AddMoviePost);

route.get("/movies/editMovie/:movieId",movieController.EditMovie);
route.post("/movies/editMovie",movieController.EditMoviePost);

route.post("/movies/deleteMovie",movieController.DeleteMovie);

module.exports = route;