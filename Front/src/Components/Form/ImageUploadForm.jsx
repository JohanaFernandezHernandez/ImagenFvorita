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
          sx={{
            backgroundColor: "#f5f5f5", // Fondo gris claro
            borderRadius: 2, // Bordes redondeados
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2271D1", // Borde azul cuando no está seleccionado
              },
              "&:hover fieldset": {
                borderColor: "#0056b3", // Azul más oscuro al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: "#004494", // Azul aún más oscuro cuando está enfocado
              },
            },
          }}
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
        {isSubmitting ? "Guardando..." : "Guardar Imagen"}
      </Button>
    </form>
  );
};

export default ImageUploadForm;