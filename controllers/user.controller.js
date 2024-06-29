const { user_model } = require("../migrations") ;
const bcrypt = require("bcrypt");

create = async ( req , res ) => 
{
    try
    {
        const user = await user_model.findOne( { where: { email: req.body.email } } ) ;
        if( user )
        {
            return res.status(200).json( { message: "Cet utilisateur existe déjà" , user , created : false } ) ;
        }
        
        const password_ = await bcrypt.hash( req.body.password , 10 ) ;
        const new_user = await user_model.create( {
            nom : req.body.nom ,
            prenom : req.body.prenom ,
            email : req.body.email ,
            password : password_ ,
            sexe : req.body.sexe ,
            date_naissance : req.body.date_naissance ,
            id_role : req.body.id_role ,
            deleted : false 
        } ) ;
    
        return res.status(200).json( { message: "L'utilisateur a été bien ajoutée" , new_user , created : true  } ) ;
    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur create user");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
} ;

get_user_logged = async ( req , res ) => 
{
    try  
    {
        const user_logged = await user_model.findOne( { where : { id: req.user.id } } ) ; 

        if( !user_logged )
        {
            return res.status(200).json( { message: "Utilisateur non connecté" } ) ;
        }
        
        return res.status(200).json( user_logged ) ;
    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur get_user_logged()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( { message: error } )
    }   
} ;


get_all_users = async ( req , res ) => 
{
    try
    {
        const users = await user_model.findAll() ;
        return res.status(200).json( users ) ;
    }
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_users()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( { message: error } )
    } 
} ;

delete_or_restore_user = async ( req , res ) =>
{
    try
    {
        const user_id = req.params.id ;
        const user = await user_model.findOne( { where : { id: user_id } } ) ;

        if( !user )
        {
            return res.status(200).json( {message : "Utilisateur non trouvé" } ) ;
        }

        if( user.deleted )
        {
            await user_model.update(
                { deleted: false } ,
                { where: { id: user_id } }
            );
            return res.status(200).json( { message : "L'utilisateur a été bien restauré" } ) ;
        }
        else
        {
            await user_model.update( 
                { deleted: true } ,
                { where: { id: user_id } }
            );
            return res.status(200).json( { message : "L'utilisateur a été bien supprimé" } ) ;
        }

    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur delete_or_restore_user()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_user_by_id = async ( req , res ) => 
{
    try  
    {
        const user_id = req.params.id ;
        const user = await user_model.findOne( { where : { id: user_id } } ) ; 

        if( !user )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" } ) ;
        }
        
        return res.status(200).json( user ) ;
    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur get_user_by_id");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( { message: error } )
    }   
} ;

module.exports =    {  
                        create ,
                        get_user_logged ,
                        get_all_users ,
                        delete_or_restore_user , 
                        get_user_by_id
                    }