const { status_projet_model } = require("../migrations") ;

get_all_status_projet = async ( req , res ) =>
{
    try
    {  
        const status_projet = await status_projet_model.findAll() ;
                
        return res.status(200).json( status_projet ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_status_projet()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_status_by_id = async ( req , res ) =>
{
    try
    {  
        const status_id = req.params.status_id ;
        const status_projet = await status_projet_model.findOne( { where : { id: status_id } } ) ;

        if( !status_projet )
        {
            return res.status(200).json( {message : "Non trouvé" } ) ;
        }
                
        return res.status(200).json( status_projet ) ;
    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur get_status_by_id()");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  get_all_status_projet , get_status_by_id }