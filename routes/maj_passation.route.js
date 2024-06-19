const express = require("express") ;
const router = express.Router() ;
const { create } = require("../controllers/maj_passation.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/create" , [ check_token , create ] ) ;

module.exports = router 