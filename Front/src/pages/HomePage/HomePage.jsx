import { useConectionApi } from "../../hooks/useConextionApi";
import { useEffect, useState } from "react";
import { Card, Header } from "../../Components";
import "./HomePage.css";
import Flor from "../../assets/Flor.jpg";
import Flor2 from "../../assets/Flor2.avif";
import Swal from 'sweetalert2';

export const HomePage = () => {
  const [images, setImages] = useState([]);
  const { getImages, deleteImage } = useConectionApi();

  //Obtener todas las imágenes de la DB 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages();
        setImages(response);
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };
  
    fetchImages();
  }, []);

  //Eliminar Imagen
  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta imagen?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteImage(id);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La imagen ha sido eliminada con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          fetchImages();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la imagen.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
  };

  //Editar Imagen

  return (
    <section className="container-card">
      {images.map((imagen) => (
        <Card
          key={imagen.ImagenID}
          id={imagen.ImagenID}
          img={imagen.ImagenURL}
          title={imagen.Title}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};
