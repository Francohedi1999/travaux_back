require('dotenv').config() ;
const Sequelize = require("sequelize") ;

const bcrypt = require("bcrypt");

const sequelize_DB = new Sequelize(
    process.env.DB_DATABASE , 
    process.env.DB_USERNAME , 
    process.env.DB_PASSWORD ,
    {
        host: process.env.DB_HOST ,
        dialect: "postgres" ,
        operatorsAliases: 0 ,
        // dialectOptions: {
        //     ssl: {
        //         require: true, 
        //         rejectUnauthorized: false
        //     }
        // },
        pool: 
        {
            max: 5 ,
            min: 0 ,
            acquire: 30000 ,
            idle: 10000
        }
    }
) ;

const sync_db = async () => {
    try {
        await sequelize_DB.sync({ force: false });
        
        const role_model = require('../models/role.model'); 
        const user_model = require('../models/user.model');
        const status_projet_model = require('../models/status_projet.model') ;
        const mode_projet_model = require('../models/mode_projet.model') ;
        const nature_projet_model = require('../models/nature_projet.model') ;

        console.log('==================================================================================================');
        console.log('Base de données synchronisée');
        console.log('');

        console.log('==================================================================================================');
        console.log('Création rôle');
        console.log('');

        await role_model.findOrCreate({ where: { id: 1 } , defaults: { designation: 'Administrateur' } });
        await role_model.findOrCreate({ where: { id: 2 }, defaults: { designation: 'Utilisateur' } });


        console.log('==================================================================================================');
        console.log('Création administrateur');
        console.log('');

        const password = await bcrypt.hash( "0000" , 10 ) ;
        await user_model.findOrCreate( {
        where: { email: 'admin@gmail.com' } , 
        defaults: { nom: 'Administrateur' ,
                    prenom: 'Administrateur' ,
                    email: 'admin@gmail.com' ,
                    password: password ,
                    sexe: 'H' ,
                    date_naissance: "12/12/1222" ,
                    id_role: 1 ,
                    deleted: false } } ) ;
        
        console.log('==================================================================================================');
        console.log('Création administrateur');
        console.log('');

        await status_projet_model.findOrCreate({ where: { id: 1 } , defaults: { designation: 'Avenir' } });
        await status_projet_model.findOrCreate({ where: { id: 2 } , defaults: { designation: 'En cours' } });
        await status_projet_model.findOrCreate({ where: { id: 3 } , defaults: { designation: 'Réalisé' } });

        console.log('==================================================================================================');
        console.log('Création mode de passation');
        console.log('');

        await mode_projet_model.findOrCreate({  where: { id: 1 } , 
                                                defaults: { designation: "Appel d'offre ouvert internationnal" , deleted: false } });
        await mode_projet_model.findOrCreate({  where: { id: 2 } , 
                                                    defaults: { designation: "Appel à manifestation d'intérêt" , deleted: false } });
        await mode_projet_model.findOrCreate({  where: { id: 3 } , 
                                                    defaults: { designation: "Consultation de prix ouverte" , deleted: false } });

        console.log('==================================================================================================');
        console.log('Création nature de passation');
        console.log('');

        await nature_projet_model.findOrCreate({  where: { id: 1 } , 
                                                    defaults: { designation: "Travaux" , deleted: false } });
        await nature_projet_model.findOrCreate({  where: { id: 2 } , 
                                                    defaults: { designation: "Prestation intellectuelle" , deleted: false } });
    } 
    catch (error) 
    {
        console.log('==================================================================================================');
        console.log('==================================================================================================');
        console.log('Erreur sur la synchronisation de la base de données');
        console.log(error);
        console.log('');
        console.log('');
    }
  };

module.exports = { sequelize_DB , sync_db } ;