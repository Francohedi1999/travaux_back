const { maj_passation_model , projet_model , passation_model } = require("../migrations") ;
const { Op } = require("sequelize") ;
const moment = require("moment") ;

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

        let start_date = req.query.start_date ;
        let end_date = req.query.end_date ;
        const page = req.query.page || 1 ;
        const limit= req.query.limit || 10;
        const status= req.query.status;
        const numero_maj= req.query.numero_maj;

        const page_number = parseInt( page );
        const limit_number = parseInt( limit );
        const offset = ( page_number - 1 ) * limit_number;

        const where_condition = { id_passation: id_passation , };

        console.log("Start date:", start_date);
        console.log("End date:", end_date);

        if ( start_date && end_date ) 
        {
            end_date = moment(end_date).add( 1 , 'days' ).format('YYYY-MM-DD');
            where_condition.date_maj = { [Op.between]: [start_date, end_date] };
        } 
        else if ( start_date && !end_date ) 
        {
            where_condition.date_maj = { [Op.gte]: start_date };
        } 
        else if ( end_date && !start_date ) 
        {
            end_date = moment(end_date).add( 1 , 'days' ).format('YYYY-MM-DD');
            where_condition.date_maj = { [Op.lte]: end_date };
        }

        if (status !== "undefined") 
        {
            where_condition.status_ = status === 'true'; 
        }
        if (numero_maj) 
        {
            where_condition.numero_maj = numero_maj ; 
        }

        const majs = await maj_passation_model.findAndCountAll({
            where: where_condition,
            order: [ ['numero_maj', 'ASC'] ],
            limit: limit_number,
            offset: offset
        });
        
        return res.status(200).json({
            total_items: majs.count ,
            data: majs.rows ,
            current_page: page_number ,
            total_pages: Math.ceil( majs.count / limit_number )
        });
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