import { TextField, Button, Alert, Box,Typography } from "@mui/material";
import { IconoFolder } from "../../assets/svg/IconoFolder.jsx";

const ImageUploadForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  error,
  success,
  preview,
}) => {
    
  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Typography sx={{display:"flex", marginBottom: "5px"}}>Titulo</Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
          placeholder="Ingresa un título para la imagen"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2271D1",
              },
              "&:hover fieldset": {
                borderColor: "#0056b3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#004494",
              },
            },
          }}
        />
      </Box>
      <Typography sx={{display:"flex", marginBottom: "5px"}}>Imagen</Typography>

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
          <Button 
            variant="contained" 
            component="span" 
            fullWidth 
            sx={{
              height: "300px",
              backgroundColor: "#f5f5f5", 
              borderColor: "#2271D1", 
              color: "gray",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              />
            ) : (
              <>
                <IconoFolder />
                Selecciona Tu Imagen
              </>
            )}
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