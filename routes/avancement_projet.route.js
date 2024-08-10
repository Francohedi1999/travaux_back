const express = require("express") ;
const router = express.Router() ;
const { add_avancement , get_total_pourcentage_by_projet } = require("../controllers/avancement_projet.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , add_avancement ] ) ;
router.get( "/total/:id_projet" , [ check_token , get_total_pourcentage_by_projet ] ) ;

module.exports = router