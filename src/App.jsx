import { React, useState, useEffect } from "react";
import { CallProvider } from "./components/context/CallContext";
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Routes/Pmdf/navbar/navbar";
import Footer from "./components/Routes/Pmdf/footer/footer";
import Menu from "./components/Routes/Pmdf/menu/menu";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./styles/styles.css";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 0,
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  width: '100%',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
}));

const ContentWrapper = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});

function App() {
  const [comentarios, setComentarios] = useState([]);
  const [message, setMessage] = useState('');

  const getHome = async () => {
    await axios.get("http://10.95.91.61:5173/Admins/comentarios")
      .then((response) => {
        setComentarios(response.data);
      }).catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("API não conectada!");
        }
      });
  };

  useEffect(() => {
    getHome();
  }, []);

  return (
    <CallProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Item>
          <Navbar />
        </Item>
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={12} md={3}>
            <Item><Menu /></Item>
          </Grid>
          <Grid item xs={12} md={9}>
            <Item>
              <ContentWrapper>

                <Outlet comentarios={comentarios} />

              </ContentWrapper>
            </Item>
          </Grid>

        </Grid>
        <Item component="footer" sx={{ width: '100%' }}>
          <Footer />
        </Item>
      </Box>
    </CallProvider>
  );
}

export default App;
