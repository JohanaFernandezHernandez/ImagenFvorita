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

    let oldFilename = null;

    // Si se subió un nuevo archivo, preparar para eliminar la imagen anterior
    if (req.file) {
      console.log('Nuevo archivo recibido:', req.file);
      oldFilename = imagen.filename;

      // Guardar los nuevos datos de la imagen
      const { filename, mimetype, size } = req.file;
      imagen.filename = filename;
      imagen.mimetype = mimetype;
      imagen.size = size;
      imagen.ImagenURL = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

      // Eliminar el archivo antiguo solo después de confirmar que el nuevo está guardado
      if (oldFilename) {
        const deleted = await deleteImageFile(oldFilename);
        if (!deleted) {
          console.warn(`No se pudo eliminar el archivo anterior: ${oldFilename}`);
        }
      }
    }

    // Actualizar el título solo si fue proporcionado
    if (Title) {
      imagen.Title = Title;
    }

    // Guardar los cambios
    await imagen.save();
    
    res.status(200).json({
      message: "Imagen actualizada exitosamente",
      imagen,
    });
  } catch (error) {
    console.error('Error en updateImagen:', error);
    // Si hay un error y se subió un nuevo archivo, intentar eliminarlo
    if (req.file) {
      await deleteImageFile(req.file.filename);
    }
    
    res.status(500).json({
      message: "Error al editar la Imagen",
      error: error.message,
    });
  }
};

// Función auxiliar para eliminar archivo físico
const deleteImageFile = async (filename) => {
  if (!filename) {
    return false;
  }
  
  try {
    // Corregimos la ruta para que apunte al directorio uploads en la raíz del proyecto
    const uploadsDir = path.join(__dirname, "../../../uploads");
    const filePath = path.join(uploadsDir, filename);
    

    if (!fs.existsSync(uploadsDir)) {
      console.error('El directorio uploads no existe:', uploadsDir);
      return false;
    }

    if (!fs.existsSync(filePath)) {
      console.error('El archivo no existe:', filePath);
      return false;
    }

    await fs.promises.unlink(filePath);
    return true;
  } catch (error) {
    console.error('Error al eliminar el archivo:', {
      filename,
      error: error.message,
      stack: error.stack
    });
    return false;
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

    // Guardar el nombre del archivo antes de eliminar el registro
    const filename = imagen.filename;

    // Eliminar el registro de la base de datos primero
    await imagen.destroy();

    // Intentar eliminar el archivo físico
    let fileDeleted = false;
    if (filename) {
      fileDeleted = await deleteImageFile(filename);
    }

    res.status(200).json({ 
      message: "Imagen eliminada exitosamente",
      fileDeleted
    });
  } catch (error) {
    console.error('Error en deleteImagen:', error);
    res.status(500).json({
      message: "Error al eliminar la Imagen",
      error: error.message,
    });
  }
};