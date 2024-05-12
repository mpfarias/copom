import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Stack,
  Alert
} from '@mui/material';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function RouboFurto() {
  const [local, setLocal] = useState('');
  const [assinatura, setAssinatura] = useState('');

  const [state, setState] = useState({
    assinatura: '',
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    text01: 'Solicitante informa perturbação do sossego, porém não quis se identificar. Foi orientado a ligar para a Ouvidora Geral do GDF (162).',
    aviso01: 'ATENÇÃO!! VIATURA NÃO DEVE SER ACIONADA. ENCERRE A OCORRÊNCIA COMO INFORMAÇÃO.',
    text02: 'Informe ao solicitante que o som alto em residência é infração do artigo 42 da Lei de Contravenções Penais, e que para que a Polícia Militar possa atuar, é necessária a assinatura do Termo Circunstanciado de Ocorrência, de acordo com o TJDFT (ACÓRDÃO Nº 1425679). Pergunte se o solicitante deseja assinar o Termo Circunstanciado de Ocorrência.',
    text03: 'Informe ao solicitante que a Polícia Militar somente pode agir na responsabilização criminal do autor, e para isso precisa de vítima. Se o solicitante não quiser assinar o TCO, peça para ligar 162 (OUVIDORIA GDF). Clique no botão "COPIAR TEXTO" e cole (CTRL + V) no campo "Narrativa" do CAD.',
    text04: 'RESPONSABILIDADE DO DETRAN - FAÇA O REGISTRO NORMALMENTE - A OCORRÊNCIA SERÁ ENCAMINHADA AO DETRAN PELO DESPACHANTE.',
    text05: "Informe ao solicitante que a denúncia deverá ser feita no telefone 162, pois a responsabilidade para atuar em estabelecimento comercial é do IBRAM.",
    text07: "Solicitante informa som alto no local, pede PMDF no local pois TEM INTERESSE EM ASSINAR O TCO.",
    text06: "Solicitante informa som alto em estabelecimento comercial. Foi orientado a ligar na Ouvidora do GDF (162).",
  });

  const {
    telefone,
    regiaoAdministrativa,
    text01,
    aviso01,
    text02,
    text03,
    text04,
    text05,
    text07,
    text06,
  } = state;

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopyField = (fieldName) => {
    const fieldValue = state[fieldName];
    navigator.clipboard.writeText(fieldValue);
  };

  const handleRadioChangePerturbacao = (event) => {
    setAssinatura(event.target.value);
  };

  const handleTelefoneChange = (e, field) => {
    const maxLength = 11;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange(field, e.target.value);
  };

  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleResetForm = () => {
    setState({
      assinatura: '',
      nome: '',
      endereco: '',
      regiaoAdministrativa: 'Plano Piloto',
      referencia: '',
      telefone: '',
      text01,
      aviso01,
      text02,
      text03,
      text04,
      text05,
      text07,
      text06
    });

    setLocal('');
    setAssinatura('');
    document.getElementById('outlined-basic-nome').value = '';
    document.getElementById('outlined-basic-endereco').value = '';
    document.getElementById('outlined-basic-telefone').value = '';
    document.getElementById('outlined-basic-referencia').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <Box paddingRight={2} marginTop={4} marginBottom={8}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 30 }} id="demo-controlled-radio-buttons-group">Roubo/Furto</FormLabel>
          <Box sx={{ mt: 2 }} noValidate autoComplete="off">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Local:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              >
                <FormControlLabel value="residência" control={<Radio />} label="Residência" />
                <FormControlLabel value="automóvel" control={<Radio />} label="Automóvel" />
                <FormControlLabel value="estabelecimento comercial" control={<Radio />} label="Estabelecimento Comercial" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {local === 'residência' && (
            <>
              <Alert severity="warning">{text02}</Alert>
              <FormLabel id="demo-row-radio-buttons-group-label">Solicitante deseja assinar?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={assinatura}
                onChange={handleRadioChangePerturbacao}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>
              <Grid item xs={12}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  {assinatura === 'sim' && (
                    <>
                      <Grid item xs={12}>
                        <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Nome solicitante ?" variant="outlined" />
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyField('nome')}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Endereço" fullWidth id="outlined-basic-endereco" onChange={e => handleChange('endereco', e.target.value)} label="Endereço ?" variant="outlined" />
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyField('endereco')}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </Grid>
                      <FormControl fullWidth>
                        <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                        <Select
                          id="regiaoAdministrativa"
                          sx={{ marginBottom: 2, width: '50%' }}
                          placeholder="regiaoAdministrativa:"
                          value={regiaoAdministrativa}
                          IconComponent={KeyboardArrowDownIcon}
                          variant="outlined"
                          onChange={e => handleChange('regiaoAdministrativa', e.target.value)}
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
                      <Grid item xs={12}>
                        <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" fullWidth id="outlined-basic-referencia" label="Ponto de Referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyField('referencia')}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                      <InputMask
                          mask="(99) 99999-9999"
                          value={telefone}
                          onChange={e => handleTelefoneChange(e,'telefone')}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              sx={{ marginBottom: 1, marginRight: 2, width: '80%' }}
                              fullWidth
                              id="outlined-basic-telefone"
                              label="Telefone ?"
                              name="telefone"
                              variant="outlined"
                            />
                          )}
                        </InputMask>
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyField('telefone')}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                        <TextField
                          sx={{
                            backgroundColor: 'rgba(0, 200, 0, 0.1)',
                          }}
                          multiline
                          fullWidth
                          value={text07}
                          InputProps={{
                            disabled: true
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyText(text07)}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
                        <Button variant="contained"
                          color="secondary"
                          onClick={handleResetForm}
                          style={{ backgroundColor: '#000066', color: '#FFFFFF' }}>Limpar Formulário</Button>
                      </Grid>
                    </>
                  )}
                  {assinatura === 'não' && (
                    <>
                      <Alert severity="warning">{text03}</Alert>
                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                        <TextField
                          sx={{
                            backgroundColor: 'rgba(0, 200, 0, 0.1)',
                          }}
                          multiline
                          fullWidth
                          value={text01}
                          InputProps={{
                            disabled: true
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
                        <Button variant="contained"
                          color="secondary"
                          onClick={() => handleCopyText(text01)}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
                      </Grid>
                    </>
                  )}

                </Stack>
              </Grid>
            </>
          )}
          {local === 'automóvel' && <Alert severity="warning">{text04} </Alert>}
          {local === 'estabelecimento comercial' && (
            <>
              <Alert severity="warning">{text05} </Alert>
              <Alert severity="warning">{aviso01}</Alert>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                <TextField
                  sx={{
                    backgroundColor: 'rgba(0, 200, 0, 0.1)',
                  }}
                  multiline
                  fullWidth
                  value={text06}
                  InputProps={{
                    disabled: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
                <Button variant="contained"
                  color="secondary"
                  onClick={() => handleCopyText(text06)}
                  style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
              </Grid>
            </>)
          }
        </Stack>
      </Grid >
    </Box>

  );
}
