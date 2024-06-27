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
        return res.status(200).json( { message: "La nature de projet a été bien ajoutée" , nature_projet_ , created : true } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create nature");
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
        console.log("Erreur get all natures");
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
        console.log("Erreur get all natures non supprimées");
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
            return res.status(200).json( {message : "Non trouvée" } ) ;
        }
                
        return res.status(200).json( nature_projet ) ;
    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur get nature by Id");
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

        const designation = req.body.designation ;
        const deleted = req.body.deleted ;

        const nature = await nature_projet_model.findOne( { where : { id: nature_id } } ) ;

        if( !nature )
        {
            return res.status(200).json( {message : "Non trouvée" } ) ;
        }
        
        await nature_projet_model.update(
            { deleted: deleted } ,
            { designation: designation } ,
            { where: { id: nature_id } }
        );
        
        return res.status(200).json( { message : "La nature de projet a été bien mise à jour" } ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur update nature");
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