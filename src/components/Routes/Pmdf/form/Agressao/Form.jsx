import React, { useState } from 'react';
import { Grid, TextField, FormLabel, FormGroup, Checkbox, FormControl, Select, MenuItem, Box, RadioGroup, Radio, FormControlLabel, Button, Snackbar, Alert } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { listaSolicitante } from '../../../../Consts/Solicitante';
import { regioesAdministrativas } from '../AcidenteTransito/Const/Consts';
import { listaVitimasComMulher } from '../../../../Consts/Vitimas';




function Agressao() {
  const [state, setState] = useState({
    solicitante: '',
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    vitima: '',
    narrativa: ''
  });

  const { solicitante, nome, endereco, regiaoAdministrativa, referencia, telefone, vitima } = state;

  const [open, setOpen] = useState(false);
  const [selectedVitimas, setSelectedVitimas] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (field, value) => {
    if (field === 'matricula') {
      const uppercasedValue = value.toUpperCase();
      if (/^[\dX]*$/.test(uppercasedValue) && uppercasedValue.length <= 11) {
        setMatricula(uppercasedValue);
        setState(prevState => ({ ...prevState, [field]: uppercasedValue }));
      }
    } else {
      setState(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 88 && charCode !== 120) {
      event.preventDefault();
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedVitimas(prevSelected =>
      checked ? [...prevSelected, value] : prevSelected.filter(item => item !== value)
    );
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
                row
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

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Nome do solicitante" id="outlined-basic-endereco" label="Qual seu nome?" name="nome" onChange={e => handleChange('nome', e.target.value)} variant="outlined" />
            <CopyToClipboard text={nome} onCopy={() => console.log("nome")}>
              <Button variant="contained"
                color="secondary"
                onClick={handleClick}
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local da situação?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
            <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
              <Button variant="contained"
                color="secondary"
                onClick={handleClick}
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={12} marginBottom={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                  <Select
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
                    onClick={handleClick}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF' }}><FileCopyIcon />
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10}>
            <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" id="outlined-basic-endereco" label="Tem ponto de referência?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
            <CopyToClipboard text={referencia} onCopy={() => console.log("referência")}>
              <Button variant="contained"
                color="secondary"
                onClick={handleClick}
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} onChange={e => handleChange('telefone', e.target.value)} inputProps={{ maxLength: 11 }} onKeyPress={handleKeyPress} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
              <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
                <Button variant="contained"
                  color="secondary"
                  onClick={handleClick}
                  style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                </Button>
              </CopyToClipboard>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-row-radio-buttons-group-label">Quem é a vítima?</FormLabel>
              <FormControl component="fieldset" variant="standard">
            <Box>
              {listaVitimasComMulher.map(option => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedVitimas.includes(option.value)}
                      onChange={handleCheckboxChange}
                      value={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Box>
          </FormControl>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </>
  );
}

export default Agressao;