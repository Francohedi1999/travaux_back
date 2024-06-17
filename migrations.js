const avancement_projet_model = require("./models/avancement_projet.model") ;
const commentaire_projet_model = require("./models/commentaire_projet.model") ;
const maj_passation_model = require("./models/maj_passation.model") ;
const mode_projet_model = require("./models/mode_projet.model") ;
const nature_projet_model = require("./models/nature_projet.model") ;
const passation_model = require("./models/passation.model") ;
const presentation_projet_model = require("./models/presentation_projet.model") ;
const projet_model = require("./models/projet.model") ;
const role_model = require("./models/role.model") ;
const status_projet_model = require("./models/status_projet.model") ;
const user_model = require("./models/user.model") ; 

role_model.hasMany( user_model , { foreignKey: 'id_role' } ) ;
user_model.belongsTo( role_model , { foreignKey: 'id_role' } ) ;

user_model.hasMany( passation_model , { foreignKey: 'id_user' } ) ;
passation_model.belongsTo( user_model , { foreignKey: 'id_user' } ) ;

passation_model.hasMany( maj_passation_model , { foreignKey: 'id_passation' } ) ;
maj_passation_model.belongsTo( passation_model , { foreignKey: 'id_passation' } ) ;

maj_passation_model.hasMany( projet_model , { foreignKey: 'id_maj' } ) ;
projet_model.belongsTo( maj_passation_model , { foreignKey: 'id_maj' } ) ;

nature_projet_model.hasMany( projet_model , { foreignKey: 'id_nature' } ) ;
projet_model.belongsTo( nature_projet_model , { foreignKey: 'id_nature' } ) ;

mode_projet_model.hasMany( projet_model , { foreignKey: 'id_mode' } ) ;
projet_model.belongsTo( mode_projet_model , { foreignKey: 'id_mode' } ) ;

status_projet_model.hasMany( projet_model , { foreignKey: 'id_status_projet' } ) ;
projet_model.belongsTo( status_projet_model , { foreignKey: 'id_status_projet' } ) ;

projet_model.hasMany( presentation_projet_model , { foreignKey: 'id_projet' } ) ;
presentation_projet_model.belongsTo( projet_model , { foreignKey: 'id_projet' } ) ;

projet_model.hasMany( commentaire_projet_model , { foreignKey: 'id_projet' } ) ;
commentaire_projet_model.belongsTo( projet_model , { foreignKey: 'id_projet' } ) ;

projet_model.hasMany( avancement_projet_model , { foreignKey: 'id_projet' } ) ;
avancement_projet_model.belongsTo( projet_model , { foreignKey: 'id_projet' } ) ;

user_model.hasMany( commentaire_projet_model , { foreignKey: 'id_user' } ) ;
commentaire_projet_model.belongsTo( user_model , { foreignKey: 'id_user' } ) ;

module.exports = {  
                    avancement_projet_model ,
                    commentaire_projet_model ,
                    maj_passation_model , 
                    mode_projet_model , 
                    nature_projet_model , 
                    passation_model ,  
                    presentation_projet_model ,
                    projet_model ,
                    role_model ,
                    status_projet_model ,
                    user_model ,
                } ;