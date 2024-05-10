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

export default function FormularioViolenciaDomestica() {
  const [enderecoDenunciante, setEnderecoDenunciante] = useState('');
  const agressaoOptions = ['ameaça', 'xingamentos', 'agressão física', 'agressão psicológica', 'violação de zona de proteção'];
  const gritosOptions = ['voz masculina ao fundo', 'gritos de socorro', 'choro'];
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({

    nomeVitima: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    agressao: [],
    gritos: [],
    armado: '',
    parentesco: 'marido',
    medida: '',
    agressorNoLocal: '',
    ferida: '',
    criancas: '',
    urgencia: '',
    narrativa: '',
  });
  const [outroParentesco, setOutroParentesco] = useState('');

  const [showOutroInput, setShowOutroInput] = useState(false);

  const { nomeVitima, endereco, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, urgencia, narrativa } = state;

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

    ${enderecoDenunciante}

    A pessoa de nome ${nomeVitima}, residente em ${endereco}, ${regiaoAdministrativa}, ${referencia}, telefone: ${telefone} informa que ${solicitante === 'vitima' ? 'está sendo vítima de ' + agressao.join(', ') : 'está presenciando uma pessoa sofrendo ' + agressao.join(', ')} pelo(a) ${parentesco === '' ? outroParentesco : parentesco}, ${ferida === 'null' ? 'e que não sabe se está ferida.' : ferida === 'true' ? 'e que está ferida. Precisa de apoio CBMDF.' : 'porém, não está ferida.'}
${medida === 'null' ? 'Não sabe se possui medida' : medida === 'true' ? 'Possui medida protetiva' :
        'Não possui medida protetiva'} contra o agressor.
${agressorNoLocal === 'null' ? 'Não sabe informar se o' : 'O'} agressor${agressorNoLocal === 'true' || agressorNoLocal === 'null' ? ' ' :
        ' não '}encontra-se no local${armado === 'null' ? ', e não sabe se está armado.' : armado === 'true' ? ', e está armado, equipe agir com cautela.' : '.'}
${gritos.length > 0 ? 'É possível ouvir ' + gritos.join(' e ') : ''}
${criancas === 'true' ? 'Há crianças no local' : ''}
${urgencia === 'true' ? 'ATENÇÃO: PRIORIDADE/URGÊNCIA NO ATENDIMENTO!' : ''}
`;
    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [solicitante, nomeVitima, endereco, enderecoDenunciante, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, urgencia, outroParentesco]);

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
      nomeVitima: '',
      endereco: '',
      regiaoAdministrativa: 'Plano Piloto',
      referencia: '',
      telefone: '',
      agressao: [],
      gritos: [],
      armado: '',
      parentesco: 'marido',
      medida: '',
      agressorNoLocal: '',
      ferida: '',
      criancas: '',
      urgencia: '',
      narrativa: '',
    });
    setOutroParentesco(''); // Resetar o estado de outroParentesco
    setShowOutroInput(false); // Esconder o input de outroParentesco
    document.getElementById('outlined-basic-nome').value = '';
    document.getElementById('outlined-basic-endereco').value = '';
    document.getElementById('outlined-basic-telefone').value = '';
    document.getElementById('outlined-basic-referencia').value = '';
    setSolicitante('vitima');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Role até o topo da página
  };

  return (

    <Box paddingRight={2} marginTop={4}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{
            fontWeight: 'bold',
            fontSize: 30,
          }} id="demo-controlled-radio-buttons-group">Formulário de Violência Doméstica</FormLabel>
          <Box
            sx={{
              mt: 2
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel id="demo-controlled-radio-buttons-group">Solicitante</FormLabel>
            <RadioGroup
              id="solicitante"
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
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0 }} placeholder="Nome solicitante/vitima" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeVitima', e.target.value)} label="Nome solicitante/vítima" variant="outlined" />
        </Grid>
        <Grid item xs={12} >
          {solicitante === 'denunciante' && (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">Endereço próprio ou da vítima:</FormLabel>
              <RadioGroup
                id="enderecoDenunciante"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={enderecoDenunciante}
                onChange={(e) => setEnderecoDenunciante(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                <FormControlLabel value="endereço próprio" control={<Radio />} label="Próprio" />
                <FormControlLabel value="endereço da vítima" control={<Radio />} label="Vítima" />
              </RadioGroup>
            </>)}
          <TextField sx={{ marginBottom: 0 }} placeholder="Endereço" fullWidth id="outlined-basic-endereco" label="Endereço" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
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
          <TextField sx={{ marginBottom: 0 }} placeholder="Ponto de referência" fullWidth id="outlined-basic-referencia" label="Ponto de Referência" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1 }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Telefone" name="telefone" variant="outlined" />
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
                      sx={{ fontSize: '1.5vw !important' }}
                    />
                  }
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <FormLabel id="demo-controlled-checkbox-group" style={{ color: '#990000', fontWeight: 'bold' }}>ATENÇÃO, ATENDENTE:</FormLabel>
          <Grid container spacing={1}>
            {gritosOptions.map(option => (
              <Grid item key={option} xs={6} sm={2} md={4}>
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
              sx={{ marginBottom: 2 }}
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
          {showOutroInput && (
            <FormControl fullWidth>
              <TextField
                fullWidth
                value={outroParentesco}
                onChange={(e) => setOutroParentesco(e.target.value)}
                label="Outro Parentesco"
                variant="outlined"
              />
            </FormControl>
          )}
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
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
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
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
          </RadioGroup>
          <FormLabel id="demo-controlled-radio-buttons-group">Está armado com arma de fogo/faca?</FormLabel>
          <RadioGroup
            value={armado}
            onChange={(e) => handleChange("armado", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
          </RadioGroup>

          <FormLabel id="demo-controlled-radio-buttons-group">A vítima está ferida?</FormLabel>
          <RadioGroup
            value={ferida}
            onChange={(e) => handleChange("ferida", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
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

          <FormLabel id="demo-controlled-radio-buttons-group">Urgência no atedimento?</FormLabel>
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
          <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
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