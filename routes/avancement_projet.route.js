const express = require("express") ;
const router = express.Router() ;
const multer = require("multer");
const { 
    add_avancement , 
    get_total_pourcentage_by_projet , 
    import_EXCEL_avancement } = require("../controllers/avancement_projet.controller") ;
const { check_token } = require("../controllers/authentification.controller") ;

const storage = multer.memoryStorage(); // Utilisation de la mémoire temporaire pour stocker le fichier
const upload = multer({ storage: storage });

router.post( "/" , [ check_token , add_avancement ] ) ;
router.post("/import", [check_token, upload.single('file'), import_EXCEL_avancement]);
router.get( "/total/:id_projet" , [ check_token , get_total_pourcentage_by_projet ] ) ;

module.exports = router