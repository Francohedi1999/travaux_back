const { projet_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {
        const new_projet = await projet_model.create( { 
            id_p : req.body.id_p , 
            id_np : req.body.id_np , 
            objet : req.body.objet , 
            montant_estim_init : req.body.montant_estim_init , 
            n_montant_estim_init : req.body.n_montant_estim_init , 
            id_mp : req.body.id_mp , 
            financement : req.body.financement , 
            serivce_ben : req.body.serivce_ben , 
            compte : req.body.compte , 
            montant_estim_par_ben : req.body.montant_estim_par_ben , 
            n_montant_estim_par_ben : req.body.n_montant_estim_par_ben , 
            date_prev_lance : req.body.date_prev_lance , 
            date_prev_ouv_plis : req.body.date_prev_ouv_plis , 
            date_prev_att : req.body.date_prev_att , 
            id_u : req.user.id } );

        return res.status(200).json( { message: "Le projet a été bien ajouté" , new_projet } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create project");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_all_projets = async ( req , res ) =>
{
    try
    {
        const projets = await projet_model.findAll() ;
        return res.status(200).json( projets ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get all projects");
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
        console.log("Erreur get all projects");
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
        console.log("Erreur get all projects");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}


module.exports = {
    create ,
    get_all_projets ,
    get_projet_by_id ,
    get_projets_by_passation 
}