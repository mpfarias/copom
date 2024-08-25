import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  Grid,
  Button
} from '@mui/material';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { regioesAdministrativas } from '../../../../../Consts/RegioesAdministrativas';

export default function AlarmeAcionado() {
  const agressaoOptions = ['Sonoro', 'Luminoso' , 'Acionamento eletrônico', 'Acionamento manual', 'Botão do pânico',];
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({

    tipoAnimal: '',
    nomeAgressor: '',
    nomeSolicitante: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',  
    referencia: '',
    telefone: '',
    agressao: [],
    agressorNoLocal: '',
    tempoAgressao: '',
    localAgressao: '',
    filmagenImagem: '',
    parentesco: 'marido',
    urgencia: '',
    narrativa: '',
  });

  const [outroParentesco, setOutroParentesco] = useState('');

  const [showOutroInput, setShowOutroInput] = useState(false);

  const { 
    
    tipoAnimal, 
    nomeAgressor, 
    nomeSolicitante, 
    endereco, 
    regiaoAdministrativa, 
    referencia,
    telefone, 
    tempoAgressao,
    localAgressao,
    agressao, 
    agressorNoLocal,
    filmagenImagem,
    parentesco, 
    urgencia, 
    narrativa } = state;

  const handleChange = (field, value) => {
    if (field === 'outroParentesco') {
      setOutroParentesco(value);
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? parentesco : value
      }));
    } else if (field === 'parentesco') {
      setShowOutroInput(value === '');
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? outroParentesco : value 
      }));
    } else {
      setState(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    let updatedValue;
    if (state[field].includes(value)) {
      updatedValue = state[field].filter(item => item !== value);
    } else {
      updatedValue = [...state[field], value];
    }
    setState(prevState => ({ ...prevState, [field]: updatedValue }));
  };

  useEffect(() => {
    const text = 
`${solicitante === 'vitima' && solicitante !== '' ? '* Tipo de solicitante: Vítima' : '* Tipo de solicitante: Denunciante'}
 
 ${nomeSolicitante !== 'null' && nomeSolicitante !== '' ? '* Nome do Solicitante:: '+nomeSolicitante : ''}
 ${endereco !== 'null' && endereco !== '' ? '* Endereço do alarme acionado: '+endereco : ''}
 ${regiaoAdministrativa !== 'null' && regiaoAdministrativa !== '' ? '* RA: '+regiaoAdministrativa : ''}
 ${referencia !== 'null' && referencia !== '' ? '* Local de Referência: '+referencia : ''}
 ${telefone !== 'null' && telefone !== '' ? '* Telefone: '+telefone : ''}
 ${agressao.join(', ') !== 'null'  ? '* Informa que o alarme acionado foi: '+agressao.join(', ') : ''}
 ${agressorNoLocal !== 'null' && agressorNoLocal === 'true' ? '* Os suspeitos encontra-se no local' : ''}
 ${filmagenImagem === 'true' ? '* Denuciante possui imagens e/ou filmagens' : ''}
 ${urgencia === 'true' ? '* ATENÇÃO: PRIORIDADE/URGÊNCIA NO ATENDIMENTO!' : ''}
`;
    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [solicitante, 
    nomeAgressor,
    tipoAnimal, 
    nomeSolicitante, 
    endereco, 
    referencia, 
    regiaoAdministrativa, 
    telefone, 
    tempoAgressao, 
    localAgressao, 
    agressao, 
    parentesco, 
    agressorNoLocal, 
    filmagenImagem, 
    urgencia, 
    outroParentesco]);

  const handleTelefoneChange = (e) => {
    
    const maxLength = 11;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange('telefone', e.target.value);
  };

  return (

    <Box paddingRight={2} marginTop={4}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{
            fontWeight: 'bold',
            fontSize: 30,
          }} id="demo-controlled-radio-buttons-group">ALARME ACIONADO</FormLabel>
          <Box
            sx={{
              mt: 2
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Qual o tipo de solicitante ?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              sx={{ marginBottom: 0 }}
            >
              <FormControlLabel value="vitima" control={<Radio />} label="Própria Vítima" />
              <FormControlLabel value="denunciante" control={<Radio />} label="Empresa Denunciante" />
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth>
          <FormLabel id="demo-controlled-checkbox-group" style={{ color: '#990000', fontWeight: 'bold' , fontSize: 16 }}>ATENÇÃO ATENDENTE, faça as perguntas abaixo para o solicitante:</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">1 - Como a Empresa foi acionada ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">2 - Tentou ligar para o proprietário ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">3 - Sabe dizer o nome/telefone do proprietário ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">4 - Existe câmera no local ? dispõe de imagens ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">5 - Há sinais de arrombamento ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">6 - Há pessoas ou veículos suspeitos ?</FormLabel>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 16,}} id="demo-controlled-radio-buttons-group">7 - Há situação de violência no local ?</FormLabel>
          <FormLabel id="demo-controlled-checkbox-group" style={{ color: '#990000', fontWeight: 'bold' , fontSize: 16 }}>Caso o solicitante nao seja capaz de responder as perguntas acima informe que:</FormLabel>
          <FormLabel style={{  fontSize: 16,}} id="demo-controlled-radio-buttons-group">Senhor(a), para acionar o serviço de emergência é necessário que se trate de uma SITUAÇÃO REAL. Por gentileza, colha maiores detalhes e ligue novamente.  </FormLabel>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeSolicitante', e.target.value)} label="Qual o nome do solicitante ?" name="nomeSolicitante" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Qual o endereço do alarme acionado ?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
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
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Qual é o ponto de referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual é o telefone para contato ?" name="telefone" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-tempoAgressao" label="Quanto tempo o alarme está acionado  ?" name="tempoAgressao" onChange={e => handleChange('tempoAgressao', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-checkbox-group">Qual é o tipo de alarme acionado ?</FormLabel>
          <Grid container spacing={0}>
            {agressaoOptions.map(option => (
              <Grid item key={option} xs={6} sm={4} md={5}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agressao.includes(option)}
                      onChange={(e) => handleCheckboxChange('agressao', option)}
                      sx={{ fontSize: '1.5vw !important' }}
                    />
                  }
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        
        <Grid item xs={12}>
        <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Existem suspeitos encontram-se no local ?</FormLabel>
          <RadioGroup
            value={agressorNoLocal}
            onChange={(e) => handleChange("agressorNoLocal", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
          </RadioGroup>

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Possui filmagens/imagens?</FormLabel>
          <RadioGroup
            value={filmagenImagem}
            onChange={(e) => handleChange("filmagenImagem", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
          </RadioGroup>

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Verifica-se Urgência no atedimento ?</FormLabel>
          <RadioGroup
            value={urgencia}
            onChange={(e) => handleChange("urgencia", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
          </RadioGroup>

        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
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
        <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
          <CopyToClipboard text={narrativa} onCopy={() => console.log("narrativa")}>
            <Button variant="contained"
              color="secondary"
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid >
    </Box>

  );
}


