const { maj_passation_model , projet_model , passation_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const id_passation = req.body.id_passation ;
        const date_maj = req.body.date_maj ;
        const projets = req.body.projets ;

        const count_maj_passations = await maj_passation_model.count({ where: { id_passation: id_passation } }); 
        const maj_passation = await maj_passation_model.create( { date_maj: date_maj , numero_maj: count_maj_passations + 1 , id_passation: id_passation } ) ;
        
        const id_maj = maj_passation.id ;
        const projets_data = projets.map( projet => ({
            ...projet ,
            id_maj: id_maj ,
            id_status_projet: 1 
        }) );
        await projet_model.bulkCreate(projets_data);

        res.status(200).json( { message: "La mise à jour a été bien ajoutée" } );
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create() maj_passation");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_all_majs_passation = async ( req , res ) =>
{
    try
    {
        const id_passation = req.params.id_passation ;
        const majs = await maj_passation_model.findAll( { where: { id_passation : id_passation } ,
                                                        order: [['numero_maj', 'ASC']] } ) ;
        return res.status(200).json( majs ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_majs_passation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_maj_by_id = async ( req , res ) =>
{
    try
    {
        const id_maj = req.params.id_maj ;
        const maj = await maj_passation_model.findOne({ where: { id : id_maj } , 
                                                        include: [ { model: passation_model , as: 'passation' } ] } ) ;
        return res.status(200).json( maj ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_maj_by_id()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_maj_by_passation_and_num_maj = async ( req , res ) =>
{
    try
    {
        const id_passation = req.params.id_passation ;
        const numero_maj = req.params.numero_maj ;
        const maj = await maj_passation_model.findOne({ where: { id_passation : id_passation , numero_maj: numero_maj } } ) ;
        return res.status(200).json( maj ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_maj_by_passation_and_num_maj()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

update_maj = async ( req , res ) =>
{
    try
    {
        const id_maj = req.params.id_maj ;
        const status = req.body.status ;

        const maj = await maj_passation_model.findOne({ where: { id: id_maj } } ) ;
        if( !maj )
        {
            return res.status(200).json( { message : "Mise à jour non trouvée" , published: false } ) ;
        }

        let message_ = null ;
        let published_ = false ;
        if( status == true )
        {
            const maj_published = await maj_passation_model.findOne( { where: { id_passation: maj.id_passation , status_: status } } ) ;
            if( maj_published )
            {
                return res.status(200).json( { message : "Il existe déjà une mise à jour publiée", published: false } ) ;
            }

            await maj_passation_model.update(
                { status_: status } ,
                { where: { id: id_maj } }
            );
            await projet_model.update( { status_: status } , { where: { id_maj: id_maj } } ) ;
            message_ = "Mise à jour a été publiée" ;
            published_ = true ;
        }
        else
        {
            await maj_passation_model.update(
                { status_: status } ,
                { where: { id: id_maj } }
            );
            await projet_model.update( { status_: status } , { where: { id_maj: id_maj } } ) ;
            message_ = "Mise à jour a été annulée" ;
            published_ = true ;
        }
        return res.status(200).json( { message : message_, published: published_ } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur update_maj()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  create , 
                    get_all_majs_passation , 
                    update_maj ,
                    get_maj_by_passation_and_num_maj ,
                    get_maj_by_id }