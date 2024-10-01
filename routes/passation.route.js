const express = require("express") ;
const router = express.Router() ;
const { create ,
    get_all_passation ,
    update ,
    get_passations ,
    get_passation_by_id } = require("../controllers/passation.controller") ;

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.put( "/update/:id_passation" , [ check_token , update ] ) ;
router.get( "/" , [ get_all_passation] ) ;
router.get( "/passations" , [ get_passations] ) ;
router.get( "/:id" , [ get_passation_by_id] ) ;

module.exports = router 