import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "125px",
        backgroundColor: "#000000E5",
        borderTop: "4px solid #2271D1",
        boxShadow: "0px 5px 29px 0px #2271D1B2",
      }}
    >
      <Typography variant="body1" color="white">
        Hecho por Johana Fernandez
      </Typography>
    </Box>
  );
};