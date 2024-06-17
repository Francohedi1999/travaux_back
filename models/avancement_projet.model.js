const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const avancement_projet_model = sequelize_DB.define("avancement_projet", 
{
    id: 
        { type: Sequelize.INTEGER , primaryKey: true , autoIncrement: true } ,
    description: 
        { type: Sequelize.TEXT } ,
    pourcentage: 
        { type: Sequelize.DECIMAL } ,
    date_enreg: 
        { type: Sequelize.DATE } ,
});

module.exports = avancement_projet_model ;