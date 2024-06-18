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
        operatorsAliases: false ,
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
        console.log('==================================================================================================');
        console.log('==================================================================================================');
        console.log('Base de données synchronisée');
        console.log('');
        console.log('');

        console.log('==================================================================================================');
        console.log('==================================================================================================');
        console.log('Création rôle');
        console.log('');
        console.log('');

        await role_model.findOrCreate({ where: { id: 1 } , defaults: { designation: 'Administrateur' } });

        await role_model.findOrCreate({ where: { id: 2 }, defaults: { designation: 'Utilisateur' } });

        const password = await bcrypt.hash( "0000" , 10 ) ;
        const admin = await user_model.findOrCreate({
        where: { email: 'administrateur@gmail.com' },
        defaults: {
            nom: 'Administrateur',
            prenom: 'Administrateur',
            email: 'administrateur@gmail.com',
            password: password ,
            sexe: 'M',
            date_naissance: "12/12/1222",
            id_role: 1,
        }
        });

        if (admin) 
        {
        console.log('==================================================================================================');
        console.log('==================================================================================================');
        console.log('Administrateur créé');
        console.log('');
        console.log('');
        } 
        else 
        {
        console.log('==================================================================================================');
        console.log('==================================================================================================');
        console.log('Administrateur existe déjà');
        console.log('');
        console.log('');
        }
  
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