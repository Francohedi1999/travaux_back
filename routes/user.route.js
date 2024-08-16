const express = require("express") ;
const router = express.Router() ;
const   { 
            create , 
            get_user_logged ,
            get_all_users ,
            update_profile ,
            delete_or_restore_user ,
            get_user_by_id
        } 
        = require("../controllers/user.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/create" , [ check_token , create ] ) ;
router.get( "/user_logged" , [ check_token , get_user_logged ] ) ;
router.get( "/users" , [ check_token , get_all_users ] ) ;
router.get( "/user/:id" , [ check_token , get_user_by_id ] ) ;
router.put( "/delete_or_restore/:id" , [ check_token , delete_or_restore_user ] ) ;
router.put( "/profile/:id" , [ check_token , update_profile ] ) ;

module.exports = router 