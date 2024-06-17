const express = require("express") ;
const router = express.Router() ;
const {  
        create ,
        get_all_mode_projet ,
        get_mode_not_deleted ,
        get_mode_by_id ,
        delete_or_restore_mode 
        } = require("../controllers/mode_projet.controller") ;

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/" , [  check_token , get_all_mode_projet] ) ;
router.get( "/not_deleted" , [ check_token , get_mode_not_deleted] ) ;
router.get( "/:id" , [ check_token , get_mode_by_id] ) ; 
router.get( "/delete_restore/:id" , [ check_token , delete_or_restore_mode] ) ; 

module.exports = router 