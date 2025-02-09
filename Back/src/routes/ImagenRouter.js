const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig.js");
const imageController = require('../controllers/ImageController/ImagesController');

router.post("/createImagen", upload.single("file"), imageController.createImagen);
router.get('/getImagen',  imageController.getImagenes);
router.get('/getImagenById/:id',  imageController.getImagenById);
router.put('/updateImagen/:id', upload.single("file"), imageController.updateImagen);
router.delete('/deleteImagen/:id', imageController.deleteImagen);

module.exports = router;