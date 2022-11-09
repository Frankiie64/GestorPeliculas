const fs = require("fs");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "movie.json"
);

const GetAllMoviesFromFile = function (callBack) {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      callBack([]);
    } else {
      callBack(JSON.parse(data));
    }
  });
};

module.exports = class Movie {
  constructor(id, title, genero, status, description,imageUrl) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.genero = genero;
    this.status = status;
  }

  Save() {
    GetAllMoviesFromFile((movies) => {
      if (this.id) {
        const editMovieIndex = movies.findIndex(
          (movie) => movie.id === this.id
        );

        movies[editMovieIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();
        movies.push(this);
        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      }
    });
  }

  static GetAll(cb) {
    GetAllMoviesFromFile(cb);
  }

  static GetById(id, cb) {
    GetAllMoviesFromFile((movies) => {
      const movie = movies.find((mv) => mv.id === id);
      cb(movie);
    });
  }

  static Delete(id) {
    GetAllMoviesFromFile((movies) => {
      const movie = movies.find((m) => m.id === id);

      const newMovieList = movies.filter((mv) => mv.id !== id);

      fs.writeFile(dataPath, JSON.stringify(newMovieList), function (error) {
        console.log(error);
      });
    });
  }
};
