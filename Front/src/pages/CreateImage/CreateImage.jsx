import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConectionApi } from "../../hooks/useConextionApi";
import { Container, Typography } from "@mui/material";
import { ImagePreview, ImageUploadForm } from "../../Components";


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

        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.message || "Ocurrió un error al subir la imagen");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
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
      />
      {preview && <ImagePreview preview={preview} />}
    </Container>
  );
};

export default CreateImage;