const Sequelize = require("sequelize") ;
const { sequelize_DB } = require("../config/db.config") ;

const projet_model = sequelize_DB.define("projet", 
{
    id : 
        { type: Sequelize.INTEGER , primaryKey: true  , autoIncrement: true},
    objet : 
        { type: Sequelize.TEXT } ,
    montant_estim_init : 
        { type: Sequelize.DECIMAL } ,
    n_montant_estim_init : 
        { type: Sequelize.DECIMAL } ,
    financement : 
        { type: Sequelize.TEXT } ,
    serivce_ben : 
        { type: Sequelize.TEXT } ,
    compte : 
        { type: Sequelize.TEXT } ,
    montant_estim_par_ben : 
        { type: Sequelize.DECIMAL } ,
    n_montant_estim_par_ben : 
        { type: Sequelize.DECIMAL } ,
    date_prev_lance : 
        { type: Sequelize.DATE } ,
    date_prev_ouv_plis : 
        { type: Sequelize.DATE } ,
    date_prev_att : 
        { type: Sequelize.DATE }
});

module.exports = projet_model ;