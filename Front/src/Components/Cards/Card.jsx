import { Button , Box} from '@mui/material';
import Borrar from "../../assets/svg/Borrar"
import Editar from "../../assets/svg/Editar"
import './Card.css'

export const Card = ({img, title, id, onDelete}) => {

return(
<div className="card">
    
    <Box sx={{width:"100%", height:"80%"}}>
    <img className="imagen-card" src={img} alt="Imagen card"/>
    </Box>
    
    <h3 className='title-imagen'>{title}</h3>
    
    <div className="container-button">
        <button className="button-card" onClick={() => onDelete(id)}> <Borrar/> BORRAR</button>
        <button className="button-card"> <Editar/> EDITAR</button>
    </div>
</div>
)
}