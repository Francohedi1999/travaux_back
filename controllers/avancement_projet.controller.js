const { avancement_projet_model , projet_model } = require("../migrations") ;
const ExcelJS = require('exceljs');
const Sequelize = require("sequelize");

// avancement manuel
add_avancement = async ( req , res ) =>
{
    try
    {    
        const description = req.body.description || "Sans description" ;
        const pourcentage = parseFloat( req.body.pourcentage )  ;
        const date_enreg = req.body.date_enreg || new Date();
        const id_projet = req.body.id_projet ;

        const total_pourcentage_actuel = await avancement_projet_model.findOne({
            attributes: [
                [ Sequelize.fn('SUM', Sequelize.col('pourcentage')), 'total_pourcentage' ]
            ],
            where: {
                id_projet: id_projet
            }
        });

        const total_pourcentage = parseFloat( total_pourcentage_actuel.get('total_pourcentage') ) || 0;
        let nouveau_pourcentage = pourcentage ;

        if ( total_pourcentage + pourcentage > 100 ) 
        {
            nouveau_pourcentage = 100 - total_pourcentage;
        }

        await avancement_projet_model.create({
            description: description,
            pourcentage: nouveau_pourcentage,
            date_enreg: date_enreg,
            id_projet: id_projet
        });

        const nouveau_total_actuel = await avancement_projet_model.findOne({
            attributes: [
                [ Sequelize.fn('SUM', Sequelize.col('pourcentage')), 'total_pourcentage' ]
            ],
            where: {
                id_projet: id_projet
            }
        });

        if( nouveau_total_actuel.get('total_pourcentage') == 0 )
        {
            await projet_model.update( { id_status_projet: 1 } , { where: { id: id_projet } } );
        }
        else if( nouveau_total_actuel.get('total_pourcentage') > 0 && nouveau_total_actuel.get('total_pourcentage') < 99 )
        {
            await projet_model.update( { id_status_projet: 2 } , { where: { id: id_projet } } );
        }
        else if( nouveau_total_actuel.get('total_pourcentage') == 100 )
        {
            await projet_model.update( { id_status_projet: 3 } , { where: { id: id_projet } } );
        }

        return res.status(200).json( { message: "L'avancement sur PRJ-" + id_projet + " a été bien ajouté" , created : true } ) ;
    
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

import_EXCEL_avancement = async (req, res) => {
    try {
        if (!req.file) {
            console.log("Aucun fichier n'a été uploadé");
            return res.status(200).json({ message: "Aucun fichier n'a été uploadé" , success: false });
        }

        const column_mapping = { code: 'CODE', pourcentage: 'AVANCEMENT' };

        const work_book = new ExcelJS.Workbook();
        await work_book.xlsx.load(req.file.buffer);

        const work_sheet = work_book.getWorksheet(1);

        if (!work_sheet) {
            return res.status(200).json({ message: "Le fichier Excel est vide ou invalide" , success: false });
        }

        const header_row = work_sheet.getRow(1);
        const column_indices = {};

        header_row.eachCell((cell, col_number) => {
            Object.keys(column_mapping).forEach((key) => {
                if (cell.value && cell.value.toString().trim().toLowerCase() === column_mapping[key].toLowerCase()) {
                    column_indices[key] = col_number;
                }
            });
        });

        if (!column_indices.code || !column_indices.pourcentage) {
            return res.status(200).json({ 
                message: "Le fichier doit contenir les colonnes 'CODE' et 'AVANCEMENT'" , success: false });
        }

        const invalid_rows = [];

        work_sheet.eachRow({ includeEmpty: false }, (row, row_number) => {
            if (row_number > 1) {
                const avancementCell = row.getCell(column_indices.pourcentage);
                const avancementValue = avancementCell ? parseFloat(avancementCell.value) : NaN;

                if (isNaN(avancementValue)) {
                    invalid_rows.push(row_number);
                }
            }
        });

        if (invalid_rows.length > 0) {
            return res.status(200).json({
                message: "Les lignes qui contiennent des valeurs non valides dans la colonne AVANCEMENT" ,
                success: false
            });
        }

        const promises = [];

        work_sheet.eachRow({ includeEmpty: false }, (row, row_number) => {
            if (row_number > 1) {
                const codeCell = row.getCell(column_indices.code);
                const avancementCell = row.getCell(column_indices.pourcentage);

                if (!codeCell || !avancementCell) {
                    promises.push(Promise.resolve(res.status(200).json({ 
                        message: "Ligne " + row_number + " invalide : Cellules manquantes", 
                        success: false 
                    })));
                    return;
                }

                const avancement = {
                    id_projet: codeCell.value,
                    pourcentage: parseFloat(avancementCell.value),
                    description: "Sans description",
                    date_enreg: new Date(),
                };

                const { id_projet, pourcentage, description, date_enreg } = avancement;

                if (!id_projet || isNaN(pourcentage)) {
                    promises.push(Promise.resolve(res.status(200).json({ 
                        message: "Ligne " + row_number + " invalide : Projet ou pourcentage manquant", 
                        success: false 
                    })));
                    return;
                }

                const process_row = async () => {
                    const total_pourcentage_actuel = await avancement_projet_model.findOne({
                        attributes: [
                            [Sequelize.fn('SUM', Sequelize.col('pourcentage')), 'total_pourcentage']
                        ],
                        where: {
                            id_projet: id_projet
                        }
                    });

                    const total_pourcentage = parseFloat(total_pourcentage_actuel.get('total_pourcentage')) || 0;
                    let nouveau_pourcentage = pourcentage;

                    if (total_pourcentage + pourcentage > 100) {
                        nouveau_pourcentage = 100 - total_pourcentage;
                    }

                    await avancement_projet_model.create({
                        description: description,
                        pourcentage: nouveau_pourcentage,
                        date_enreg: date_enreg,
                        id_projet: id_projet
                    });

                    const nouveau_total_actuel = await avancement_projet_model.findOne({
                        attributes: [
                            [Sequelize.fn('SUM', Sequelize.col('pourcentage')), 'total_pourcentage']
                        ],
                        where: {
                            id_projet: id_projet
                        }
                    });

                    const total_final = parseFloat(nouveau_total_actuel.get('total_pourcentage')) || 0;

                    if (total_final === 0) {
                        await projet_model.update({ id_status_projet: 1 }, { where: { id: id_projet } });
                    } else if (total_final > 0 && total_final < 100) {
                        await projet_model.update({ id_status_projet: 2 }, { where: { id: id_projet } });
                    } else if (total_final === 100) {
                        await projet_model.update({ id_status_projet: 3 }, { where: { id: id_projet } });
                    }
                };

                promises.push(process_row());
            }
        });

        await Promise.all( promises );

        return res.status(200).json({ message: "Les avancements ont été bien importés", success: true });
    } catch (error) {
        console.log("Erreur dans import_EXCEL_avancement()");
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de l'importation des avancements", error });
    }
}


get_all_avancement_by_projet = async ( req , res ) =>
{
    try 
    {
        const id_projet = req.params.id_projet;

        const avancements = await avancement_projet_model.findAll({ 
            where: { id_projet : id_projet } ,
            order: [ ['id', 'desc'] ],
        }) ;

        return res.status(200).json( avancements );

    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur get_all_avancement_by_projet()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json(error);
    }
} ;


get_total_pourcentage_by_projet = async (req, res) => 
{
    try 
    {
        const id_projet = req.params.id_projet;

        // Calculer la somme des pourcentages pour ce projet
        const total_pourcentage_actuel = await avancement_projet_model.findOne({
            attributes: [
                [ Sequelize.fn('SUM', Sequelize.col('pourcentage')), 'total_pourcentage' ]
            ],
            where: {
                id_projet: id_projet
            }
        });

        if (!total_pourcentage_actuel) 
        {
            return res.status(200).json({ id_projet: id_projet, total_pourcentage: 0 });
        }

        return res.status(200).json({ id_projet: id_projet, total_pourcentage: total_pourcentage_actuel.get('total_pourcentage') });

    } 
    catch (error) 
    {
        console.log("=====================================================================");
        console.log("Erreur getSumPourcentageByProjet()");
        console.log(error);
        console.log("=====================================================================");

        return res.status(400).json(error);
    }
};
module.exports = { 
    add_avancement , 
    get_total_pourcentage_by_projet , 
    get_all_avancement_by_projet ,
    import_EXCEL_avancement } ;