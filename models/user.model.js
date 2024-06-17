const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const user_model = sequelize_DB.define("user", 
{
    id :
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true },
    nom : 
        { type: Sequelize.STRING } ,
    prenom : 
        { type: Sequelize.STRING } ,
    email : 
        { type: Sequelize.STRING } ,
    password : 
        { type: Sequelize.TEXT } ,
    sexe :
        { type: Sequelize.STRING } ,
    date_naissance :
        { type: Sequelize.DATE }
});

module.exports = user_model ;