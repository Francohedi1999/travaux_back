const { avancement_projet_model } = require("../migrations") ;

// avancement manuel
add_avancement = async ( req , res ) =>
{
    try
    {    
        const description = req.body.description || "" ;
        const pourcentage = req.body.pourcentage ;
        const date_enreg = req.body.date_enreg ;
        const id_projet = req.body.id_projet ;

        const avancement_projet = await avancement_projet_model.create( {
            description : description ,
            pourcentage : pourcentage ,
            date_enreg : date_enreg ,
            id_projet : id_projet
        } )

        return res.status(200).json( { message: "L'avancement sur PRJ-" + id_projet + " a été bien ajouté" , avancement_projet , created : true } ) ;
    
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur add_avancement() ");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
} 

module.exports = { add_avancement } ;