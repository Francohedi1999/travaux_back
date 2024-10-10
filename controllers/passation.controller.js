const { passation_model } = require("../migrations") ;
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

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

update = async ( req , res ) => 
{
    const id_passation = req.params.id_passation ;
    const passation = await passation_model.findOne( { where : { id: id_passation } } ) ;
    if( !passation )
    {
        return res.status(200).json( {message : "Non trouvée" , updated: false } ) ;
    }  

    await passation_model.update(
        { 
            aut_cont : req.body.aut_cont ,
            nom_prmp : req.body.nom_prmp ,
            adresse : req.body.adresse ,
            date_etab_doc_init : req.body.date_etab_doc_init ,
            annee : req.body.annee ,
        } ,
        { where: { id: id_passation } }
    ) ;

    return res.status(200).json( { message : "La passation a été bien mise à jour" , updated: true } ) ;
}

get_all_passation = async (req, res) => 
{
    try 
    {
        const aut_cont = req.query.aut_cont || "";
        const nom_prmp = req.query.nom_prmp || "";
        const adresse = req.query.adresse || "";
        const date_etab_doc_init = req.query.date_etab_doc_init || "";
        const annee = req.query.annee || "";

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const page_number = parseInt(page);
        const limit_number = parseInt(limit);
        const offset = (page_number - 1) * limit_number;

        const where_condition = {};
        
        if (aut_cont) 
        {
            where_condition.aut_cont = { [Op.like]: `%${aut_cont}%` };
        }
        if (nom_prmp) 
        {
            where_condition.nom_prmp = { [Op.like]: `%${nom_prmp}%` };
        }
        if (adresse) 
        {
            where_condition.adresse = { [Op.like]: `%${adresse}%` };
        }
        if (date_etab_doc_init) 
        {
            const dateStart = dayjs.utc(date_etab_doc_init).startOf('day').toDate();
            const dateEnd = dayjs.utc(date_etab_doc_init).endOf('day').toDate();
            where_condition.date_etab_doc_init = { [Op.between]: [dateStart, dateEnd] };
        }
        if (annee) 
        {
            where_condition.annee = annee;
        }

        const passations = await passation_model.findAndCountAll({
            where: where_condition,
            order: [['annee', 'DESC']],
            limit: limit_number,
            offset: offset
        });

        return res.status(200).json({
            total_items: passations.count,
            data: passations.rows,
            current_page: page_number,
            total_pages: Math.ceil(passations.count / limit_number)
        });

    } catch (error) {
        console.log("=====================================================================");
        console.log("Erreur get_all_passation()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json(error);
    }
};

get_passations = async ( req , res ) =>
{
    try
    {  
        const passations = await passation_model.findAll({ order: [['id', 'DESC']] }) ;                
        return res.status(200).json( passations ) ;
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_passations");
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
    update ,
    get_passations ,
    get_passation_by_id 
}