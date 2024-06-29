const express = require("express") ;
const router = express.Router() ;
const { create , 
        get_all_majs_passation ,
        get_maj_by_passation_and_num_maj ,
        get_maj_by_id } = require("../controllers/maj_passation.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/create" , [ check_token , create ] ) ;
router.get( "/:id_passation" , [ check_token , get_all_majs_passation ] ) ;
router.get( "/maj/:id_maj" , [ check_token , get_maj_by_id ] ) ;
router.get( "/maj/:id_passation/:numero_maj" , [ check_token , get_maj_by_passation_and_num_maj ] ) ;

module.exports = router 