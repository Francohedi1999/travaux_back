const { projet_model , 
        status_projet_model , 
        nature_projet_model , 
        mode_projet_model } = require("../migrations") ;

get_all_projets_by_maj = async ( req , res ) =>
{
    try
    {
        const id_maj = req.params.id_maj ;
        const projets = await projet_model.findAll( { 
            where: { id_maj: id_maj } ,
            include: [ 
                {
                    model: status_projet_model,
                    as: 'status_projet'
                },
                {
                    model: nature_projet_model,
                    as: 'nature_projet'
                },
                {
                    model: mode_projet_model,
                    as: 'mode_projet'
                }
            ] 
        } ) ;
        return res.status(200).json( projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_projets_by_maj()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_projet_by_id = async ( req , res ) =>
{
    try
    {
        const projet_id = req.params.id
        const projet = await projet_model.findOne( { where: { id: projet_id } } ) ;
        return res.status(200).json( projet ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_projet_by_id()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_projets_by_passation = async ( req , res ) =>
{
    try
    {
        const passation_id = req.params.id
        const projets = await projet_model.findAll( { where: { id_p: passation_id } } ) ;
        return res.status(200).json( projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_projets_by_passation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}


module.exports = {
    create ,
    get_all_projets_by_maj ,
    get_projet_by_id ,
    get_projets_by_passation 
}