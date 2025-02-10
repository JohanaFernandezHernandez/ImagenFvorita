import { Box, Typography, IconButton, Stack } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: "125px",
        backgroundColor: "#000000E5",
        borderTop: "4px solid #2271D1",
        boxShadow: "0px 5px 29px 0px #2271D1B2",
      }}
    >
      <Stack direction="row" spacing={2}>
        <IconButton
          href="https://www.linkedin.com/in/johana-fernandez-hernandez"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'white',
            '&:hover': {
              color: '#2271D1',
            }
          }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
        <IconButton
          href="https://github.com/JohanaFernandezHernandez"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'white',
            '&:hover': {
              color: '#2271D1',
            }
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Typography 
        variant="body2" 
        color="white" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 0.5
        }}
      >
        <span>Hecho por Johana Fernandez</span>
        <span> {new Date().getFullYear()} Todos los derechos reservados</span>
      </Typography>
    </Box>
  );
};