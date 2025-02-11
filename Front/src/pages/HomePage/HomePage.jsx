import { useConectionApi } from "../../hooks/useConextionApi";
import { useEffect, useState } from "react";
import { Card, Header } from "../../Components";
import "./HomePage.css";
import Flor from "../../assets/Flor.jpg";
import Flor2 from "../../assets/Flor2.avif";
import Swal from "sweetalert2";
import { Typography, Box } from "@mui/material";

export const HomePage = () => {
  const defaultImages = [
    {
      ImagenID: 'default-1',
      Title: 'Flor de ejemplo 1',
      ImagenURL: Flor,
      isDefault: true
    },
    {
      ImagenID: 'default-2',
      Title: 'Flor de ejemplo 2',
      ImagenURL: Flor2,
      isDefault: true
    }
  ];

  const [images, setImages] = useState(defaultImages);
  const [showDefaultMessage, setShowDefaultMessage] = useState(true);
  const { getImages, deleteImage, updateImage } = useConectionApi();

  //Obtener todas las imágenes de la DB
  const fetchImages = async () => {
    try {
      const response = await getImages();
      if (response && response.length > 0) {
        setImages(response);
        setShowDefaultMessage(false);
      } else {
        setImages(defaultImages);
        setShowDefaultMessage(true);
      }
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
      setImages(defaultImages);
      setShowDefaultMessage(true);
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
          await fetchImages(); 
          Swal.fire({
            title: "¡Eliminado!",
            text: "La imagen ha sido eliminada con éxito.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
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
        await fetchImages(); 
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
          component="h1"
          sx={{
            textAlign: "center",
            marginBottom: "1em",
            color: "#fff",
          }}
        >
          Galería de Imágenes
        </Typography>
        {showDefaultMessage && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: "2em",
              color: "#666",
              backgroundColor: "#f8f9fa",
              padding: "1em",
              borderRadius: "8px",
              border: "1px solid #dee2e6"
            }}
          >
            Estas son imágenes de prueba, por ende no se pueden editar. Agrega tus propias imágenes para empezar a crear tu galería.
          </Typography>
        )}
      </Box>
      <section className="container-card">
        {images.map((imagen) => (
          <Card
            key={imagen.ImagenID}
            id={imagen.ImagenID}
            img={imagen.ImagenURL}
            title={imagen.Title}
            onDelete={!imagen.isDefault ? handleDelete : null}
            onEdit={!imagen.isDefault ? handleEdit : null}
          />
        ))}
      </section>
    </Box>
  );
};
