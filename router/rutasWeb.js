const express = require('express');
const router = express.Router();

/* enrutamiento */
router.get('/', (req, res) => {
        res.render("index", {titulo: "Mi título dinámico"});
    })
    
router.get('/servicios', (req, res) => {
        res.render("servicios", {tituloServicio: "Servicios Dinámicos"});
    })
    
module.exports = router;