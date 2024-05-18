import React from "react";
import { Outlet } from 'react-router-dom'
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Menu from "./components/menu/menu";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./styles/styles.css";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  width: '100%',
  marginLeft: 0
}));


const ContentWrapper = styled('div')({
  minHeight: 'calc(86.5vh - 200px)', // 56px é a altura do seu navbar
  position: 'relative',
});


function App() {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 0, paddingLeft: 0 }} >
      <Grid container>
        <Grid item xs={12}>
          <Item className="paper-no-margin"><Navbar /></Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item className="paper-no-margin"><Menu /></Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item className="paper-no-margin">
            <ContentWrapper>
            <Outlet />
            </ContentWrapper>
          </Item>
        </Grid>
        <Grid item xs={12} md={1}>
          <Item></Item>
        </Grid>
        <Grid item xs={12}>
          <Item className="paper-no-margin"><Footer /></Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App;
