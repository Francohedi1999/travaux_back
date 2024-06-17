const express = require("express") ;
const router = express.Router() ;
const { create ,
    get_all_passation ,
    get_passation_by_id } = require("../controllers/passation.controller") ;

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/" , [ check_token , get_all_passation] ) ;
router.get( "/:id" , [ check_token , get_passation_by_id] ) ;

module.exports = router 