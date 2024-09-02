const { user_model , role_model } = require("../migrations") ;
const { Op } = require("sequelize") ;
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
        const user_logged = await user_model.findOne( { where : { id: req.user.id } ,include: [ { model: role_model, as: 'role' } ] } ) ; 

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
        const nom = req.query.nom || ''; 
        const prenom = req.query.prenom || ''; 
        const sexe = req.query.sexe || ''; 
        const role = req.query.role ; 
        const deleted = req.query.deleted ; 

        const page = req.query.page || 1 ;
        const limit= req.query.limit || 10;

        const page_number = parseInt( page );
        const limit_number = parseInt( limit );
        const offset = ( page_number - 1 ) * limit_number;

        const where_condition = {} ;
        if (nom) 
        {
            where_condition.nom = { [Op.like]: `%${nom}%` }; 
        }
        if (prenom) 
        {
            where_condition.prenom = { [Op.like]: `%${prenom}%` }; 
        }
        if (sexe) 
        {
            where_condition.sexe = sexe ; 
        }
        if (role) 
        {
            where_condition.id_role = role ; 
        }
        if (deleted !== "undefined") 
        {
            where_condition.deleted = deleted === 'true'; 
        }

        const users = await user_model.findAndCountAll({
            where: where_condition ,
            include: [ { model: role_model, as: 'role' } ] ,
            limit: limit_number ,
            offset: offset
        });

        return res.status(200).json({
            total_items: users.count ,
            data: users.rows ,
            current_page: page_number ,
            total_pages: Math.ceil( users.count / limit_number )
        });
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

update_profile = async ( req , res ) =>
{
    try
    {
        const user_id = req.params.id ;
        const user = await user_model.findOne( { where : { id: user_id } } ) ;

        if( !user )
        {
            return res.status(200).json( {message : "Utilisateur non trouvé" , updated: false } ) ;
        }
        
        const password_ = await bcrypt.hash( req.body.password , 10 ) ;
        await user_model.update(
            { 
                nom : req.body.nom ,
                prenom : req.body.prenom ,
                email : req.body.email ,
                password : password_ ,
                date_naissance : req.body.date_naissance ,
            } ,
            { where: { id: user_id } }
        );
            
        return res.status(200).json( { message : "Votre profil a été bien modifié" , updated: true } ) ;
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
                        update_profile ,
                        delete_or_restore_user , 
                        get_user_by_id
                    }