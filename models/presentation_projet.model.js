const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const presentation_projet_model = sequelize_DB.define("presentation_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true } ,
    description: 
        { type: Sequelize.TEXT } ,
    image_path: 
        { type: Sequelize.TEXT } ,
});

module.exports = presentation_projet_model ;