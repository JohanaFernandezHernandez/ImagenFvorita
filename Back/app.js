const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const imagenRoutes = require("./src/routes/ImagenRouter");
const { sequelize } = require("./src/db");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (para acceder a imágenes subidas)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/images", imagenRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar Servidor
const PORT = process.env.PORT || 4008;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la DB:", error);
    process.exit(1);
  }
};

startServer();