import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConectionApi } from "../../hooks/useConextionApi";
import { Container, Typography } from "@mui/material";
import { ImageUploadForm } from "../../Components";

const CreateImage = () => {
  const [formData, setFormData] = useState({ Title: "", file: null });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { createImage } = useConectionApi();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview("");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (!formData.Title.trim()) throw new Error("Por favor ingresa un título");
      if (!formData.file) throw new Error("Por favor selecciona una imagen");

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(formData.file.type))
        throw new Error("Selecciona un archivo de imagen válido (JPEG, PNG, GIF, WEBP)");

      const maxSize = 5 * 1024 * 1024;
      if (formData.file.size > maxSize)
        throw new Error("La imagen es demasiado grande. Tamaño máximo: 5MB");

      const response = await createImage(formData.Title, formData.file);
      if (response) {
        setSuccess("¡Imagen subida exitosamente!");
        setFormData({ Title: "", file: null });
        setPreview("");

        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setError(err.message || "Ocurrió un error al subir la imagen");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        minHeight: "70vh", 
        maxWidth: "1550px", 
        margin: "30px auto",
        width: {
          xs: "100%",
          sm: "85%",
          md: "75%",
          lg: "1150px",
          xl: "1226px",
        },
        border: "solid 1px #CEC7C7",
        borderRadius: "30px",
        boxShadow: "0px 10px 60px 0px #E2ECF980, 0px 4px 4px 0px #00000040",
        maxWidth: "1226px",
        padding: {
          xs: "14px 9px",
          sm: "14px 9px",
          md: "24px 29px",
          lg: "37px 29px",
          xl: "37px 29px",
        },
        boxSizing: "border-box",
        marginTop: "16px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Subir Nueva Imagen
      </Typography>
      <ImageUploadForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
        preview={preview}
      />
    </Container>
  );
};

export default CreateImage;