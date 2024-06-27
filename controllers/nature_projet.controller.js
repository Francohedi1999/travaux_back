const { nature_projet_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const designation = req.body.designation ;
    
        const nature_projet = await nature_projet_model.findOne( { where : { designation: designation } } ) ;
        if( nature_projet )
        {
            return res.status(200).json( { message: "Cette nature de projet existe déjà" , nature_projet , created : false } ) ;
        }
    
        const nature_projet_ = await nature_projet_model.create( { designation: designation , deleted : false } ) ;
        return res.status(200).json( { message: "La nature de projet a été bien ajouté" , nature_projet_ , created : true } ) ;
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

get_all_nature_projet = async ( req , res ) =>
{
    try
    {  
        const nature_projets = await nature_projet_model.findAll() ;
                
        return res.status(200).json( nature_projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get all projets");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}


get_nature_not_deleted = async ( req , res ) =>
{
    try
    {  
        const nature_projets = await nature_projet_model.findAll({ where: { deleted : false } }) ;
                
        return res.status(200).json( nature_projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get all projets");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_nature_by_id = async ( req , res ) =>
{
    try
    {  
        const nature_id = req.params.id ;
        const nature_projet = await nature_projet_model.findOne( { where : { id: nature_id } } ) ;

        if( !nature_projet )
        {
            return res.status(200).json( {message : "Non trouvé" } ) ;
        }
                
        return res.status(200).json( nature_projet ) ;
    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur get projet by Id");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
}

update_nature = async ( req , res ) =>
{
    try
    {
        const nature_id = req.params.id ;
        const nature = await nature_projet_model.findOne( { where : { id: nature_id } } ) ;

        if( !nature )
        {
            return res.status(200).json( {message : "Non trouvé" } ) ;
        }

        if( nature.deleted )
        {
            await nature_projet_model.update(
                { deleted: false } ,
                { where: { id: nature_id } }
            );
            return res.status(200).json( { message : "La nature de projet a été bien restaurée" } ) ;
        }
        else
        {
            await nature_projet_model.update( 
                { deleted: true } ,
                { where: { id: nature_id } }
            );
            return res.status(200).json( { message : "La nature de projet a été bien supprimée" } ) ;
        }

    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur delete projet");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  create ,
                    get_all_nature_projet ,
                    get_nature_not_deleted ,
                    get_nature_by_id ,
                    update_nature }