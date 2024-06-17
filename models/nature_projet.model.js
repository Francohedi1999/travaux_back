const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const nature_projet_model = sequelize_DB.define("nature_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true  , autoIncrement: true},
    designation: 
        { type: Sequelize.TEXT },
    deleted :
        { type: Sequelize.BOOLEAN , defaultValue: false }
});

module.exports = nature_projet_model ;