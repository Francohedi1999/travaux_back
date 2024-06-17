require("dotenv").config();
const { user_model } = require('../migrations') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require("bcrypt");

login_user = async ( req , res ) =>
{
    try
    {
        const email = req.body.email ;
        const password = req.body.password ;

        const user_ = await user_model.findOne({ where: { email: email } }) ;

        if( user_ ) 
        {
            const validation_user = await bcrypt.compare( password , user_.password ) ;
            
            if( validation_user )
            {
                const token = await jwt.sign( { id: user_.id } , process.env.SECRET_KEY_JWT || "secret_key" , { expiresIn: "12h" } ) ;
                return res.status(200).json( { message: "Vous êtes bien connecté" , data : token , logged: true } ) ;
            }
            return res.status(200).json( { message: "Veuillez bien vérifier votre mot de passe" , logged: false } ) ;
        }

        return res.status(200).json( { message: "Veuillez bien vérifier votre email" , logged: false } ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur login user");
        console.log(error);
        console.log("=====================================================================");

        return res.status(500).json( { message: "Un erreur est survenue sur le serveur" } ) ;
    }
} ;

check_token = async ( req , res , next ) => 
{ 
    try  
    {
        const auth_header = req.headers.authorization;
        if ( !auth_header ) 
        {
            console.log("=====================================================================");
            console.log("Le token est non valide ou absent");
            console.log("=====================================================================");
            
            return res.status(400).json( { message: "Le token est non valide ou absent" } )  
        }
        const token = auth_header.split(" ")[1];
        const user = jwt.verify( token , process.env.SECRET_KEY_JWT );
        if ( !user ) 
        {
            console.log("=====================================================================");
            console.log("Le token ne correspond a aucun utilisateur");
            console.log("=====================================================================");
            
            return res.status(400).json( { message: "Le token ne correspond a aucun utilisateur" } )
        }
        req.user = user;
        next();
    } 
    catch (error) 
    {
        // throw error
        return res.status(400).json( { message: error } )
    }    
} ;
 

module.exports = { login_user , check_token }