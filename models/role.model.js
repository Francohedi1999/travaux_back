const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const role_model = sequelize_DB.define("role", 
{
    id : 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true },
    designation : 
        { type: Sequelize.STRING }
});

module.exports = role_model ;