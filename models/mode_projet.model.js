const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const mode_projet_model = sequelize_DB.define("mode_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true },
    designation: 
        { type: Sequelize.TEXT },
    deleted :
        { type: Sequelize.BOOLEAN , defaultValue: false }
});

module.exports = mode_projet_model ;