const express = require("express") ;
const router = express.Router() ;
const { create , get_all_roles } = require("../controllers/role.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/" , [ get_all_roles ] ) ;

module.exports = router 