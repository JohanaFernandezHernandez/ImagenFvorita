# Imagen Favorita 📸

## Descripción 🚀

Esta página web permite a los usuarios guardar sus imágenes más especiales y favoritas. Ofrece la posibilidad de subir y almacenar cualquier imagen, así como editarla, eliminarla y acceder a todas las imágenes guardadas.

Es completamente adaptable a todos los dispositivos, desde móviles hasta computadoras de escritorio. Se ha diseñado con un enfoque en la integración fluida y una experiencia de usuario intuitiva.

## Demo del Proyecto 🎥

Para ver la aplicación en acción y entender mejor su funcionamiento, mira el [Video Explicativo](https://www.loom.com/share/535e82e836d04ecf9aaa982ba3b31897?sid=00ce248f-4077-4a6b-bd33-884894904dfe)


## Arquitectura y Tecnologías 🏗️

El proyecto está construido con una arquitectura cliente-servidor:

### Frontend
- **React + Vite**: Framework moderno para UI con desarrollo rápido y eficiente
- **Material UI**: Componentes prediseñados para una interfaz responsive y accesible
- **Axios**: Cliente HTTP para comunicación con el backend

### Backend
- **Node.js + Express**: Servidor REST con manejo eficiente de operaciones asíncronas
- **PostgreSQL**: Base de datos relacional para almacenamiento de imágenes y metadatos
- **Multer**: Middleware para gestión de subida de archivos

La aplicación implementa operaciones CRUD completas, con énfasis en la reutilización de componentes y la seguridad mediante variables de entorno.


## Instalación 🔧

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JohanaFernandezHernandez/ImagenFvorita.git
   ```

2. Instala las dependencias en ambos directorios (Front y Back):
   ```bash
   cd Front && npm install
   cd ../Back && npm install
   ```

3. Configura las variables de entorno:

   Frontend (.env):
   ```env
   VITE_API_URL=http://localhost:4008
   ```

   Backend (.env):
   ```env
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=ImagenesDB
   DB_HOST=localhost
   DB_PORT=5432
   PORT=4008
   ```

4. Inicia los servidores:

   Frontend:
   ```bash
   cd Front && npm run dev
   ```

   Backend:
   ```bash
   cd Back && npm start
   ```

## Tecnologías Utilizadas 🛠️

- **Frontend**:
  - [React.js](https://react.dev/) - Biblioteca UI
  - [Vite](https://vitejs.dev/) - Build tool y dev server
  - [Material UI](https://mui.com/) - Componentes de UI
  - [Axios](https://axios-http.com/) - Cliente HTTP

- **Backend**:
  - [Node.js](https://nodejs.org/) - Runtime de JavaScript
  - [Express](https://expressjs.com/) - Framework web
  - [PostgreSQL](https://www.postgresql.org/) - Base de datos
  - [Multer](https://github.com/expressjs/multer) - Manejo de archivos


## Autora ✒️

**Johana Fernández Hernández**
- Desarrolladora FullStack

