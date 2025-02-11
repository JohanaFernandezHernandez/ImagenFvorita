import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HomeIcon from "@mui/icons-material/Home";
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
        padding: {
          xs: "0px 20px",
          md: "0px 30px",
          xl: "0px 51px",
        },

        boxSizing: "border-box",
        borderBottom: "4px solid #2271D1",
        boxShadow: "0px 5px 29px 0px #2271D1B2",
        gap: {
          xs: "20px",
          md: "20px",
          xl: "30px",
        },
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{ width: "100%", minWidth: "100px", maxWidth: "200px" }}
      />

      <Box sx={{ display: "flex", gap: "25px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleHomeClick}
          sx={{
            textTransform: "none",
            fontWeight: "400",
            fontSize: {
              xs: "14px",
              md: "16px",
              xl: "18px",
            },
            gap:{
              xs: "5px",
              md: "10px",
              xl: "15px",
            },
            padding:{
              xs: "5px",
              md: "10px",
              xl: "15px",
            }

          }}
        >
          <HomeIcon />
         <Typography sx={{display:{
            xs: "none",
            md: "inline",
            xl: "inline",
          }}}> Home</Typography> 
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateImageClick}
          sx={{
            textTransform: "none",
            fontWeight: "400",
            fontSize: {
              xs: "14px",
              md: "16px",
              xl: "18px",
            },
            gap:{
              xs: "5px",
              md: "10px",
              xl: "15px",
            }
          }}
        >
          <AddPhotoAlternateIcon />
          <Typography sx={{display:{
            xs: "none",
            md: "inline",
            xl: "inline",
          }}}>Nueva Imagen</Typography>
        </Button>
      </Box>
    </Box>
  );
};
