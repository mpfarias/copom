import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import logoPmdf from "/assets/images/PMDF.png";

export default function Home() {
  const theme = useTheme();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  }));

  return (
    <Box 
      display="flex"
      marginLeft="25vh"
      minHeight="69vh"
    >
      <Grid container>
        <Grid xs={12} sm={10}>
          <Item>
            <Box
              component="img"
              src={logoPmdf}
              alt="PMDF Logo"
              sx={{
                width: 350,
                marginBottom: 4,
                maxWidth: '100%',
                height: 'auto',
                [theme.breakpoints.down('sm')]: {
                  maxWidth: '60%',
                },
                [theme.breakpoints.down('xs')]: {
                  maxWidth: '40%',
                },
                cursor: 'pointer'
              }}
            />
            <Box sx={{ marginBottom: 3 }}>
              Polícia Militar do Distrito Federal
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
