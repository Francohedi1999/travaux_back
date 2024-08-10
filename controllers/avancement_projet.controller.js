const { avancement_projet_model , projet_model } = require("../migrations") ;
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
module.exports = { add_avancement , get_total_pourcentage_by_projet } ;