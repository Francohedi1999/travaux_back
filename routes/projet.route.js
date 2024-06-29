const express = require("express") ;
const router = express.Router() ;
const   { 
            get_all_projets_by_maj ,
            get_projet_by_id ,
            get_projets_by_passation 
        } 
        = require("../controllers/projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.get( "/projets/:id_maj" , [ check_token , get_all_projets_by_maj ] ) ;
router.get( "/:id" , [ check_token , get_projet_by_id ] ) ;
router.get( "/passation/:id" , [ check_token , get_projets_by_passation ] ) ;  

module.exports = router 