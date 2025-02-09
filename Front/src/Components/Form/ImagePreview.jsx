import { Box } from "@mui/material";

const ImagePreview = ({ preview }) => {
    
  return (
    <Box mt={2} display="flex" justifyContent="center">
      <img
        src={preview}
        alt="Vista previa"
        style={{
          maxWidth: "100%",
          maxHeight: "250px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ImagePreview;