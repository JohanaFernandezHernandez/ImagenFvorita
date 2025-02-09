import { Button, Box, Modal, TextField } from '@mui/material';
import Borrar from "../../assets/svg/Borrar"
import Editar from "../../assets/svg/Editar"
import './Card.css'
import { useState, useEffect } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const Card = ({img, title, id, onDelete, onEdit}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Title: title,
    file: null
  });
  const [previewUrl, setPreviewUrl] = useState(img);

  // Actualizar el estado cuando cambien las props
  useEffect(() => {
    setFormData(prev => ({ ...prev, Title: title }));
    setPreviewUrl(img);
  }, [title, img]);

  const handleOpen = () => {
    // Resetear el formulario al estado actual de la imagen cuando se abre el modal
    setFormData({
      Title: title,
      file: null
    });
    setPreviewUrl(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files?.length > 0) {
      setFormData(prev => ({ ...prev, file: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(id, formData.Title, formData.file);
    handleClose();
  };
  
  return(
    <div className="card">
      <Box sx={{width:"100%", height:"80%"}}>
        <img className="imagen-card" src={img} alt="Imagen card"/>
      </Box>
      
      <h3 className='title-imagen'>{title}</h3>
      
      <div className="container-button">
        <button className="button-card" onClick={() => onDelete(id)}> <Borrar/> BORRAR</button>
        <button className="button-card" onClick={handleOpen}> <Editar/> EDITAR</button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h2>Editar Imagen</h2>
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

            <Box mb={2}>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} 
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
    </div>
  )
}