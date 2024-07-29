import React, { useState } from 'react';
import { Grid, FormLabel, Box, RadioGroup, Radio, FormControlLabel, Button, Snackbar, Alert } from '@mui/material';
import { listaSolicitante } from '../../../../Consts/Solicitante';

function Agressao() {
  const [state, setState] = useState({
    solicitante: '',
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    narrativa: ''
  });

  const { solicitante } = state;

  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <>
      <Grid item xs={12} marginBottom={2} marginLeft={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 30 }} id="demo-controlled-radio-buttons-group">
              Agressão física
            </FormLabel>
            <Box sx={{ mt: 2 }} noValidate autoComplete="off">
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-radio-buttons-group">
                Solicitante
              </FormLabel>
              <RadioGroup
                aria-label="solicitante"
                name="solicitante"
                value={solicitante}
                onChange={e => handleChange('solicitante', e.target.value)}
              >
                {listaSolicitante.map(option => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Grid>

                


        </Grid>
      </Grid>
    </>
  );
}

export default Agressao;