const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const commentaire_projet_model = sequelize_DB.define("commentaire_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true } ,
    contenu: 
        { type: Sequelize.TEXT } ,
    image: 
        { type: Sequelize.TEXT } ,
});

module.exports = commentaire_projet_model ;