import React from "react";
import FormularioViolenciaDomestica from "./components/form/form";
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
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item><Navbar /></Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item><Menu /></Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item><FormularioViolenciaDomestica /></Item>
        </Grid>
        <Grid item xs={12} md={1}>
          <Item></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><Footer /></Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App;
