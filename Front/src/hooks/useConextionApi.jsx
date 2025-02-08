import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const useConectionApi = () => {

    //Obtener Imagenes
    const getImages = async() => {
        try {
            const response = await axios.get(`${url}/imagenes/getImagen`);
            console.log(response);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.log(error);
          }
    };


    //obtener una imagen por su id
    const getImageById = async(id) => {
        try {
            const response = await axios.get(`${url}/getImagenById/${id}`);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.log(error);
          }
    };


    //Agregar una nueva imagen
    const createImage = async () => {
        try {
            const response = await axios.post(`${url}/createImagen`, { Title, ImagenURL });
            if (response.status === 201) {
              return response.data;
            }
          } catch (error) {
            console.log(error);
          }
    };

    //Actualizar una imagen
    const updateImage = async (id, Title, ImagenURL) => {
        try {
            const response = await axios.put(`${url}/updateImagen/${id}`, { Title, ImagenURL });
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.log(error);
          }
    };

    //Borrar una imagen
    const deleteImage = async (id) => {
        try {
            const response = await axios.delete(`${url}/deleteImagen/${id}`);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.log(error);
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
