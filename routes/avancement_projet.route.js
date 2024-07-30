const express = require("express") ;
const router = express.Router() ;
const { add_avancement } = require("../controllers/avancement_projet.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , add_avancement ] ) ;

module.exports = router