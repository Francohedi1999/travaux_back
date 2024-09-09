const express = require("express") ;
const router = express.Router() ;
const   {  
                create ,
                get_all_prsentation ,
                update_presentation
        } 
        = require("../controllers/presentation_projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/:id_projet" , [ check_token , get_all_prsentation ] ) ;
router.put( "/update/:presentation_id" , [ check_token , update_presentation ] ) ;

module.exports = router 