const Movie = require("../models/Movie");

exports.GetAllMovies = (request,response,next) => {
    Movie.GetAll(function (movies){        
        response.render("Inicio/Index",{
            pageTitle: "Ver Peliculas",
            itemActive : "Inicio",
            serarchActive : true,   
            indexPage : true,         
            moviesList : movies
        });
    })
};

exports.GetAllMoviesFilter = (request,response,next) => {
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
      
        response.render("Inicio/Index",{
            pageTitle: "Ver Peliculas",
            itemActive : "Inicio",
            serarchActive : true,   
            indexPage : true,         
            moviesList : genero == "Todas" ? movies : movieFilter
        });
    })
};