import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  Card as MuiCard,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import Borrar from "../../assets/svg/Borrar";
import Editar from "../../assets/svg/Editar";
import { useState, useEffect } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const Card = ({ img, title, id, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Title: title,
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(img);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, Title: title }));
    setPreviewUrl(img);
  }, [title, img]);

  const handleOpen = () => {
    setFormData({ Title: title, file: null });
    setPreviewUrl(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files?.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(id, formData.Title, formData.file);
    handleClose();
  };

  return (
    <MuiCard
      sx={{
        width: 350,
        borderRadius: 3,
        boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)", // Sombra sutil en gris/blanco
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Animación suave en hover
        backgroundColor: "#1e1e1e", // Fondo oscuro para la card
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.2)", // Sombra más intensa en hover
          transform: "scale(1.03)", // Efecto de zoom sutil
        },
        overflow: "hidden",
      }}
    >
      {/* Imagen */}
      <CardMedia
        component="img"
        height="220"
        image={img}
        alt={title}
        sx={{
          objectFit: "cover",
          objectPosition: "top",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Línea separadora sutil
        }}
      />

      <Box sx={{display:"flex", justifyContent:"space-between"}}>
        {/* Contenido */}
        <CardContent sx={{ padding: "10px" }}>
          <Typography
            variant="p"
            fontWeight="bold"
            textAlign="center"
            color="#ffffff"
            sx={{
              fontWeight: "400",
              fontSize: {
                xs: "16px",
                md: "18px",
                xl: "20px",
              },
            }}
          >
            {title}
          </Typography>
        </CardContent>

        {/* Botones */}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(id)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "6px 3px !important",
              minWidth:"30px",
              width:"35px",
              "&:hover": {
                backgroundColor: "gray",
              },
              fontWeight: "400",
              fontSize: {
                xs: "14px",
                md: "16px",
                xl: "18px",
              },
              gap: {
                xs: "5px",
                md: "10px",
                xl: "15px",
              },
            }}
          >
            <Borrar />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{
              display:"flex",
              justifyContent:"center",
              padding: "6px 3px !important",
              minWidth:"30px",
              width:"35px",
              borderRadius: 2,
              backgroundColor: "transparent",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#ee9f0c",
              },
              textTransform: "none",
              fontWeight: "400",
              fontSize: {
                xs: "14px",
                md: "16px",
                xl: "18px",
              },
              gap: {
                xs: "5px",
                md: "10px",
                xl: "15px",
              },
            }}
          >
            <Editar />
          </Button>
        </CardActions>
      </Box>

      {/* Modal de edición */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "black", textAlign: "center", marginBottom: "25px" }}
          >
            Editar Imagen
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                name="Title"
                value={formData.Title}
                onChange={handleInputChange}
                placeholder="Ingresa un título para la imagen"
              />
            </Box>

            <Box mb={2}>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: "none" }}
                id={`file-upload-${id}`}
              />
              <label htmlFor={`file-upload-${id}`}>
                <Button variant="contained" component="span" fullWidth>
                  Seleccionar Nueva Imagen
                </Button>
              </label>
            </Box>

            {previewUrl && (
              <Box mb={2} sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Guardar Cambios
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </MuiCard>
  );
};
