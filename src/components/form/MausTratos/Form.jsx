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

export default function MausTratos() {
  const agressaoOptions = ['Falta água/alimento', 'Tortura', 'Agressão física', 'Abandono', 'Sacrifício'];
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
        parentesco: value === '' ? parentesco : value // Atualiza parentesco com o valor selecionado ou outroParentesco
      }));
    } else if (field === 'parentesco') {
      setShowOutroInput(value === ''); // Mostra o input se o parentesco for "Outro"
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? outroParentesco : value // Atualiza parentesco com o valor selecionado ou outroParentesco
      }));
    } else {
      setState(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    let updatedValue;
    if (state[field].includes(value)) {
      updatedValue = state[field].filter(item => item !== value); // Remove o valor se já estiver selecionado
    } else {
      updatedValue = [...state[field], value]; // Adiciona o valor se ainda não estiver selecionado
    }
    setState(prevState => ({ ...prevState, [field]: updatedValue }));
  };

  useEffect(() => {
    const text = 
`${solicitante === 'vitima' && solicitante !== '' ? '* Tipo de solicitante: Vítima' : '* Tipo de solicitante: Denunciante'}
 
 ${tipoAnimal !== 'null' && tipoAnimal !== '' ? '* Tipo de animal: '+tipoAnimal : ''} 
 ${nomeSolicitante !== 'null' && nomeSolicitante !== '' ? '* Nome do Solicitante:: '+nomeSolicitante : ''}
 ${nomeAgressor !== 'null' && nomeAgressor !== '' ? '* Nome do agressor: '+nomeAgressor : ''}
 ${endereco !== 'null' && endereco !== '' ? '* Residente em: '+endereco : ''}
 ${regiaoAdministrativa !== 'null' && regiaoAdministrativa !== '' ? '* RA: '+regiaoAdministrativa : ''}
 ${referencia !== 'null' && referencia !== '' ? '* Local de Referência: '+referencia : ''}
 ${telefone !== 'null' && telefone !== '' ? '* Telefone: '+telefone : ''}
 ${agressao.join(', ') !== 'null' ? '* Informa que o animal está sendo vítima de: '+agressao.join(', ') : ''}
 ${tempoAgressao !== 'null' && tempoAgressao !== '' ? '* Tempo de agressão do animal: '+tempoAgressao : ''} 
 ${localAgressao !== 'null' && tempoAgressao !== '' ? '* Local da agressão do animal: '+localAgressao : ''}
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

  const handleCopy = () => {
    const narrativa = state.narrativa;
    navigator.clipboard.writeText(narrativa);
  };

  const handleTelefoneChange = (e) => {
    // Limitando o número de caracteres do campo de telefone para 11
    const maxLength = 11;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange('telefone', e.target.value);
  };

  const handleResetForm = () => {
    setState({
      solicitante: 'vitima',
      tipoAnimal: '',
      nomeAgressor: '',
      nomeAutor: '',
      nomeSolicitante: '',
      endereco: '',
      regiaoAdministrativa: '',
      referencia: '',
      telefone: '',
      agressao: [],
      tempoAgressao: '',
      agressorNoLocal: '',
      localAgressao: '',
      filmagenImagem: '',
      parentesco: 'marido',
      filmagenImagem: '',
      urgencia: '',
      narrativa: '',
    });
    setOutroParentesco(''); // Resetar o estado de outroParentesco
    setShowOutroInput(false); // Esconder o input de outroParentesco
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Role até o topo da página
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
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Tipo de solicitante:</FormLabel>
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
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Tipo de Animal:</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Tipo de Animal:"
              value={tipoAnimal}
              onChange={(e) => handleChange('tipoAnimal', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              <MenuItem value="Cachorro">Cachorro</MenuItem>
              <MenuItem value="Gato">Gato</MenuItem>
              <MenuItem value="Cavalo">Cavalo</MenuItem>
              <MenuItem value="Aves">Aves</MenuItem>
              <MenuItem value="Outros">Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeAgressor', e.target.value)} label="Nome agressor/autor ?" name="nomeAgressor" variant="outlined" />
          
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeSolicitante', e.target.value)} label="Nome solicitante ?" name="nomeSolicitante" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Endereço dos maus tratos ?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Cidade:"
              value={regiaoAdministrativa}
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              <MenuItem value="Plano Piloto">RA I - Plano Piloto</MenuItem>
              <MenuItem value="Gama">RA II - Gama</MenuItem>
              <MenuItem value="Taguatinga">RA III - Taguatinga</MenuItem>
              <MenuItem value="Brazlândia">RA IV - Brazlândia</MenuItem>
              <MenuItem value="Sobradinho">RA V - Sobradinho</MenuItem>
              <MenuItem value="Planaltina">RA VI - Planaltina</MenuItem>
              <MenuItem value="Paranoá">RA VII - Paranoá</MenuItem>
              <MenuItem value="Núcleo Bandeirante">RA VIII - Núcleo Bandeirante</MenuItem>
              <MenuItem value="Ceilândia">RA IX - Ceilândia</MenuItem>
              <MenuItem value="Guará">RA X - Guará</MenuItem>
              <MenuItem value="Cruzeiro">RA XI - Cruzeiro</MenuItem>
              <MenuItem value="Samambaia">RA XII - Samambaia</MenuItem>
              <MenuItem value="Santa Maria">RA XIII - Santa Maria</MenuItem>
              <MenuItem value="São Sebastião">RA XIV - São Sebastião</MenuItem>
              <MenuItem value="Recanto das Emas">RA XV - Recanto das Emas</MenuItem>
              <MenuItem value="Lago Sul">RA XVI - Lago Sul</MenuItem>
              <MenuItem value="Riacho Fundo">RA XVII - Riacho Fundo</MenuItem>
              <MenuItem value="Lago Norte">RA XVIII - Lago Norte</MenuItem>
              <MenuItem value="Candangolândia">RA XIX - Candangolândia</MenuItem>
              <MenuItem value="Águas Claras">RA XX - Águas Claras</MenuItem>
              <MenuItem value="Riacho Fundo II">RA XXI - Riacho Fundo 2</MenuItem>
              <MenuItem value="Sudoeste">RA XXII - Sudoeste</MenuItem>
              <MenuItem value="Octogonal">RA XXII - Octogonal</MenuItem>
              <MenuItem value="Varjão">RA XXIII - Varjão</MenuItem>
              <MenuItem value="Park Way">RA XXIV - Park Way</MenuItem>
              <MenuItem value="Estrutural">RA XXV - Estrutural</MenuItem>
              <MenuItem value="SCIA">RA XXV - SCIA</MenuItem>
              <MenuItem value="Sobradinho II">RA XXVI - Sobradinho II</MenuItem>
              <MenuItem value="Jardim Botânico">RA XIV - Jardim Botânico</MenuItem>
              <MenuItem value="Itapoã">RA XIV - Itapoã</MenuItem>
              <MenuItem value="SIA">RA XIV - SIA</MenuItem>
              <MenuItem value="Vicente Pires">RA XIV - Vicente Pires</MenuItem>
              <MenuItem value="Fercal">RA XIV - Fercal</MenuItem>
              <MenuItem value="Sol Nascente">RA XIV - Sol Nascente</MenuItem>
              <MenuItem value="Por do Sol">RA XIV - Por do Sol</MenuItem>
              <MenuItem value="Arniqueira">RA XIV - Arniqueira</MenuItem>
              <MenuItem value="Arapoanga">RA XIV - Arapoanga</MenuItem>
              <MenuItem value="Água Quente">RA XIV - Água Quente</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-endereco" label="Ponto de referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Telefone ?" name="telefone" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-tempoAgressao" label="Quanto tempo ocorre os maus tratos  ?" name="tempoAgressao" onChange={e => handleChange('tempoAgressao', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} fullWidth id="outlined-basic-localAgressao" label="Onde ocorre os maus tratos ?" name="localAgressao" onChange={e => handleChange('localAgressao', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-checkbox-group">Tipo de agressão:</FormLabel>
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
        <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Agressor encontra-se no local ?</FormLabel>
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Urgência no atedimento?</FormLabel>
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
          <Button variant="contained"
            color="secondary"
            onClick={handleCopy}
            style={{ backgroundColor: '#006600', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
          <Button variant="contained"
            color="secondary"
            onClick={handleResetForm}
            style={{ backgroundColor: '#000066', color: '#FFFFFF' }}>Limpar Formulário</Button>
        </Grid>
      </Grid >
    </Box>

  );
}

