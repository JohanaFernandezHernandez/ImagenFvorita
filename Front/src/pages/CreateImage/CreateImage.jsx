import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConectionApi } from '../../hooks/useConextionApi';
import './CreateImage.css';

export const CreateImage = () => {
    const [formData, setFormData] = useState({
        Title: '',
        ImagenURL: ''
    });
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { createImage } = useConectionApi();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Actualizar preview cuando se cambia la URL de la imagen
        if (name === 'ImagenURL') {
            setPreview(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            // Validaciones
            if (!formData.Title.trim() || !formData.ImagenURL.trim()) {
                throw new Error('Por favor completa todos los campos');
            }

            // Validar que la URL sea válida
            try {
                new URL(formData.ImagenURL);
            } catch {
                throw new Error('Por favor ingresa una URL válida');
            }

            // Enviar datos
            const response = await createImage(formData.Title, formData.ImagenURL);
            
            if (response) {
                setSuccess('¡Imagen creada exitosamente!');
                // Limpiar el formulario
                setFormData({ Title: '', ImagenURL: '' });
                setPreview('');
                
                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'Ocurrió un error al crear la imagen');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-image-container">
            <h2>Crear Nueva Imagen</h2>
            <form onSubmit={handleSubmit} className="create-image-form">
                <div className="form-group">
                    <label htmlFor="Title">Título</label>
                    <input
                        type="text"
                        id="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleInputChange}
                        placeholder="Ingresa un título para la imagen"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ImagenURL">URL de la Imagen</label>
                    <input
                        type="url"
                        id="ImagenURL"
                        name="ImagenURL"
                        value={formData.ImagenURL}
                        onChange={handleInputChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        disabled={isSubmitting}
                    />
                </div>

                {preview && (
                    <div className="preview-container">
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="preview-image"
                            onError={() => setPreview('')}
                        />
                    </div>
                )}

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creando...' : 'Crear Imagen'}
                </button>
            </form>
        </div>
    );
};