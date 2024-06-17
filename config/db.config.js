require('dotenv').config() ;
const Sequelize = require("sequelize") ;

const sequelize_DB = new Sequelize(
    process.env.DB_DATABASE , 
    process.env.DB_USERNAME , 
    process.env.DB_PASSWORD ,
    {
        host: process.env.DB_HOST ,
        dialect: "postgres" ,
        operatorsAliases: false ,
        pool: 
        {
            max: 5 ,
            min: 0 ,
            acquire: 30000 ,
            idle: 10000
        }
    }
) ;

const sync_db = async () => 
{
    try {
        await sequelize_DB.sync( { force: true } );
        console.log("=====================================================================");
        console.log("Base de données synchronisée");
        console.log("=====================================================================");
    } catch (error) {
        console.log("=====================================================================");
        console.log("Échec de la synchronisation de la base de données");
        console.log(error.message);
        console.log("=====================================================================");
    }
} ;

module.exports = { sequelize_DB , sync_db } ;