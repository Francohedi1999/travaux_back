const { projet_model , 
        status_projet_model , 
        nature_projet_model , 
        maj_passation_model ,
        mode_projet_model } = require("../migrations") ;
const { Op } = require("sequelize") ;
const Sequelize = require("sequelize");
const ExcelJS = require('exceljs');

get_all_projets_by_maj = async ( req , res ) =>
{
    try
    {
        const id_maj = req.params.id_maj ;

        const id = req.query.id ; 
        const objet = req.query.objet ; 
        const id_nature = req.query.id_nature ; 
        const id_mode = req.query.id_mode ; 
        const id_status_projet = req.query.id_status_projet ; 

        const page = req.query.page || 1 ;
        const limit= req.query.limit || 10;

        const page_number = parseInt( page );
        const limit_number = parseInt( limit );
        const offset = ( page_number - 1 ) * limit_number;

        const where_condition = {} ;
        where_condition.id_maj = id_maj ;
        if (id) 
        {
            where_condition.id = id ; 
        }
        if (objet) 
        {
            where_condition.objet = { [Op.like]: `%${objet}%` }; 
        }
        if (id_nature) 
        {
            where_condition.id_nature = id_nature ; 
        }
        if (id_mode) 
        {
            where_condition.id_mode = id_mode ; 
        }
        if (id_status_projet) 
        {
            where_condition.id_status_projet = id_status_projet ; 
        }

        const projets = await projet_model.findAndCountAll( { 
            where: where_condition  ,
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
            ]  ,
            limit: limit_number ,
            offset: offset
        } ) ;

        return res.status(200).json({
            total_items: projets.count ,
            data: projets.rows ,
            current_page: page_number ,
            total_pages: Math.ceil( projets.count / limit_number )
        });
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

get_all_projets_by_status = async ( req , res ) =>
{
    try
    {
        const id_status_projet = req.query.id_status_projet ;
        const id = req.query.id; 
        const objet = req.query.objet; 
        const id_nature = req.query.id_nature ; 
        const id_mode = req.query.id_mode ; 

        const page = req.query.page || 1 ;
        const limit= req.query.limit || 10;

        const page_number = parseInt( page );
        const limit_number = parseInt( limit );
        const offset = ( page_number - 1 ) * limit_number;

        const where_condition = {} ;
        if( id_status_projet )
        {
            where_condition.id_status_projet = id_status_projet ;
        }
        if (id) 
        {
            where_condition.id = id ; 
        }
        if (objet) 
        {
            where_condition.objet = { [Op.like]: `%${objet}%` }; 
        }
        if (id_nature) 
        {
            where_condition.id_nature = id_nature ; 
        }
        if (id_mode) 
        {
            where_condition.id_mode = id_mode ; 
        }

        const projets = await projet_model.findAndCountAll( { 
            where: where_condition  ,
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
            ]  ,
            limit: limit_number ,
            offset: offset
        } ) ;

        return res.status(200).json({
            total_items: projets.count ,
            data: projets.rows ,
            current_page: page_number ,
            total_pages: Math.ceil( projets.count / limit_number )
        });
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_projets_by_status()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_projets = async ( req , res ) =>
{
    try
    {
        const id_status_projet = req.query.id_status_projet ;
        const id_passation = req.query.id_passation ;

        let projets = null ;

        if( id_status_projet )
        {
            projets = await projet_model.findAll( { 
                where: { id_status_projet: id_status_projet } ,
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
        }
        if ( id_passation ) 
        {
            const maj = await maj_passation_model.findOne({ where: { id_passation : id_passation , status_: true } }) ;
            projets = await projet_model.findAll( { 
                where: { id_maj: maj.id } ,
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
        }
        

        return res.status(200).json({ projets });
    } 
    catch( error )
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_projets_by_status()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json( error ) ; 
    }
}

get_projet_by_id = async ( req , res ) =>
{
    try
    {
        const projet_id = req.params.id ;
        const projet = await projet_model.findOne( { 
            where: { id: projet_id } ,
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



// get_projets_by_passation = async ( req , res ) =>
// {
//     try
//     {
//         const passation_id = req.params.id
//         const projets = await projet_model.findAll( { where: { id_p: passation_id } } ) ;
//         return res.status(200).json( projets ) ;
//     } 
//     catch( error )
//     {
//         console.log("=====================================================================");
//         console.log("Erreur get_projets_by_passation()");
//         console.log(error);
//         console.log("=====================================================================");

//         return res.status(400).json( error ) ; 
//     }
// }

get_total_projects_by_status_projet = async (req, res) => 
{
    try 
    {
        const total_projects_by_status = await projet_model.findAll({
            attributes: [
                'id_status_projet',
                [Sequelize.fn('COUNT', Sequelize.col('projet.id')), 'total_projets'],
                'status_projet.designation',
                'status_projet.id'  // Include this in the attributes
            ],
            where: {
                status_: true
            },
            include: [
                {
                    model: status_projet_model,
                    attributes: ['id', 'designation']  // Include 'id' in the attributes
                }
            ],
            group: ['projet.id_status_projet', 'status_projet.designation', 'status_projet.id']  // Add 'status_projet.id' to the GROUP BY clause
        });

        if (!total_projects_by_status || total_projects_by_status.length === 0) 
        {
            return res.status(200).json({ message: "Aucun projet trouvé." });
        }

        return res.status(200).json(total_projects_by_status);

    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur get_total_projects_by_status_projet()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json(error);
    }
}

export_projets_EXCEL = async ( req , res) =>
{
    try 
    {
        const projets = await projet_model.findAll({ 
            where : { 
                status_: true , 
                id_status_projet: { [Op.ne]: 3 }
        }});

        const work_book = new ExcelJS.Workbook();
        const work_sheet = work_book.addWorksheet('Projets publiés');

        work_sheet.columns = [ { header: 'CODE', key: 'id', width: 10 } ];

        projets.forEach( projet => {
            work_sheet.addRow( projet );
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Projets publiés.xlsx');

        await work_book.xlsx.write(res);
        res.end();
    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur export_projets_EXCEL()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json(error);
    }
}

module.exports = {
    // create ,
    get_all_projets_by_maj ,
    get_projet_by_id ,
    get_total_projects_by_status_projet ,
    export_projets_EXCEL ,
    get_projets ,
    get_all_projets_by_status
    // get_projets_by_passation 
}