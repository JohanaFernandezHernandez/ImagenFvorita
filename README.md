# Imagen Favorita .

## Descripción 🚀

Esta pagina web permite a las personas guardar sus imagenes mas especiales y favoritas , tiene la posibilidad de guardar y subir cualquier imagen, editarla , eliminarla y obtener todas sus imagenes, esta adaptable paar todos los dispositivos desde mobile hasta destok.
se busco tener una buena integracion con el usuario y su funcionalidad


## Instalación 🔧

1. Clona el repositorio.
   ```bash
   https://github.com/JohanaFernandezHernandez/ImagenFvorita.git
   
   
2. Luego realiza un cd a la carpeta tanto del Back como del Front y Instala las dependencias:
    - __`npm install`__
    

3. Crea un archivo `.env` en el `Front` con las siguiente variable:
        
    - `VITE_API_URL`= *http://localhost:4008*
      ten presente que esta variable es para levantarla en el servidor local

4.Crea un archivo `.env` en el `Back` con las siguiente variable:
tener presente que aqui va la informacion de la conexion a la tabla o base de datos local por ende tienes que poner tu pasword.

   - `DB_USER`= *postgres*
   - `DB_PASSWORD`= ***** aqui va la clave de tu usuario de Postgres
   - `DB_NAME`= *ImagenesDB*
   - `DB_NAME`= *localhost*
   - `DB_NAME`= *5432*
   - `PORT` = *4008*

4.Después de esto puedes arrancar la aplicación en los siguiente comandos:

     
   FRONT
   - __`npm run dev`__

   BACK
   - __`npm start`__



## Construido con 🛠️

Se utilizaron las siguientes tecnologías:

- [React.js](https://react.dev/) - *Utilizado para el desarrollo del frontend y custom hooks*.

- [vite ](https://getbem.com/) - *Para el desarrollo rápido y la construcción de la aplicación*.

- [axios ](https://axios-http.com/es/docs/intro) - *Para las conexiones con la API*.

- [node.js](https://nodejs.org/es) - *Utilizado para el desarrollo del back*.

- [postgres.sql](https://www.postgresql.org/) - *base de datos


## Información Adicional 📖

Este proyecto es una prueba técnica y representa una versión preliminar, te voy a dejar un link de un breve video eplicandote la funcionalidad y si te queda alguna duda en la instalacion.


## Autora ✒️

__*Johana Fernández Hernández*__

*Desarrolladora FullStack*
