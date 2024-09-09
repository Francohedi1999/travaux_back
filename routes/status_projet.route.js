const express = require("express") ;
const router = express.Router() ;
const   {  
               get_all_status_projet , 
               get_status_by_id
        } 
        = require("../controllers/status_projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.get( "/" , [ check_token , get_all_status_projet ] ) ;
router.get( "/:status_id" , [ check_token , get_status_by_id ] ) ;

module.exports = router 