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

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FormularioViolenciaDomestica() {
  const handleCopy = () => {
    const narrativa = state.narrativa;
    navigator.clipboard.writeText(narrativa);
  };

  const handleCopyNome = () => {
    const nomeVitima = state.nomeVitima;
    navigator.clipboard.writeText(nomeVitima);
  };


  const handleCopyEndereco = () => {
    const endereco = state.endereco;
    navigator.clipboard.writeText(endereco);
  };


  const handleCopyReferencia = () => {
    const referencia = state.referencia;
    navigator.clipboard.writeText(referencia);
  };

  const handleCopyTelefone = () => {
    const telefone = state.telefone;
    navigator.clipboard.writeText(telefone);
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


  const agressaoOptions = ['ameaça', 'xingamentos', 'agressão física', 'agressão psicológica', 'violação de zona de proteção'];
  const gritosOptions = ['voz masculina ao fundo', 'gritos de socorro', 'choro'];
  const [solicitante, setSolicitante] = useState('vitima');
  const [state, setState] = useState({ nomeVitima: '',  endereco: '',  regiaoAdministrativa: 'Plano Piloto',  referencia: '',  telefone: '',  agressao: [],  gritos: [],  armado: '',  parentesco: 'marido',  medida: '',  agressorNoLocal: '',  ferida: '',  criancas: '',  urgencia: '',  narrativa: ''});
  const [outroParentesco, setOutroParentesco] = useState('');
  const [enderecoDenunciante, setEnderecoDenunciante] = useState('');
  const [showOutroInput, setShowOutroInput] = useState(false);
  const { nomeVitima, endereco, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, urgencia, narrativa } = state;
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
      updatedValue = state[field].filter(item => item !== value); // Remove o valor se já estiver selecionado
    } else {
      updatedValue = [...state[field], value]; // Adiciona o valor se ainda não estiver selecionado
    }
    setState(prevState => ({ ...prevState, [field]: updatedValue }));
  };

  useEffect(() => {
    const text = `Tipo de solicitante: ${solicitante === 'vitima' ? 'Vítima' : 'Denunciante'}

* A pessoa de NOME: ${nomeVitima}, ${solicitante === 'vitima' ? ' RESIDENTE EM: ' + endereco + ', RA: ' + regiaoAdministrativa + ', PONTO DE REFERÊNCIA: ' + referencia + ', TELEFONE: ' + telefone + ', informa que está sendo vítima de ' + agressao.join(', ') :

          solicitante === 'denunciante' && enderecoDenunciante === 'endereço próprio' ? ' RESIDENTE EM: ' + endereco + ', RA: ' + regiaoAdministrativa + ', PONTO DE REFERÊNCIA: ' + referencia + ', TELEFONE: ' + telefone + ', informa que está presenciando uma pessoa sendo vítima de: ' + agressao.join(', ') :
          solicitante === 'denunciante' && enderecoDenunciante === 'endereço da vítima' ? 'informa que uma pessoa está sendo vítima de: ' + agressao.join(', ') + ', e que reside em: ' + endereco + ', RA: ' + regiaoAdministrativa + ', PONTO DE REFERÊNCIA: ' + referencia + ', TELEFONE: ' + telefone + ", possivelmente" :
            ''} pelo(a): ${parentesco === '' ? outroParentesco : parentesco}, ${ferida === 'null' ? 'e que não sabe se está ferida.' : ferida === 'true' ? 'e que está ferida. Precisa de apoio CBMDF.' : 'porém, não está ferida.'}
 ${medida === 'null' ? '* Não sabe se possui medida' : medida === 'true' ? '* Possui medida protetiva' :
        'Não possui medida protetiva'} contra o agressor.
 ${agressorNoLocal === 'null' ? '* Não sabe informar se o' : 'O'} agressor${agressorNoLocal === 'true' || agressorNoLocal === 'null' ? ' ' :
        ' não '}encontra-se no local${armado === 'null' ? ', e não sabe se está armado.' : armado === 'true' ? ', e está armado, equipe agir com cautela.' : '.'}
 ${gritos.length > 0 ? '* É possível ouvir ' + gritos.join(' e ') : ''}
 ${criancas === 'true' ? '* Há crianças no local' : ''}
 ${urgencia === 'true' ? '* ATENÇÃO: PRIORIDADE/URGÊNCIA NO ATENDIMENTO!' : ''}
`;
    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [solicitante, nomeVitima, endereco, enderecoDenunciante, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, criancas, urgencia, outroParentesco]);

  return (

    <Box paddingRight={2} marginTop={4}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{
            fontWeight: 'bold',
            fontSize: 30,
          }} id="demo-controlled-radio-buttons-group">VIOLÊNCIA DOMÉSTICA</FormLabel>
          <Box
            sx={{
              mt: 2
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Qual o tipo de solicitante ?</FormLabel>
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
          <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Qual o nome solicitante/vitima ?" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nomeVitima', e.target.value)} label="Qual o nome solicitante/vitima ?" variant="outlined" />
          <Button variant="contained"
            color="secondary"
            onClick={handleCopyNome}
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
          </Button>
        </Grid>
        <Grid item xs={12} >
          {solicitante === 'denunciante' && (
            <>
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-row-radio-buttons-group-label">Qual Endereço próprio ou da vítima ?</FormLabel>
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

          <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Endereço" id="outlined-basic-endereco" label="Qual endereço da violência ?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />

          <Button variant="contained"
            color="secondary"
            onClick={handleCopyEndereco}
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
          </Button>
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Qual é a cidade da vítima ?</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Cidade:"
              value={regiaoAdministrativa}
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            > <MenuItem value="Água Quente">Água Quente</MenuItem>
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
          <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Qual é o Ponto de Referência ?" fullWidth id="outlined-basic-referencia" label="Qual é o Ponto de Referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
          <Button variant="contained"
            color="secondary"
            onClick={handleCopyReferencia}
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual é o Telefone do solicitante ?" name="telefone" variant="outlined" />
          <Button variant="contained"
            color="secondary"
            onClick={handleCopyTelefone}
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-checkbox-group">Qual é o tipo de agressão ?</FormLabel>
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
        <Grid item xs={10}>
          <FormLabel id="demo-controlled-checkbox-group" style={{ color: '#990000', fontWeight: 'bold' , fontSize: 16 }}>ATENÇÃO ATENDENTE, você escuta alguma coisa no fundo da conversa ?</FormLabel>
          <Grid container spacing={0}>
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
        <Grid item xs={12} sm={7}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Qual o grau parentesco da vítima com o agressor ?</FormLabel>
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">vítima Possui medida protetiva contra o agressor ?</FormLabel>
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">O agressor encontra-se no local ?</FormLabel>
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">O agressor sstá armado com arma de fogo/faca ?</FormLabel>
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">A vítima está ferida ?</FormLabel>
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18,}} id="demo-controlled-radio-buttons-group">Tem criança envolvida na agressão ?</FormLabel>
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
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
          
        </Grid>
      </Grid >
    </Box>

  );
}