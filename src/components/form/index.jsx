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
  IconButton,
  Button
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FormularioViolenciaDomestica() {
  const agressaoOptions = ['ameaça', 'agressão física', 'agressão psicológica', 'violação de zona de proteção'];
  const gritosOptions = ['voz masculina ao fundo', 'gritos de socorro'];
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({
    nomeVitima: '',
    endereco: '',
    telefone: '',
    agressao: [],
    gritos: [],
    armado: '',
    parentesco: 'marido',
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

  const handleResetForm = () => {
    setState({
      
      nomeVitima: '',
      endereco: '',
      telefone: '',
      agressao: [],
      gritos: [],
      armado: '',
      parentesco: 'marido',
      medida: '',
      agressorNoLocal: '',
      ferida: '',
      criancas: '',
      narrativa: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Role até o topo da página
  };

  return (
    <Grid container spacing={3}> {/* Adicionando um container Grid */}
      <Grid item xs={12}> {/* Usando Grid item para cada seção do formulário */}

        <Box
          sx={{
            mt: 3
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
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeVitima', e.target.value)} label="Nome solicitante/vítima" name="nomeVitima" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic-endereco" label="Endereço" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField sx={{ marginBottom: 4 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Telefone" name="telefone" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <FormLabel id="demo-controlled-checkbox-group">Tipo de agressão:</FormLabel>
        <Grid container spacing={1}>
          {agressaoOptions.map(option => (
            <Grid item key={option} xs={6} sm={4} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agressao.includes(option)}
                    onChange={(e) => handleCheckboxChange('agressao', option)}
                  />
                }
                label={option.charAt(0).toUpperCase() + option.slice(1)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormLabel id="demo-controlled-checkbox-group">Tipo de agressão:</FormLabel>
        <Grid container spacing={1}>
          {gritosOptions.map(option => (
            <Grid item key={option} xs={6} sm={4} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gritos.includes(option)}
                    onChange={(e) => handleCheckboxChange('gritos', option)}
                  />
                }
                label={option.charAt(0).toUpperCase() + option.slice(1)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel id="demo-controlled-radio-buttons-group">Grau de parentesco:</FormLabel>
          <Select
            placeholder="Parentesco"
            value={parentesco}
            onChange={(e) => handleChange('parentesco', e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            variant="outlined"
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
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          {showOutroInput && (
            <TextField
              fullWidth
              value={outroParentesco}
              onChange={(e) => setOutroParentesco(e.target.value)}
              label="Outro Parentesco"
              variant="outlined"
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12} sx={{ mt: 3 }}>
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
      <Grid item xs={12} sx={{marginBottom:8}} >
        <Button variant="contained"
          color="secondary"
          onClick={handleResetForm}
          style={{ backgroundColor: '#000066', color: '#FFFFFF'}}>Limpar Formulário</Button>
      </Grid>
    </Grid>
  );
}