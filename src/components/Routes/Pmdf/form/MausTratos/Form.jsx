import { useState, useEffect } from 'react';
import './style.css';
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


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function MausTratos() {
  const agressaoOptions = ['Falta água/alimento', 'Tortura', 'Agressão física', 'Abandono', 'Sacrifício'];
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({

    tipoAnimal: 'cachorro',
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
 
 ${tipoAnimal !== 'null' && tipoAnimal !== '' ? '* Tipo de animal: ' + tipoAnimal : ''} 
 ${nomeSolicitante !== 'null' && nomeSolicitante !== '' ? '* Nome do Solicitante:: ' + nomeSolicitante : ''}
 ${nomeAgressor !== 'null' && nomeAgressor !== '' ? '* Nome do agressor: ' + nomeAgressor : ''}
 ${endereco !== 'null' && endereco !== '' ? '* Residente em: ' + endereco : ''}
 ${regiaoAdministrativa !== 'null' && regiaoAdministrativa !== '' ? '* RA: ' + regiaoAdministrativa : ''}
 ${referencia !== 'null' && referencia !== '' ? '* Local de Referência: ' + referencia : ''}
 ${telefone !== 'null' && telefone !== '' ? '* Telefone: ' + telefone : ''}
 ${agressao.join(', ') !== 'null' ? '* Informa que o animal está sendo vítima de: ' + agressao.join(', ') : ''}
 ${tempoAgressao !== 'null' && tempoAgressao !== '' ? '* Tempo de agressão do animal: ' + tempoAgressao : ''} 
 ${localAgressao !== 'null' && tempoAgressao !== '' ? '* Local da agressão do animal: ' + localAgressao : ''}
 ${agressorNoLocal !== 'null' && agressorNoLocal === 'true' ? '* O agressor encontra-se no local' : ''}
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
          }} id="demo-controlled-radio-buttons-group">MAUS TRATOS DE ANIMAIS</FormLabel>
          <Box
            sx={{
              mt: 2
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual o tipo de solicitante ?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              sx={{ marginBottom: 0 }}
            >
              <FormControlLabel value="vitima" control={<Radio />} label="Vítima" />
              <FormControlLabel value="denunciante" control={<Radio />} label="Denunciante" />
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual o tipo de Animal ?</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Tipo de Animal:"
              value={tipoAnimal}
              onChange={(e) => handleChange('tipoAnimal', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              <MenuItem value="cachorro">Cachorro</MenuItem>
              <MenuItem value="gato">Gato</MenuItem>
              <MenuItem value="cavalo">Cavalo</MenuItem>
              <MenuItem value="aves">Aves</MenuItem>
              <MenuItem value="outros">Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeAgressor', e.target.value)} label="Qual é o nome agressor/autor ?" name="nomeAgressor" variant="outlined" />

        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeSolicitante', e.target.value)} label="Qual é o Nome solicitante ?" name="nomeSolicitante" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Qual é o endereço dos maus tratos ?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual é a cidade ?</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Cidade:"
              value={regiaoAdministrativa}
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              <MenuItem value="Água Quente">Água Quente</MenuItem>
              <MenuItem value="Águas Claras">Águas Claras</MenuItem>
              <MenuItem value="Arapoanga">Arapoanga</MenuItem>
              <MenuItem value="Arniqueira">Arniqueira</MenuItem>
              <MenuItem value="Brazlândia">Brazlândia</MenuItem>
              <MenuItem value="Candangolândia">Candangolândia</MenuItem>
              <MenuItem value="Ceilândia">Ceilândia</MenuItem>
              <MenuItem value="Cruzeiro">Cruzeiro</MenuItem>
              <MenuItem value="Estrutural">Estrutural</MenuItem>
              <MenuItem value="Fercal">Fercal</MenuItem>
              <MenuItem value="Gama">Gama</MenuItem>
              <MenuItem value="Guará">Guará</MenuItem>
              <MenuItem value="Itapoã">Itapoã</MenuItem>
              <MenuItem value="Jardim Botânico">Jardim Botânico</MenuItem>
              <MenuItem value="Lago Norte">Lago Norte</MenuItem>
              <MenuItem value="Lago Sul">Lago Sul</MenuItem>
              <MenuItem value="Núcleo Bandeirante">Núcleo Bandeirante</MenuItem>
              <MenuItem value="Octogonal">Octogonal</MenuItem>
              <MenuItem value="Paranoá">Paranoá</MenuItem>
              <MenuItem value="Park Way">Park Way</MenuItem>
              <MenuItem value="Planaltina">Planaltina</MenuItem>
              <MenuItem value="Por do Sol">Por do Sol</MenuItem>
              <MenuItem value="Recanto das Emas">Recanto das Emas</MenuItem>
              <MenuItem value="Riacho Fundo">Riacho Fundo</MenuItem>
              <MenuItem value="Riacho Fundo II">Riacho Fundo 2</MenuItem>
              <MenuItem value="Samambaia">Samambaia</MenuItem>
              <MenuItem value="Santa Maria">Santa Maria</MenuItem>
              <MenuItem value="São Sebastião">São Sebastião</MenuItem>
              <MenuItem value="SCIA">SCIA</MenuItem>
              <MenuItem value="SIA">SIA</MenuItem>
              <MenuItem value="Sobradinho">Sobradinho</MenuItem>
              <MenuItem value="Sobradinho II">Sobradinho II</MenuItem>
              <MenuItem value="Sol Nascente">Sol Nascente</MenuItem>
              <MenuItem value="Sudoeste">Sudoeste</MenuItem>
              <MenuItem value="Taguatinga">Taguatinga</MenuItem>
              <MenuItem value="Varjão">Varjão</MenuItem>
              <MenuItem value="Vicente Pires">Vicente Pires</MenuItem>
              <MenuItem value="Plano Piloto">Plano Piloto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Qual é o ponto de referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual é o telefone para contato ?" name="telefone" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-tempoAgressao" label="Quanto tempo ocorre os maus tratos  ?" name="tempoAgressao" onChange={e => handleChange('tempoAgressao', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-localAgressao" label="Onde ocorre os maus tratos ?" name="localAgressao" onChange={e => handleChange('localAgressao', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-checkbox-group">Qual o tipo de agressão sofrida pelo animal ?</FormLabel>
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">O agressor encontra-se no local ?</FormLabel>
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Possui filmagens/imagens?</FormLabel>
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Verifica-se Urgência no atedimento?</FormLabel>
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

