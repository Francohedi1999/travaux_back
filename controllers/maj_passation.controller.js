const { maj_passation_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const id_passation = req.body.id_passation ;
        const projets = req.body.projets ;

        const count_maj_passations = await maj_passation_model.count({ where: { id_passation: id_passation } }); 
        const maj_passation = await maj_passation_model.create( { date_maj: date_maj , numero_maj: count_maj_passations + 1 } ) ;
        
        const id_maj = maj_passation.id ;
        const projets_data = projets.map( projet => ({
            ...projet ,
            id_maj: id_maj
        }) );
        await projet_model.bulkCreate(projets_data);

        res.status(200).json({ message: "La mise à jour a été bien ajoutée" });
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

module.exports = {  create }