const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Guardar archivos en la carpeta "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar con timestamp
  },
});

// Exportar la instancia de Multer configurada
const upload = multer({ storage });

module.exports = upload;