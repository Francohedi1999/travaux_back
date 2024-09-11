const express = require("express") ;
const router = express.Router() ;
const   {  
               get_all_status_projet , 
               get_status_by_id
        } 
        = require("../controllers/status_projet.controller")

router.get( "/" , [ get_all_status_projet ] ) ;
router.get( "/:status_id" , [ get_status_by_id ] ) ;

module.exports = router 