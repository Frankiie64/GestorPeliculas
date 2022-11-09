const express = require("express");
const path = require("path");
const app = express();

const {engine} = require("express-handlebars");

const rouetInicio = require("./routes/Inicio");
const rouetMovie = require("./routes/Movies");



const dateTimeHelper = require("./helper/hbs/dateTime");
const stringFunctionsHelper = require("./helper/hbs/String");
const indexInicioHelper = require("./helper/hbs/indexInicio");


app.engine("hbs",engine({
    layoutsDir:'views/layouts/', defaultLayout: 'main-layout', extname:'hbs',
    helpers:{
        Year : dateTimeHelper.dateTime,
        Compare : stringFunctionsHelper.CompareBwt,
        hasMovieActive : indexInicioHelper.hasMovieActive
    }
}));

app.set("view engine","hbs");
app.set("views","views");

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended: false}));

/* Desarrollo de los middleware */
app.use("/admin",rouetMovie);
app.use(rouetInicio);

/* Desarrollo del not found */
app.use("/",function(request,response){    

    response.status(404).render("NotFound",{
        pageTitle: "Página no encontrada",
        itemActive:"NOT-FOUND",
        serarchActive : false
    })
});

app.listen(3000);