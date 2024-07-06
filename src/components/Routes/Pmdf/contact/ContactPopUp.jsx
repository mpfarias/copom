import React from "react";
import TelefonesUteis from "./Contact.jsx";

import {Box, Grid, Paper} from '@mui/material';
import { styled } from '@mui/material/styles';

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


function TelefonesUteisPopup() {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 0, paddingLeft: 0 }} >
      <Grid container>
        <Grid item xs={12}>
          <Item className="paper-no-margin">
            <TelefonesUteis />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TelefonesUteisPopup;