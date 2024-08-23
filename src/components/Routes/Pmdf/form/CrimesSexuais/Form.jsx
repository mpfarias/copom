import React from 'react';
import FormularioBase from '../../../../Consts/FormularioBase'
import { Grid } from '@mui/material';
import Cabecalho from './Cabecalho/Cabecalho';
import DemaisCampos from './DemaisCampos/DemaisCampos';

function CrimesSexuais() {

  return (
    <Grid item xs={12} marginBottom={2} marginLeft={4}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Cabecalho />
          <FormularioBase />
          <DemaisCampos/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CrimesSexuais