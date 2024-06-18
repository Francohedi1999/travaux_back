const { mode_projet_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const designation = req.body.designation ;
    
        const mode_projet = await mode_projet_model.findOne( { where : { designation: designation } } ) ;
        if( mode_projet )
        {
            return res.status(200).json( { message: "Ce mode de projet existe déjà" , mode_projet , created : false } ) ;
        }
    
        const mode_projet_ = await mode_projet_model.create( { designation: designation } ) ;
        return res.status(200).json( { message: "Le mode de projet a été bien ajouté" , mode_projet_ , created : true } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create role");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_all_mode_projet = async ( req , res ) =>
{
    try
    {  
        const mode_projets = await mode_projet_model.findAll() ;
                
        return res.status(200).json( mode_projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get all roles");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_mode_not_deleted = async ( req , res ) =>
{
    try
    {  
        const mode_projets = await mode_projet_model.findAll( { where: { deleted: false } } ) ;
                
        return res.status(200).json( mode_projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get all roles");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_mode_by_id = async ( req , res ) =>
{
    try
    {  
        const mode_id = req.params.id ;
        const mode_projet = await mode_projet_model.findOne( { where : { id: mode_id } } ) ;

        if( !mode_projet )
        {
            return res.status(200).json( {message : "Non trouvé" } ) ;
        }
                
        return res.status(200).json( mode_projet ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get projet by Id");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

delete_or_restore_mode = async ( req , res ) =>
{
    try
    {
        const mode_id = req.params.id ;
        const mode = await mode_projet_model.findOne( { where : { id: mode_id } } ) ;

        if( !mode )
        {
            return res.status(200).json( {message : "Non trouvé" } ) ;
        }

        if( mode.deleted === true )
        {
            await mode_projet_model.update(
                { deleted: false } ,
                { where: { id: mode_id } }
            );
            return res.status(200).json( { message : "Le mode de projet a été bien restauré" } ) ;
        }
        else
        {
            await mode_projet_model.update(
                { deleted: true  }  ,
                { where: { id: mode_id } }
            );        
            return res.status(200).json( { message : "Le mode de projet a été bien supprimé" } ) ;
        }

    }
    catch( error )
    {
        console.log("");
        console.log("Erreur delete projet");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  
                    create ,
                    get_all_mode_projet ,
                    get_mode_not_deleted ,
                    get_mode_by_id ,
                    delete_or_restore_mode 
                }