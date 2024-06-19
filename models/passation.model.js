const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const passation_model = sequelize_DB.define("passation", 
{
    id : 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true },
    aut_cont : 
        { type: Sequelize.TEXT } ,
    nom_prmp : 
        { type: Sequelize.TEXT } ,
    adresse : 
        { type: Sequelize.TEXT } ,
    date_etab_doc_init : 
        { type: Sequelize.DATE } ,
    annee : 
        { type: Sequelize.INTEGER }
});

module.exports = passation_model ;