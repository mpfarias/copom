import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase, FormLabel, Box, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

function openInNewWindow(url) {
  window.open(url, '_blank', 'noopener,noreferrer,width=1200,height=950');
}

export default function TelefonesUteis() {
  return (
    <>
      <FormLabel style={{
        fontWeight: 'bold',
        fontSize: 30,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 35
      }} id="demo-controlled-radio-buttons-group">Telefones úteis</FormLabel>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[{
            label: "Batalhões da Polícia Militar",
            imageSrc: "https://www.pmdf.df.gov.br/wp-content/uploads/2023/12/logo_PMDF_400_400.png",
            link: "src/components/Files/batalhoes.pdf",
          },
          {
            label: "Delegacias Polícia Civil",
            imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oj-UwPeSu4VFTM9Gx7P2xk86Igw55gD9iQ&s",
            link: "src/components/Files/delegacias.pdf",
          },
          {
            label: "Mesas do COPOM",
            imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHoOXZpJ85PXVMhQp4D273y-AoVSyWUs31g&s",
            link: "src/components/Files/mesas.pdf",
          },
          {
            label: "Conselhos Tutelares",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Conselho_Tutelar.jpg",
            link: "src/components/Files/conselhosTutelares.pdf",
          },
          {
            label: "Outros Órgãos",
            imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-re2HLQZmkNnBW-bR7JPdeI7u2ti1wNu2g&s",
            link: "src/components/Files/outrosOrgaos.pdf",
          }].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <ButtonBase sx={{ width: { xs: 100, sm: 120, md: 128 }, height: { xs: 100, sm: 120, md: 128 } }}>
                  <StyledLink onClick={() => openInNewWindow(item.link)}>
                    <Img 
                      alt="complex" 
                      src={item.imageSrc} 
                      sx={{
                        width: { xs: 50, sm: 70, md: 80 }, 
                        height: { xs: 50, sm: 70, md: 80 } 
                      }}
                    />
                  </StyledLink>
                </ButtonBase>
                <StyledLink onClick={() => openInNewWindow(item.link)}>
                  <Typography sx={{ cursor: 'pointer', textAlign: 'center' }} variant="body2">
                    {item.label}
                  </Typography>
                </StyledLink>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}