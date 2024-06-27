const express = require("express") ;
const router = express.Router() ;
const { create , get_all_majs } = require("../controllers/maj_passation.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/create" , [ check_token , create ] ) ;
router.get( "/:id_passation" , [ check_token , get_all_majs ] ) ;

module.exports = router 