import React, { useEffect, useState } from 'react';

import {
  Box,
  RadioGroup,
  Radio,
  Alert,
  FormControlLabel,
  FormLabel,
  Grid
} from '@mui/material';
import FormViasDeFatoPessoas from './Forms/FormViasDeFatoPessoas';
import FormViasDeFatoGeneralizado from './Forms/FormViasDeFatoGeneralizado';


function ViasDeFato() {

  const [tipoVias, setTipoVias] = useState('vias de fato pessoas');

  const [state, setState] = useState({
    text01: 'ATENÇÃO, ATENDENTE: FICAR ATENTO NA SEGUINTE SITUAÇÃO: CASO O SOLICITANTE INFORME QUE SOFREU ALGUM TIPO DE AGRESSÃO FÍSICA, ESTE DEVE DESLOCAR-SE PARA A DELEGACIA E FAZER O REGISTRO. A VIATURA NÃO DEVE SER ACIONADA! SOMENTE DEVE SER ACIONADA EM CASO DE USO DE ARMA BRANCA OU DE FOGO.',
    text02: 'CASO SEJA BRIGA EM DUAS OU 3 PESSOAS, SELECIONE A PRIMEIRA OPÇÃO ABAIXO. CASO SEJA BRIGA COM MAIS DE 3 PESSOAS EM QUALQUER LOCAL, SELECIONE A SEGUNDA OPÇÃO (GENERALIZADA).',
  });

  const { text01, text02 } = state;

  return (
    <>
      <Box paddingRight={2} marginTop={4}>
        <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
          <Grid item style={{ paddingTop: 0 }} xs={12}>
            <Alert sx={{ mb: 1 }} severity="error">{text01}</Alert>
            <Alert sx={{ mb: 4 }} severity="error">{text02}</Alert>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
              Qual foi a situação?
            </FormLabel>
            <RadioGroup
              value={tipoVias}
              onChange={(e) => setTipoVias(e.target.value)}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel value="vias de fato pessoas" control={<Radio />} label="Vias de fato entre 2 ou 3 pessoas" />
              <FormControlLabel value="vias de fato generalizada" control={<Radio />} label="Vias de fato generalizada" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
      <Box paddingRight={2} marginTop={4}>
        <Grid container sx={{width: '100%' }} spacing={3}>
          <Grid item style={{ paddingTop: 0 }} xs={12}>
            {tipoVias === 'vias de fato pessoas' ? (
              <>
                <FormViasDeFatoPessoas />
              </>
            ) : (
              <>
                <FormViasDeFatoGeneralizado />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ViasDeFato
