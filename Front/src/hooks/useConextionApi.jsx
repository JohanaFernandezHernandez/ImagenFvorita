import axios from "axios";

// Acceder a la variable de entorno correctamente
const url = import.meta.env.VITE_API_URL || 'http://localhost:4008';

console.log('API URL:', url); // Para debugging

export const useConectionApi = () => {

    //Obtener Imagenes
    const getImages = async() => {
        try {
            const response = await axios.get(`${url}/images/getImagen`);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error('Error en getImages:', error);
            console.error('URL utilizada:', `${url}/images/getImagen`);
          }
    };


    //obtener una imagen por su id
    const getImageById = async(id) => {
        try {
            const response = await axios.get(`${url}/images/getImagenById/${id}`);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error('Error en getImageById:', error);
          }
    };


    //Agregar una nueva imagen
    const createImage = async (Title, ImagenURL) => {
        try {
            const response = await axios.post(`${url}/images/createImagen`, { Title, ImagenURL });
            if (response.status === 201) {
              return response.data;
            }
          } catch (error) {
            console.error('Error en createImage:', error);
          }
    };

    //Actualizar una imagen
    const updateImage = async (id, Title, ImagenURL) => {
        try {
            const response = await axios.put(`${url}/images/updateImagen/${id}`, { Title, ImagenURL });
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error('Error en updateImage:', error);
          }
    };

    //Borrar una imagen
    const deleteImage = async (id) => {
        try {
            const response = await axios.delete(`${url}/images/deleteImagen/${id}`);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error('Error en deleteImage:', error);
          }
    };

    return {
        getImages,
        getImageById,
        createImage,
        updateImage,
        deleteImage,
      };

}
