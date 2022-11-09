const Movie = require("../models/Movie");

exports.GetIndex = (request,response,next) => {

    Movie.GetAll(function (movies){        
        response.render("Movies/Index",{
            pageTitle: "Mantenimiento - Listar peliculas",
            itemActive : "Mantenimiento",
            serarchActive : true,
            hasMovies : movies.length > 0,            
            moviesList : movies
        });
    })
};
exports.GetIndexPost = (request,response,next) => {

    Movie.GetAll(function (movies){     
        
        const genero = request.body.generoFiltro;
        const movieFilter = [];

        if(genero != "Todas"){
            movies.forEach(element => {
                if(element.genero === genero){
                    movieFilter.push(element);
                }
            });
        }    

        response.render("Movies/Index",{
            pageTitle: "Mantenimiento - Listar peliculas",
            itemActive : "Mantenimiento",
            serarchActive : true,
            moviesList : movies,
            moviesList : genero == "Todas" ? movies : movieFilter
        });
    })
};


exports.AddMovie = (request,response,next) => {

    response.render("Movies/SaveMovie",{
        pageTitle: "Mantenimiento - agregar pelicula",
        itemActive : "Mantenimiento",
        serarchActive : true,        
    });
};


exports.AddMoviePost = (request,response,next) => {
        const image = request.body.ImageUrl;
    const title = request.body.Title;
    const genero = request.body.Genero;
    const description = request.body.Description;
  
    const movie = new Movie(null, title,genero,true,description,image);
    movie.Save();

    response.redirect("/admin/movies/");
};

exports.EditMovie = (request,response,next) => {
    const movieId = request.params.movieId;
    const edit = request.query.edit;
  
    if (!edit) {
      return response.redirect("/");
    }

    Movie.GetById(movieId, (movie) => {
        response.render("Movies/SaveMovie",{
            pageTitle: "Mantenimiento - editar pelicula",
            itemActive : "Mantenimiento",
            serarchActive : true,
            editMode : true,
            movieItem : movie
        });
    });
};

exports.EditMoviePost = (request,response,next) => {
const id = request.body.movieId;
const image = request.body.ImageUrl;
const title = request.body.Title;
const genero = request.body.Genero;
const description = request.body.Description;
const status = request.body.Status == 'SI';


const movie = new Movie(id, title,genero,status,description,image);
movie.Save();

response.redirect("/admin/movies/");
};


exports.DeleteMovie = (request,response,next) => {
    const id = request.body.idMovie;

    Movie.Delete(id);
    response.redirect("/admin/movies/");
};
