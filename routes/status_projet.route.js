const express = require("express") ;
const router = express.Router() ;
const   {  
               get_all_status_projet
        } 
        = require("../controllers/status_projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.get( "/" , [ check_token , get_all_status_projet ] ) ;

module.exports = router 