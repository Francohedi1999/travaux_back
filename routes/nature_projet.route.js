const express = require("express") ;
const router = express.Router() ;
const   {  
                create ,
                get_all_nature_projet ,
                get_nature_not_deleted ,
                get_nature_by_id ,
                update_nature 
        } 
        = require("../controllers/nature_projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/" , [ check_token , get_all_nature_projet ] ) ;
router.get( "/not_deleted" , [ check_token , get_nature_not_deleted ] ) ;
router.get( "/:id" , [ check_token , get_nature_by_id ] ) ;
router.put( "/delete_restore/:id" , [ check_token , update_nature ] ) ;

module.exports = router 