const { presentation_projet_model , user_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const id_projet = req.body.id_projet ;
        const description = req.body.description ;
        const image = req.body.image || null;
        const etat = req.body.etat;
        
        const presentation_projet = await presentation_projet_model.create( { 
            description : description , 
            image : image , 
            etat : etat ,
            status_ : true ,
            id_projet : id_projet } ) ;
        return res.status(200).json( { message: "La présentation a été bien ajoutée" , presentation_projet , created : true } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create() presentation");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

update_presentation = async ( req , res ) =>
{
    try
    {        
        const presentation_id = req.params.presentation_id ;
        
        const presentation = await presentation_projet_model.findOne( { where : { id: presentation_id } } ) ;
        if( !presentation )
        {
            return res.status(200).json( {message : "Non trouvée" , updated: false } ) ;
        }        
        
        const status_ = req.body.status_ ?? presentation.status_ ;

        await presentation_projet_model.update(
            { 
                status_: status_ 
            } ,
            { where: { id: presentation_id } }
        );
        
        let message = null ;
        if( status_ )
        {
            message = "La présentation a été bien restaurée" ;
        }
        else
        {
            message = "La présentation a été bien supprimée" ;
        }

        return res.status(200).json( { message : message || "La présentation a été bien mise à jour" , updated: true } ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur update_presentation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_all_prsentation = async ( req , res ) =>
{
    try
    {  
        const id_projet = req.params.id_projet ;
        const etat = req.query.etat ;
        const status_ = req.query.status_ ;

        const where_condition = {} ;
        where_condition.id_projet = id_projet ;

        if (etat) 
        {
            where_condition.etat = etat ; 
        }

        if ( status_ !== "undefined" ) 
        {
            where_condition.status_ = status_ === 'true'; 
        }

        const comments = await presentation_projet_model.findAll({ 
            where: where_condition ,
            order: [ ['etat', 'asc'], ['id', 'desc'] ],
        }) ;
                
        return res.status(200).json( comments ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_prsentation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  create ,
                    get_all_prsentation ,
                    update_presentation }