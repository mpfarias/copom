import React, { useEffect, useState } from 'react';
import { Grid, TextField, FormLabel, FormGroup, Checkbox, FormControl, Select, MenuItem, Box, RadioGroup, Radio, FormControlLabel, Button, Snackbar, Alert } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { listaSolicitante } from '../../../../Consts/Solicitante';
import { regioesAdministrativas } from '../AcidenteTransito/Const/Consts';
import { listaVitimasComMulher } from '../../../../Consts/Vitimas';
import { listaParentesco } from '../../../../Consts/Parentesco';
import { listaOpcaoArmas, listaArmasBrancas } from '../../../../Consts/Opcoes';


function Agressao() {
  const [state, setState] = useState({
    solicitante: 'vítima',
    nome: '',
    endereco: '',
    parentesco: 'marido',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    listaArmas: 'não',
    arma: 'faca',
    outraArma:'',
    narrativa: ''
  });

  const { solicitante, nome, endereco, regiaoAdministrativa, referencia, telefone, parentesco, listaArmas, arma, narrativa } = state;

  const [open, setOpen] = useState(false);
  const [selectedVitimas, setSelectedVitimas] = useState([]);
  const [showOutraVitima, setShowOutraVitima] = useState(false);
  const [outroParentesco, setOutroParentesco] = useState('');
  const [showOutroParentesco, setShowOutroParentesco] = useState(false);
  const [outraArma, setOutraArma] = useState('');

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
    if (field === 'outroParentesco') {
      setOutroParentesco(value);
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? parentesco : value
      }));
    } else if (field === 'parentesco') {
      setShowOutroParentesco(value === '');
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? outroParentesco : value
      }));
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
    const newSelectedVitimas = selectedVitimas.includes(value)
      ? selectedVitimas.filter(vitima => vitima !== value)
      : [...selectedVitimas, value];

    setSelectedVitimas(newSelectedVitimas);
    setShowOutraVitima(newSelectedVitimas.includes('outro'));
  };

  const handleParentescoChange = (event) => {
    const { value } = event.target;
    const newSelectedParentescos = listaParentesco.filter(option => value.includes(option.value));
    setSelectedParentescos(newSelectedParentescos);
    setShowOutroParentesco(value.includes(''));
    handleChange('parentesco', value);
};


  useEffect(() => {
    let finalArma = arma === '' && outraArma ? outraArma : arma;
    let selectedVitimasText = selectedVitimas.join(', ');
    let article = selectedVitimas.includes('mulher') ? 'uma' : 'um';
    let listaArmasText = listaArmas === 'não' ? '' : `ATENÇÃO!! Agressor armado com ${listaArmas === 'arma branca' ? finalArma : (listaArmas === 'arma de fogo' ? 'arma de fogo' : outraArma)}`;

    let text = `A pessoa de nome ${nome} informa que ${solicitante === 'vítima'
      ? 'está sendo vítima de agressão pelo(a) ' + parentesco + '.'
      : `${article} ${selectedVitimasText}`
      }${listaArmasText ? '\n' + listaArmasText : ''}
    Endereço: ${endereco} - ${regiaoAdministrativa}${referencia === '' ? '' : ' - ' + referencia}
    Telefone: ${telefone}
    `;

    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [nome, solicitante, selectedVitimas, parentesco, endereco, regiaoAdministrativa, referencia, telefone, listaArmas, outraArma, arma])
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
            <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} onChange={e => handleChange('telefone', e.target.value)} inputProps={{ maxLength: 11 }} onKeyPress={handleKeyPress} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
            <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
              <Button variant="contained"
                color="secondary"
                onClick={handleClick}
                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
              </Button>
            </CopyToClipboard>
          </Grid>
          {solicitante === 'denunciante' && (
            <>
              <Grid item xs={12} sm={10}>
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-row-radio-buttons-group-label">Quem é a vítima?</FormLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
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
                {showOutraVitima && (
                  <TextField
                    label="Especifique a outra vítima"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Grid>
            </>
          )
          }
          <Grid item xs={12} sm={10}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Quem é o agressor?</FormLabel>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Select
              sx={{ marginBottom: 2, width: 300 }}
              placeholder="Parentesco"
              value={parentesco}
              onChange={(e) => handleParentescoChange ('parentesco', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              {listaParentesco
                .map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={10}>
            {showOutroParentesco && (
              <FormControl >
                <TextField
                  sx={{ width: 300 }}
                  value={outroParentesco}
                  onChange={(e) => setOutroParentesco(e.target.value)}
                  label="Outro agressor"
                  variant="outlined"
                />
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12} sm={10}>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Está utilizando alguma arma?</FormLabel>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Select
              sx={{ marginBottom: 2, width: 300 }}
              placeholder="Arma"
              value={listaArmas}
              onChange={(e) => handleChange('listaArmas', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              {listaOpcaoArmas
                .map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          {listaArmas === 'arma branca' && (
            <>
              <Grid item xs={12} sm={10}>
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual arma?</FormLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
                <Select
                  sx={{ marginBottom: 2, width: 300 }}
                  placeholder="Arma"
                  value={arma}
                  onChange={(e) => handleChange('arma', e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  variant="outlined"
                >
                  {listaArmasBrancas
                    .map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              {arma === ''  && (
          <Grid item xs={12} sx={{marginBottom: 2}}>
            <TextField
              fullWidth
              label="Por favor, especifique a arma"
              variant="outlined"
              value={outraArma}
              onChange={(e) => setOutraArma(e.target.value)}
            />
          </Grid>
        )}
            </>
          )
          }
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

export default Agressao;