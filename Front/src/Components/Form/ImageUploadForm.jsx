import { TextField, Button, Alert, Box } from "@mui/material";

const ImageUploadForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  error,
  success,
}) => {
    
  return (
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
          disabled={isSubmitting}
        />
      </Box>

      <Box mb={2}>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isSubmitting}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" fullWidth>
            Seleccionar Imagen
          </Button>
        </label>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Subiendo..." : "Subir Imagen"}
      </Button>
    </form>
  );
};

export default ImageUploadForm;