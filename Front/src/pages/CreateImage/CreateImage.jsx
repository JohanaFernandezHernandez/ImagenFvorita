import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConectionApi } from '../../hooks/useConextionApi';
import './CreateImage.css';

export const CreateImage = () => {
    const [formData, setFormData] = useState({
        Title: '',
        file: null
    });
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { createImage } = useConectionApi();

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'file') {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                file
            }));

            // Crear preview de la imagen
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreview('');
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            // Validaciones
            if (!formData.Title.trim()) {
                throw new Error('Por favor ingresa un título');
            }

            if (!formData.file) {
                throw new Error('Por favor selecciona una imagen');
            }

            // Validar tipo de archivo
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(formData.file.type)) {
                throw new Error('Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF, WEBP)');
            }

            // Validar tamaño del archivo (máximo 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB en bytes
            if (formData.file.size > maxSize) {
                throw new Error('La imagen es demasiado grande. El tamaño máximo es 5MB');
            }

            // Enviar datos
            const response = await createImage(formData.Title, formData.file);
            
            if (response) {
                setSuccess('¡Imagen subida exitosamente!');
                // Limpiar el formulario
                setFormData({ Title: '', file: null });
                setPreview('');
                
                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'Ocurrió un error al subir la imagen');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-image__container">
            <h2 className="create-image__title">Subir Nueva Imagen</h2>
            <form onSubmit={handleSubmit} className="create-image__form">
                <div className="create-image__group">
                    <label htmlFor="Title" className="create-image__label">Título</label>
                    <input
                        type="text"
                        id="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleInputChange}
                        placeholder="Ingresa un título para la imagen"
                        disabled={isSubmitting}
                        className="create-image__input"
                    />
                </div>

                <div className="create-image__group">
                    <label htmlFor="file" className="create-image__label">Seleccionar Imagen</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleInputChange}
                        accept="image/*"
                        disabled={isSubmitting}
                        className="create-image__input create-image__input--file"
                    />
                    <small className="create-image__help-text">
                        Formatos permitidos: JPEG, PNG, GIF, WEBP. Tamaño máximo: 5MB
                    </small>
                </div>

                {preview && (
                    <div className="create-image__preview-container">
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="create-image__preview-image"
                        />
                    </div>
                )}

                {error && <p className="create-image__message create-image__message--error">{error}</p>}
                {success && <p className="create-image__message create-image__message--success">{success}</p>}

                <button
                    type="submit"
                    className="create-image__button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Subiendo...' : 'Subir Imagen'}
                </button>
            </form>
        </div>
    );
};