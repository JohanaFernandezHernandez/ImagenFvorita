import { useNavigate } from "react-router-dom";
// import IconAlura from "../../assets/svg/IconArura"
// import { Button } from "../Button/Button";
import './Header.css';
import { Button } from '@mui/material';
import Logo from "../../assets/Logo.png";


export const Header = () => {
    const navigate = useNavigate();

    const onclick = () => {
        navigate('/')
 
    };

    const onclickVideo = () => {
       navigate('/create')
    };


    

return(

<header className="container-header"> 
    <img className="Logo" alt="logo" src={Logo}/>
    <nav className="container-nav">
        <Button onClick={onclick}>Home</Button>
        <Button onClick={onclickVideo}>Nueva Imagen</Button>
       
    </nav>

</header>
)
}