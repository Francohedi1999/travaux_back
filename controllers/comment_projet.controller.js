const { commentaire_projet_model , user_model } = require("../migrations") ;

create = async ( req , res ) =>
{
    try
    {    
        const id_projet = req.body.id_projet ;
        const contenu = req.body.contenu ;
        const image = req.body.image || null;
        const id_user = req.body.id_user ;
        
        const commentaire_projet = await commentaire_projet_model.create( { 
            contenu : contenu , 
            image : image , 
            status_ : true ,
            id_user: id_user ,
            id_projet : id_projet } ) ;
        return res.status(200).json( { message: "Le commentaire a été bien ajouté" , commentaire_projet , created : true } ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur create() comment");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

update_comment = async ( req , res ) =>
{
    try
    {        
        const comment_id = req.params.comment_id ;
        
        const comment = await commentaire_projet_model.findOne( { where : { id: comment_id } } ) ;
        if( !comment )
        {
            return res.status(200).json( {message : "Non trouvée" , updated: false } ) ;
        }        
        
        const contenu = req.body.contenu ?? comment.contenu ;
        const image = req.body.image ?? comment.image ;
        const status_ = req.body.status_ ?? comment.status_ ;

        await commentaire_projet_model.update(
            { 
                status_: status_ , 
                contenu: contenu , 
                image: image 
            } ,
            { where: { id: comment_id } }
        );
        
        return res.status(200).json( { message : "Le commentaire a été bien mis à jour" , updated: true } ) ;
    }
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur update_comment()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_all_comment = async ( req , res ) =>
{
    try
    {  
        const id_projet = req.params.id_projet ;
        const status_ = req.query.status_ ;

        const where_condition = {} ;
        where_condition.id_projet = id_projet ;
        if (status_ !== "undefined") 
        {
            where_condition.status_ = status_ === 'true'; 
        }

        const comments = await commentaire_projet_model.findAll({ 
            where: where_condition ,
            include: [ 
                {
                    model: user_model,
                    as: 'user'
                }] ,
            order: [ ['id', 'desc'] ],
        }) ;
                
        return res.status(200).json( comments ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_comment()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

module.exports = {  create ,
                    get_all_comment ,
                    update_comment }