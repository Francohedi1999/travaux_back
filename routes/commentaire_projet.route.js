const express = require("express") ;
const router = express.Router() ;
const   {  
                create , 
                get_all_comment ,
                update_comment
        } 
        = require("../controllers/comment_projet.controller")

const { check_token } = require("../controllers/authentification.controller") ;

router.post( "/" , [ check_token , create ] ) ;
router.get( "/:id_projet" , [ get_all_comment ] ) ;
router.put( "/update/:comment_id" , [ check_token , update_comment ] ) ;

module.exports = router 