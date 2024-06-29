const { passation_model } = require("../migrations") ;

create = async ( req , res ) => 
{
    try 
    {
        const user = req.user ;
        
        const new_passation = await passation_model.create( { 
            aut_cont : req.body.aut_cont ,
            nom_prmp : req.body.nom_prmp ,
            adresse : req.body.adresse ,
            date_etab_doc_init : req.body.date_etab_doc_init ,
            annee : req.body.annee ,
            id_user : user.id
        } );

        return res.status(200).json( { message: "La passation a été bien ajoutée" , new_passation , created: true } ) ;
    }
    catch( error ) 
    {
        console.log("=====================================================================");
        console.log("Erreur create() passation");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
} 

get_all_passation = async ( req , res ) =>
{
    try
    {
        const passations = await passation_model.findAll();

        return res.status(200).json( passations ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_passation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ;
    }
}

get_passation_by_id = async ( req , res ) =>
{
    try
    {
        const passation_id = req.params.id ; 
        const passation = await passation_model.findOne( { where: { id: passation_id } } ) ; 
        
        if( passation )
        {        
            return res.status(200).json( passation ) ;
        }
        else
        {
            console.log("=====================================================================");
            console.log("Cette passation n'existe pas");
            console.log("=====================================================================");
            return res.status(200).json( { message: "Cette passation n'existe pas" } ) ;
        }
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_passation_by_id()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ;
    }
}

module.exports = { 
    create , 
    get_all_passation , 
    get_passation_by_id 
}