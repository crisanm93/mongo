const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

/* router para consulta de la base de datos */
router.get('/', async (req, res) => {
    try{
        const arrayMascotas = await Mascota.find();
        //console.log(arrayMascotas)
        res.render("mascotas", {
            arrayMascotas
        })
    } catch(error){
        console.log(error);
    }
})

/* router para el formulario de crear mascotas */
router.get('/crear', (req, res) => {
    res.render('crear');
});

/* router que crea un nuevo registro */
router.post('/', async (req, res) => {
    const body = req.body;
    //console.log(body);
    try {
        await Mascota.create(body);
        res.redirect('/mascotas');
    } catch (error) {
        console.log('error:', error)
    }
});

/* router para editar mascota */
router.get('/:id', async(req, res) => {
   const id = req.params.id
   try {
        const mascotaDB = await Mascota.findOne({ _id: id });
        // console.log(mascotaDB);
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })

    } catch (error) {
        console.log(error);
        res.render('detalle', {
            mensaje: 'No se encontró el id...',
            error: true
        })
    }

});

/* router para borrar registros*/
router.delete('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
        if (!mascotaDB) {
            res.json({
                estado: false,
                mensaje: 'No se pudo eliminar el registro'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'registro eliminado!'
            })
        }
 
     } catch (error) {
         console.log(error);
     }
 
 });
 
 /* router para actualizacion */
 router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    // console.log(body);

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        //console.log(mascotaDB);
        res.json({
            estado: true,
            mensaje: 'Mascota editada'
        })

    } catch (error) {
        console.error(error);
        res.json({
            estado: false,
            mensaje: 'Edicion de Mascota Fallida'
        })
    }
 
 });


module.exports = router;