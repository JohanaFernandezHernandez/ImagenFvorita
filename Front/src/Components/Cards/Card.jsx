import { Button , Box} from '@mui/material';
import Borrar from "../../assets/svg/Borrar"
import Editar from "../../assets/svg/Editar"
import './Card.css'

export const Card = ({img, title}) => {

return(
<div className="card">
    
    <Box sx={{width:"100%", height:"80%"}}>
    <img className="imagen-card" src={img} alt="Imagen card"/>
    </Box>
    
    <h3 className='title-imagen'>{title}</h3>
    
    <div className="container-button">
        <buton className="button-card"> <Borrar/> BORRAR</buton>
        <buton className="button-card"> <Editar/> EDITAR</buton>
    </div>
</div>
)
}