import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Logo from "../../assets/Logo.png";

export const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCreateImageClick = () => {
    navigate("/create");
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "125px",
        backgroundColor: "#000000E5",
        width: "100%",
        padding: "0px 51px",
        boxSizing: "border-box",
        borderBottom: "4px solid #2271D1",
        boxShadow: "0px 5px 29px 0px #2271D1B2",
      }}
    >
      <Box component="img" src={Logo} alt="Logo" sx={{ width: "200px" }} />

      <Box sx={{ display: "flex", gap: "25px" }}>
        <Button variant="contained" color="primary" onClick={handleHomeClick}>
          Home
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCreateImageClick}>
          Nueva Imagen
        </Button>
      </Box>
    </Box>
  );
};
