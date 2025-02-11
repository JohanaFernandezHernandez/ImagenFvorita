import { useConectionApi } from "../../hooks/useConextionApi";
import { useEffect, useState } from "react";
import { Card, Header } from "../../Components";
import "./HomePage.css";
import Flor from "../../assets/Flor.jpg";
import Flor2 from "../../assets/Flor2.avif";
import Swal from "sweetalert2";
import { Typography, Box } from "@mui/material";

export const HomePage = () => {
  const [images, setImages] = useState([]);
  const { getImages, deleteImage, updateImage } = useConectionApi();

  //Obtener todas las imágenes de la DB
  const fetchImages = async () => {
    try {
      const response = await getImages();
      setImages(response);
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  //Eliminar Imagen
  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar esta imagen?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteImage(id);
          Swal.fire({
            title: "¡Eliminado!",
            text: "La imagen ha sido eliminada con éxito.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          fetchImages();
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar la imagen.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  //Editar Imagen
  const handleEdit = async (id, title, file) => {
    try {
      const response = await updateImage(id, title, file);
      if (response) {
        Swal.fire({
          title: "¡Actualizado!",
          text: "La imagen ha sido actualizada con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        await fetchImages(); // Refrescar la lista de imágenes
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar la imagen.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1550px",
        margin: {
          xs: "5px auto",
          sm: "5px auto",
          md: "10px auto",
          lg: "25px auto",
          xl: "25px auto",
        },
        padding: "min(5em, 2%)",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: {
              xs: "28px",
              sm: "28px",
              md: "28px",
              lg: "35px",
              xl: "40px",
            },
            margin: {
              xs: "16px",
              sm: "16px",
              md: "16px",
              lg: "10px",
              xl: "10px",
            },
          }}
        >
          Guarda tus imagenes Favoritas
        </Typography>
      </Box>
      <section className="container-card">
        {images.map((imagen) => (
          <Card
            key={imagen.ImagenID}
            id={imagen.ImagenID}
            img={imagen.ImagenURL}
            title={imagen.Title}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </section>
    </Box>
  );
};
