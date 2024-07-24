import React, { useEffect, useState } from 'react'

import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  FormLabel,
  Grid,
  MenuItem,
  Stack,
  Typography,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert
} from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { regioesAdministrativas } from '../../AcidenteTransito/Const/Consts';

function FormViasDeFatoPessoas() {

  const [state, setState] = useState({
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    narrativa: '',
    individuoNoLocal: 'false',
    pessoasFeridas: 'false'
  });

  const { nome, endereco, regiaoAdministrativa, referencia, telefone, individuoNoLocal, pessoasFeridas, narrativa } = state;


  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  }
  const handleTelefoneChange = (e) => {
    const maxLength = 11;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange('telefone', e.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const text = `Tipo de situação: Vias de fato entre pessoas

* A pessoa de NOME: ${nome}, informa que houve vias de fato em ${endereco}, ${regiaoAdministrativa}, ${referencia} com uso de ARMA DE FOGO.
${individuoNoLocal === 'true' ? 'Informa ainda que o indivíduo armado encontra-se no local. EQUIPE AGIR COM CAUTELA' : ''}
${pessoasFeridas === 'true' ? 'Necessita de apoio do CBMDF, pois tem pessoa ferida no local.': ''}

`;
setState(prevState => ({ ...prevState, narrativa: text }));
}, [ nome, endereco, referencia, regiaoAdministrativa, telefone, individuoNoLocal, pessoasFeridas]);

  return (
    <Box paddingRight={2} marginTop={4} marginBottom={8}>
      <Grid container sx={{ width: '100%' }} spacing={3}>
        <Grid item xs={12}>
          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Nome do solicitante" id="outlined-basic-endereco" label="Qual seu nome?" name="nome" onChange={e => handleChange('nome', e.target.value)} variant="outlined" />
            <CopyToClipboard text={nome} onCopy={() => console.log("nome")}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
            <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={4}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                  <Select
                    sx={{ marginBottom: 2 }}
                    placeholder="Cidade:"
                    value={regiaoAdministrativa}
                    onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    variant="outlined"
                    id="outlined-basic-regiaoAdministrativa"
                  >
                    {regioesAdministrativas
                      .slice()
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
                  <Button variant="contained"
                    color="secondary"
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" id="outlined-basic-endereco" label="Tem ponto de referência?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
            <CopyToClipboard text={referencia} onCopy={() => console.log("referência")}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
            <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={10}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
              Indivíduo armado encontra-se no local ou nas proximidades?
            </FormLabel>
            <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
              <Typography>Não</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={individuoNoLocal === "true"}
                    onChange={(e) => handleChange("individuoNoLocal", e.target.checked ? "true" : "false")}
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

          <Grid item xs={12} sm={10}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
              Tem pessoa ferida no local?
            </FormLabel>
            <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
              <Typography>Não</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={pessoasFeridas === "true"}
                    onChange={(e) => handleChange("pessoasFeridas", e.target.checked ? "true" : "false")}
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
          <Grid item xs={7} sx={{ mb: 4 }}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
            <TextField
              className="narrativa-text"
              sx={{
                backgroundColor: 'rgba(0, 200, 0, 0.1)',
              }}
              multiline
              fullWidth
              value={narrativa}
              InputProps={{
                disabled: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={8}>
              <CopyToClipboard text={narrativa} onCopy={() => console.log("narrativa")}>
                <Button variant="contained"
                  color="secondary"
                  onClick={handleClick}
                  style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto
                </Button>
              </CopyToClipboard>
            </Grid>
          </Grid>

          <Snackbar
            sx={{
              top: '70%',
              marginLeft: '26%'
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}>
            <Alert severity="warning">Texto COPIADO</Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FormViasDeFatoPessoas