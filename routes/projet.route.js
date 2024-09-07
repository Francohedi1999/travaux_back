const express = require("express") ;
const router = express.Router() ;
const   { 
            get_all_projets_by_maj ,
            get_total_projects_by_status_projet ,
            get_projet_by_id  ,
            export_projets_EXCEL
            // get_projets_by_passation 
        } 
        = require("../controllers/projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.get( "/projets/:id_maj" , [ check_token , get_all_projets_by_maj ] ) ;
router.get( "/export" , [ check_token , export_projets_EXCEL ] ) ;
router.get( "/stat_projet" , [ check_token , get_total_projects_by_status_projet ] ) ;
router.get( "/:id" , [ check_token , get_projet_by_id ] ) ;
// router.get( "/passation/:id" , [ check_token , get_projets_by_passation ] ) ;  

module.exports = router 