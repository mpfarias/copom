import React, { useEffect, useState } from 'react';

import {
  Box,
  RadioGroup,
  Radio,
  Alert,
  FormControlLabel,
  FormLabel,
  Grid,
  Stack,
  Typography,
  Switch
} from '@mui/material';
import FormViasDeFatoPessoas from './Forms/FormViasDeFatoPessoas';
import FormViasDeFatoGeneralizado from './Forms/FormViasDeFatoGeneralizado';


function ViasDeFato() {

  const [tipoVias, setTipoVias] = useState('vias de fato pessoas');

  const [state, setState] = useState({
    text01: 'ATENÇÃO, ATENDENTE: FICAR ATENTO NA SEGUINTE SITUAÇÃO: CASO O SOLICITANTE INFORME QUE SOFREU ALGUM TIPO DE AGRESSÃO FÍSICA, ESTE DEVE DESLOCAR-SE PARA A DELEGACIA E FAZER O REGISTRO. A VIATURA NÃO DEVE SER ACIONADA! SOMENTE DEVE SER ACIONADA EM CASO DE USO DE ARMA DE FOGO, E QUE HAJA RISCO REAL CONTRA A VIDA DE OUTRAS PESSOAS.',
    text02: 'CASO SEJA BRIGA EM DUAS OU 3 PESSOAS, SELECIONE A PRIMEIRA OPÇÃO ABAIXO. CASO SEJA BRIGA COM MAIS DE 3 PESSOAS EM QUALQUER LOCAL, SELECIONE A SEGUNDA OPÇÃO (GENERALIZADA).',
    text03: 'NÃO ACIONAR VIATURA. ENCERRE A OCORRÊNCIA COMO "INFORMAÇÃO". SE HOUVE USO DE ARMA BRANCA E EXISTEM PESSOAS FERIDAS, TRANSFIRA O SOLICITANTE PARA O 193',
    usoDeArma: 'false',
    individuoNoLocal: 'false',
    pessoasFeridas: 'false',
  });

  const { text01, text02, text03, usoDeArma, individuoNoLocal, pessoasFeridas } = state;

  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));

  };

  return (
    <>
      <Box paddingRight={0} marginTop={4}>
        <Grid container sx={{ width: '80%' }} spacing={3}>
          <Grid item style={{ paddingTop: 0 }} xs={12}>
            <Alert sx={{ mb: 1 }} severity="error">{text01}</Alert>
            <Alert sx={{ mb: 4 }} severity="warning">{text02}</Alert>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
              Qual foi a situação?
            </FormLabel>
            <RadioGroup
              value={tipoVias}
              onChange={(e) => setTipoVias(e.target.value)}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ mb: 4 }}
            >
              <FormControlLabel value="vias de fato pessoas" control={<Radio />} label="Vias de fato entre 2 ou 3 pessoas" />
              <FormControlLabel value="vias de fato generalizada" control={<Radio />} label="Vias de fato generalizada" />
            </RadioGroup>

            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
              Teve uso de arma de fogo?
            </FormLabel>
            <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
              <Typography>Não</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={usoDeArma === "true"}
                    onChange={(e) => handleChange("usoDeArma", e.target.checked ? "true" : "false")}
                    name="controlled-switch"
                  />
                }
                sx={{
                  display: 'block',

                }}
              />
              <Typography>Sim</Typography>
            </Stack>

          </Grid>
        </Grid>
      </Box>

      <Box paddingRight={2} marginTop={2}>
        <Grid container sx={{ width: '100%' }} spacing={3}>
          <Grid item style={{ paddingTop: 0 }} xs={12}>
            {tipoVias === 'vias de fato pessoas' && usoDeArma === 'true' ? (
              <FormViasDeFatoPessoas />
            ) : null}
            {tipoVias === 'vias de fato generalizada' ? (
              <FormViasDeFatoGeneralizado />
            ) : usoDeArma === 'false' && (
              <>
                <Grid container sx={{ width: '80%' }}>
                  <Grid item style={{ paddingTop: 0 }} xs={12}>
                    <Alert sx={{ mb: 8 }} severity="error">{text03}</Alert>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ViasDeFato
