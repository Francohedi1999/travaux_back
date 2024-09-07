require('dotenv').config() ;
const express = require("express") ;
const cors = require("cors") ;
const app = express() ;
const port = process.env.PORT ;
const { sync_db } = require("./config/db.config")
const body_parser = require('body-parser');

const passation_routes = require("./routes/passation.route")
const authentification_routes = require("./routes/authentification.route")
const user_routes = require("./routes/user.route")
const role_routes = require("./routes/role.route")
const nature_projet_routes = require("./routes/nature_projet.route")
const mode_projet_routes = require("./routes/mode_projet.route")
const projet_routes = require("./routes/projet.route")
const maj_passation_routes = require("./routes/maj_passation.route")
const avancement_projet_routes = require("./routes/avancement_projet.route")
const status_projet_routes = require("./routes/status_projet.route") 



app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));
app.use( body_parser.raw( { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', limit: '100mb' } ) );

app.use( "/passation" , passation_routes ) ;
app.use( "/authentification" , authentification_routes ) ;
app.use( "/user" , user_routes ) ;
app.use( "/role" , role_routes ) ;
app.use( "/nature_projet" , nature_projet_routes ) ;
app.use( "/mode_projet" , mode_projet_routes ) ;
app.use( "/projet" , projet_routes ) ;
app.use( "/maj_passation" , maj_passation_routes ) ;
app.use( "/avancement_projet" , avancement_projet_routes ) ;
app.use( "/status_projet" , status_projet_routes ) ;


app.listen(port, () => 
{
    sync_db();
    console.log("===========================================================================================" );
    console.log("Le serveur s'exécute sur le port " + port );
    console.log("===========================================================================================" );
});