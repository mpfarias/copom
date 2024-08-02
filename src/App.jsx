import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Routes/Pmdf/navbar/navbar";
import Footer from "./components/Routes/Pmdf/footer/footer";
import Menu from "./components/Routes/Pmdf/menu/menu";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./styles/styles.css";

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
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Item>
        <Navbar />
      </Item>
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} md={3}>
          <Item><Menu /></Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
          </Item>
        </Grid>
        <Grid item xs={12} md={1}>
          <Item></Item>
        </Grid>
      </Grid>
      <Item>
        <Footer />
      </Item>
    </Box>
  );
}

export default App;