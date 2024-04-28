import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FormularioViolenciaDomestica() {
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({
    nomeVitima: '',
    endereco: '',
    telefone: '',
    agressao: [],
    gritos: [],
    armado: '',
    parentesco: '',
    medida: '',
    agressorNoLocal: '',
    ferida: '',
    criancas: '',
    narrativa: '',
  });

  const [outroParentesco, setOutroParentesco] = useState('');
  const [showOutroInput, setShowOutroInput] = useState(false);

  const { nomeVitima, endereco, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, narrativa } = state;

  const handleChange = (field, value) => {
    if (field === 'parentesco') {
      setShowOutroInput(value === ''); // Mostra o input se o parentesco for "Outro"
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? outroParentesco : value // Atualiza parentesco com o valor selecionado ou outroParentesco
      }));
    } else if (field === 'outroParentesco') {
      setOutroParentesco(value);
      setState(prevState => ({
        ...prevState,
        parentesco: value === '' ? parentesco : value // Atualiza parentesco com o valor selecionado ou outroParentesco
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
    const text = `Tipo de solicitante: ${solicitante === 'vitima' ? 'Vítima' : 'Denunciante'}

A pessoa de nome ${nomeVitima}, residente em ${endereco}, telefone: ${telefone} informa que ${solicitante === 'vitima' ? 'foi vítima de ' + agressao.join(', ') : 'está presenciando uma pessoa sofrendo ' + agressao.join(', ')} pelo(a) ${parentesco === '' ? outroParentesco : parentesco}, ${ferida === 'true' ? 'e que está ferida. Precisa de apoio CBMDF.' : 'porém, não está ferida.'}
${medida === 'true' ? 'Possui medida protetiva' : 'Não possui medida protetiva'} contra o agressor.
O agressor${agressorNoLocal === 'true' ? ' ' : ' não '}encontra-se no local${armado === 'true' ? ', e está armado, equipe agir com cautela' : '.'}
${gritos.length > 0 ? 'É possível ouvir ' + gritos.join(', ') : ''}
${criancas === 'true' ? 'Há crianças no local' : ''}
`;
    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [solicitante, nomeVitima, endereco, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, outroParentesco]);

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

  return (
    <Box
      my={3}
      ml={50}
      sx={{
        width: 600,
        maxWidth: '100%',
        marginTop: 5
      }}
      noValidate
      autoComplete="off"
    >
      <FormLabel id="demo-controlled-radio-buttons-group">Solicitante</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={solicitante}
        onChange={(e) => setSolicitante(e.target.value)}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="vitima" control={<Radio />} label="Vítima" />
        <FormControlLabel value="denunciante" control={<Radio />} label="Denunciante" />
      </RadioGroup>
      <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeVitima', e.target.value)} label="Nome solicitante/vítima" name="nomeVitima" variant="outlined" />
      <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic-endereco" label="Endereço" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
      <TextField sx={{ marginBottom: 4 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Telefone" name="telefone" variant="outlined" />
      <FormLabel id="demo-controlled-checkbox-group">Tipo de agressão:</FormLabel>
      <Box sx={{ display: 'flex', gap: 3, padding: 3, marginBottom: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agressao.includes('ameaça')}
              onChange={(e) => handleCheckboxChange('agressao', 'ameaça')}
            />
          }
          label="Ameaça"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agressao.includes('agressão física')}
              onChange={(e) => handleCheckboxChange('agressao', 'agressão física')}
            />
          }
          label="Agressão física"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agressao.includes('agressão psicológica')}
              onChange={(e) => handleCheckboxChange('agressao', 'agressão psicológica')}
            />
          }
          label="Agressão psicológica"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agressao.includes('violação de medida protetiva')}
              onChange={(e) => handleCheckboxChange('agressao', 'violação de medida protetiva')}
            />
          }
          label="Violação de medida protetiva"
        />
      </Box>
      <FormLabel id="demo-controlled-checkbox-group">É possível ouvir:</FormLabel>
      <Box sx={{ display: 'flex', gap: 3, padding: 3, marginBottom: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={gritos.includes('voz masculina ao fundo')}
              onChange={(e) => handleCheckboxChange('gritos', 'voz masculina ao fundo')}
            />
          }
          label="Voz masculina ao fundo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gritos.includes('gritaria')}
              onChange={(e) => handleCheckboxChange('gritos', 'gritaria')}
            />
          }
          label="Gritos"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gritos.includes('nada')}
              onChange={(e) => handleCheckboxChange('gritos', 'nada')}
            />
          }
          label="Nada"
        />
      </Box>

      <FormLabel id="demo-controlled-radio-buttons-group">Grau de parentesco:</FormLabel>
      <Box sx={{ display: 'flex', gap: 3, padding: 1, marginBottom: 3 }}>
        <Select
          placeholder="Parentesco"
          value={parentesco}
          onChange={(e) => handleChange('parentesco', e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          sx={{
            width: 240,
            marginBottom: 4,
          }}
        >
          <MenuItem value="marido">Marido</MenuItem>
          <MenuItem value="ex-marido">Ex-marido</MenuItem>
          <MenuItem value="esposa">Esposa</MenuItem>
          <MenuItem value="ex-esposa">Ex-esposa</MenuItem>
          <MenuItem value="companheiro(a)">Companheiro(a)</MenuItem>
          <MenuItem value="ex-companheiro(a)">Ex-companheiro(a)</MenuItem>
          <MenuItem value="namorado">Namorado(a)</MenuItem>
          <MenuItem value="ex-namorado">Ex-namorado(a)</MenuItem>
          <MenuItem value="pai">Pai</MenuItem>
          <MenuItem value="mãe">Mãe</MenuItem>
          <MenuItem value="filho(a)">Filho(a)</MenuItem>
          <MenuItem value="irmão(a)">Irmão(a)</MenuItem>
          <MenuItem value="tio(a)">Tio(a)</MenuItem>
          <MenuItem value="">Outro</MenuItem>
          <MenuItem value="desconhecido">Desconhecido</MenuItem>
        </Select>
        {showOutroInput && (
          <input
            type="text"
            value={outroParentesco}
            onChange={(e) => setOutroParentesco(e.target.value)}
            placeholder="Digite o parentesco"
            style={{ marginTop: '8px', width: '100%', padding: '8px' }}
          />
        )}
      </Box>
      <FormLabel id="demo-controlled-radio-buttons-group">Possui medida protetiva?</FormLabel>
      <RadioGroup
        value={medida}
        onChange={(e) => handleChange("medida", e.target.value)}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>
      <FormLabel id="demo-controlled-radio-buttons-group">Agressor encontra-se no local?</FormLabel>
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
      <FormLabel id="demo-controlled-radio-buttons-group">Está armado?</FormLabel>
      <RadioGroup
        value={armado}
        onChange={(e) => handleChange("armado", e.target.value)}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <FormLabel id="demo-controlled-radio-buttons-group">Está ferida?</FormLabel>
      <RadioGroup
        value={ferida}
        onChange={(e) => handleChange("ferida", e.target.value)}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <FormLabel id="demo-controlled-radio-buttons-group">Criança envolvida?</FormLabel>
      <RadioGroup
        value={criancas}
        onChange={(e) => handleChange("criancas", e.target.value)}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <Grid item xs={1} sx={{ mt: 5 }}>
        <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
        <TextField
          sx={{
            backgroundColor: 'rgba(0, 200, 0, 0.1)',
          }}
          multiline
          fullWidth
          value={narrativa}
          InputProps={{
            disabled: true,
            endAdornment: (
              <IconButton onClick={handleCopy} aria-label="copy">
                <FileCopyIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Box>
  );
}
