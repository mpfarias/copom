import React, { useEffect, useState } from 'react';

import { Grid, FormLabel, FormControlLabel, FormControl, Box, RadioGroup, Radio, Select, MenuItem, TextField, Button, Snackbar, Alert } from '@mui/material';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CopyToClipboard } from 'react-copy-to-clipboard';


import { listaSolicitante } from '../../../../Consts/Solicitante';
import { listaVitimas } from '../../../../Consts/Vitimas';
import { regioesAdministrativas } from '../RouboFurto/Const/Consts';
import { listaOpcoes } from '../../../../Consts/Opcoes';




function Abandono() {
  const [state, setState] = useState({
    solicitante: '',
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    vitima: 'menor',
    ajuda: 'não',
    narrativa: ''
  });

  const { solicitante, vitima, nome, endereco, regiaoAdministrativa, referencia, telefone, ajuda, narrativa } = state;

  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleTelefoneChange = (event) => {
    const formattedTelefone = event.target.value.replace(/\D/g, "");
    const limitedTelefone = formattedTelefone.slice(0, 11);
    setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const [outraVitima, setOutraVitima] = useState('');
  
  const singleOption = listaSolicitante[1];

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

    let text = `Abandono de ${vitima}.
    Solicitante ${nome}, telefone: ${telefone} informa que tem um ${vitima} abandonado em ${endereco} - ${regiaoAdministrativa} - ${referencia}.
    De acordo com o solicitante, ${ajuda === 'sim' ? 'a vítima necessita de cuidados médicos. Acionar apoio CBMDF.': (ajuda === 'não' ? 'a vítima está bem e não precisa de cuidados médicos' : 'este não sabe informar o estado de saúde da vítima.') }
    `;

    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [vitima, nome, endereco, regiaoAdministrativa, referencia, telefone, ajuda])

  return (
    <>
      <Grid item xs={12} marginBottom={2} marginLeft={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormLabel style={{
              fontWeight: 'bold',
              fontSize: 30,
            }} id="demo-controlled-radio-buttons-group">Abandono</FormLabel>
            <Box
              sx={{
                mt: 2
              }}
              noValidate
              autoComplete="off"
            >
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Solicitante</FormLabel>
              <RadioGroup
                aria-label="solicitante"
                name="solicitante"
                value={solicitante}
                onChange={e => handleChange('solicitante', e.target.value)}
              >
                {singleOption && (
                  <FormControlLabel key={singleOption.value} value={singleOption.value} control={<Radio />} label={singleOption.label} />
                )}
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel id="demo-controlled-radio-buttons-group">Quem é a vítima?</FormLabel>
                  <Select
                    sx={{ marginBottom: 2 }}
                    value={vitima}
                    onChange={(e) => handleChange('vitima', e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    variant="outlined"
                    id="outlined-basic-batalhoes"
                  >
                    {listaVitimas
                      .map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {vitima === 'outro'  && (
          <Grid item xs={12} sx={{marginBottom: 2}}>
            <TextField
              fullWidth
              label="Por favor, especifique a vítima"
              variant="outlined"
              value={outraVitima}
              onChange={(e) => setOutraVitima(e.target.value)}
            />
          </Grid>
        )}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Qual o nome do solicitante?" variant="outlined" />
            <CopyToClipboard text={nome} onCopy={() => console.log('Nome copiado!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
              placeholder="Endereço"
              fullWidth
              id="outlined-basic-endereco"
              onChange={e => handleChange('endereco', e.target.value)}
              label="Qual o local do abandono?"
              variant="outlined" />
            <CopyToClipboard text={endereco} onCopy={() => console.log('Endereço copiado!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12}>
            <FormLabel id="demo-controlled-radio-buttons-group">Qual a cidade da ocorrência?</FormLabel>
          </Grid>

          <Grid item xs={12}>
            <Select
              sx={{ marginBottom: 2, width: '50%', marginRight: 2, }}
              fullWidth
              placeholder="Cidade:"
              value={regiaoAdministrativa}
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
              id="outlined-basic-regiaoAdministrativa"
            >
              {regioesAdministrativas.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
              placeholder="Ponto de referência"
              fullWidth
              id="outlined-basic-referencia"
              label="Qual o ponto de referência?"
              name="referencia"
              onChange={e => handleChange('referencia', e.target.value)}
              variant="outlined"
            />
            <CopyToClipboard text={referencia} onCopy={() => console.log('Referência copiada!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12}>
            <TextField onKeyPress={handleKeyPress} sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} placeholder='Telefone' inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
            <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
              <Button variant="contained"
                color="secondary"
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={6} marginBottom={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel id="demo-controlled-radio-buttons-group">A pessoa abandonada precisa de cuidados médicos?</FormLabel>
                  <Select
                    sx={{ marginBottom: 2 }}
                    placeholder="ajuda"
                    value={ajuda}
                    onChange={(e) => handleChange('ajuda', e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    variant="outlined"
                    id="outlined-basic-batalhoes"
                  >
                    {listaOpcoes
                      .map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: 4 }}>
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

    </>
  );
}

export default Abandono;
