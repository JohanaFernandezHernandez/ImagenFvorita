const { Imagen } = require("../../db.js");

// Crear Imagen
exports.createImagen = async (req, res) => {
  try {
    const { Title, ImagenURL } = req.body;
    if (!Title || !ImagenURL) {
      return res
        .status(400)
        .json({ message: "El titulo y la imagen es obligatoria" });
    }

    const imagen = await Imagen.create({ Title, ImagenURL });
    res.status(201).json(imagen);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la Imagen", error: error.message });
  }
};

// Obtener todas las Imagenes
exports.getImagenes = async (req, res) => {
  try {
    const imagenes = await Imagen.findAll();
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imagenes', error: error.message });
  }
};

//Obtener Imagen por su ID 
exports.getImagenById = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json(imagen);
  } catch (error) {
    res
     .status(500)
     .json({ message: 'Error al obtener la Imagen', error: error.message });
  }
};

// Editar Imagen 
exports.updateImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, ImagenURL } = req.body;
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    imagen.Title = Title || imagen.Title;
    imagen.ImagenURL = ImagenURL || imagen.ImagenURL;

    await imagen.save();
    res.status(200).json(imagen);
  } catch (error) {
    res
     .status(500)
     .json({ message: 'Error al editar la Imagen', error: error.message });
  }
};


//Eliminar Imagen
exports.deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    await imagen.destroy();
    res.status(200).json({ message: 'Imagen Eliminada exitosamente' });
  } catch (error) {
    res
     .status(500)
     .json({ message: 'Error al eliminar la Imagen', error: error.message });
  }
};