const path = require("path");
const fs = require("fs");
const { Imagen } = require("../../db.js");

// Crear Imagen
exports.createImagen = async (req, res) => {
  try {
    const { Title } = req.body; 
    
    if (!Title) {
      return res.status(400).json({ message: "El título es obligatorio." });
    }
    // Verificar si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ message: "Es obligatorio subir una imagen." });
    }

    // Extraer información del archivo subido
    const { filename, mimetype, size } = req.file;

    // Generar la URL de la imagen basada en el archivo subido
    const ImagenURL = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

    // Crear el registro en la base de datos
    const imagen = await Imagen.create({
      Title,
      ImagenURL,
      filename,
      mimetype,
      size,
    });

    res.status(201).json({
      message: "Imagen creada exitosamente.",
      imagen,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la imagen.",
      error: error.message,
    });
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
    const { Title } = req.body;

    // Buscar la imagen por su ID
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    // Si se subió un nuevo archivo, actualizar la información
    if (req.file) {
      const { filename, mimetype, size } = req.file;

      // Generar la nueva URL de la imagen
      const ImagenURL = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

      // Actualizar los campos relacionados con la imagen
      imagen.filename = filename;
      imagen.mimetype = mimetype;
      imagen.size = size;
      imagen.ImagenURL = ImagenURL;
    }

    // Actualizar el título si fue proporcionado
    imagen.Title = Title || imagen.Title;

    // Guardar los cambios
    await imagen.save();
    res.status(200).json({
      message: "Imagen actualizada exitosamente",
      imagen,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar la Imagen",
      error: error.message,
    });
  }
};


//Eliminar Imagen
exports.deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la imagen por su ID
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    // Eliminar el archivo físico del servidor si existe
    const filePath = path.join(__dirname, "../../uploads", imagen.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Eliminar el registro de la base de datos
    await imagen.destroy();
    res.status(200).json({ message: "Imagen eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la Imagen",
      error: error.message,
    });
  }
};