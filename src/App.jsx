import FormularioViolenciaDomestica from "./components/form";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Main from "./components/main/main"

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import "./styles/styles.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}));

function App() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
         <Item><Navbar /></Item>
        </Grid>
        <Grid xs={2}>
          <Item><Main /></Item>
        </Grid>
        <Grid xs={8}>
          <Item><FormularioViolenciaDomestica /></Item>
        </Grid>
        <Grid xs={2}>
          <Item></Item>
        </Grid>
        <Grid xs={12}>
          <Item><Footer /></Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
