const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const maj_passation_model = sequelize_DB.define("maj_passation", 
{
    id : 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true },
    date_maj : 
        { type: Sequelize.DATE } ,
    numero_maj :
        { type: Sequelize.INTEGER } ,
    status_ :
        { type: Sequelize.BOOLEAN , defaultValue: false },
});

module.exports = maj_passation_model ;