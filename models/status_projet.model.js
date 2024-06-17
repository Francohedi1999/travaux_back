const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const status_projet_model = sequelize_DB.define("status_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true  , autoIncrement: true},
    designation: 
        { type: Sequelize.TEXT }
});

module.exports = status_projet_model ;