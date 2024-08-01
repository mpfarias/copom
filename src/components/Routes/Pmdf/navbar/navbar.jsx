import React from 'react';
import { Box } from "@mui/material";

const Navbar = () => {

  return (
    <Box
      sx={{
        p: 1,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
        color: "#ffffff",
        backgroundColor: "#346399",
        fontSize: "calc(16px + 1vw)",
        width: "100%",
        padding: 0,
        marginBottom: 5
      }}
    >

      <Box component="section">
        Governo do Distrito Federal
      </Box>

      <Box component="section" sx={{ marginBottom: 0 }}>
        Secretaria de Segurança Pública
      </Box>

      <Box component="section" sx={{ paddingBottom: 2, }}>
        HEFESTO - Registro de Ocorrências
      </Box>
      
    </Box>
  );
};

export default Navbar;
