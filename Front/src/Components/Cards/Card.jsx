import { Button, Box, Modal, TextField, Typography, Card as MuiCard, CardContent, CardActions, CardMedia } from "@mui/material";
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
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": { boxShadow: 8 },
        overflow: "hidden",
      }}
    >
      {/* Imagen */}
      <CardMedia component="img" height="200" image={img} alt={title} sx={{ objectFit: "cover" }} />

      {/* Contenido */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {title}
        </Typography>
      </CardContent>

      {/* Botones */}
      <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Borrar />}
          onClick={() => onDelete(id)}
          sx={{ borderRadius: 2 }}
        >
          Borrar
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Editar />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Editar
        </Button>
      </CardActions>

      {/* Modal de edición */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography variant="h5" gutterBottom sx={{color: "black", textAlign: "center", marginBottom: "25px"}}>
            Editar Imagen
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField fullWidth label="Título" variant="outlined" name="Title" value={formData.Title} onChange={handleInputChange} placeholder="Ingresa un título para la imagen" />
            </Box>

            <Box mb={2}>
              <input type="file" name="file" accept="image/*" onChange={handleInputChange} style={{ display: "none" }} id={`file-upload-${id}`} />
              <label htmlFor={`file-upload-${id}`}>
                <Button variant="contained" component="span" fullWidth>
                  Seleccionar Nueva Imagen
                </Button>
              </label>
            </Box>

            {previewUrl && (
              <Box mb={2} sx={{ display: "flex", justifyContent: "center" }}>
                <img src={previewUrl} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px" }} />
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