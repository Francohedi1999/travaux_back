const express = require("express") ;
const router = express.Router() ;
const   { 
            create ,
            get_all_projets ,
            get_projet_by_id ,
            get_projets_by_passation 
        } 
        = require("../controllers/projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/" , [ check_token , get_all_projets ] ) ;
router.get( "/:id" , [ check_token , get_projet_by_id ] ) ;
router.get( "/passation/:id" , [ check_token , get_projets_by_passation ] ) ;  

module.exports = router 