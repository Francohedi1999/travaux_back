const express = require("express") ;
const router = express.Router() ;
const   { 
            create , 
            get_user_logged ,
            get_all_users 
        } 
        = require("../controllers/user.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/create" , [ check_token , create ] ) ;
router.get( "/user_logged" , [ check_token , get_user_logged ] ) ;
router.get( "/users" , [ check_token , get_all_users ] ) ;

module.exports = router 