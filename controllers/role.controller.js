const { role_model } = require("../migrations") ;

create = async ( req , res ) => 
{
    try
    {
        const designation = req.body.designation ;    
        
        const role = await role_model.findOne( { where : { designation: designation } }) ;
        if( role )
        {
            return res.status(200).json( { message: "Ce role existe déjà" , role , created : false } ) ;
        }
    
        const role_ = await role_model.create( { designation: designation } ) ;
        return res.status(200).json( { message: "Le role a été bien ajouté" , role_ , created : true } ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur sur la fonction create role");
        console.log( error.message );
        console.log("=====================================================================");
    }
} ;

get_all_roles = async ( req , res ) =>
{
    try
    {  
        const roles = await role_model.findAll() ;
                
        return res.status(200).json( roles ) ;
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

module.exports = { 
    create , 
    get_all_roles , 
}