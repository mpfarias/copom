import React, { useState, useEffect } from 'react';

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

import Snackbar from '@mui/material/Snackbar'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SomAlto() {
  const [open, setOpen] = useState(false);
  const [cpf, setCPF] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [cpfValido, setCpfValido] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const regioesAdministrativas = [
    { value: 'Água Quente', label: 'Água Quente' },
    { value: 'Águas Claras', label: 'Águas Claras' },
    { value: 'Arapoanga', label: 'Arapoanga' },
    { value: 'Arniqueira', label: 'Arniqueira' },
    { value: 'Brazlândia', label: 'Brazlândia' },
    { value: 'Candangolândia', label: 'Candangolândia' },
    { value: 'Ceilândia', label: 'Ceilândia' },
    { value: 'Cruzeiro', label: 'Cruzeiro' },
    { value: 'Estrutural', label: 'Estrutural' },
    { value: 'Fercal', label: 'Fercal' },
    { value: 'Gama', label: 'Gama' },
    { value: 'Guará', label: 'Guará' },
    { value: 'Itapoã', label: 'Itapoã' },
    { value: 'Jardim Botânico', label: 'Jardim Botânico' },
    { value: 'Lago Norte', label: 'Lago Norte' },
    { value: 'Lago Sul', label: 'Lago Sul' },
    { value: 'Núcleo Bandeirante', label: 'Núcleo Bandeirante' },
    { value: 'Octogonal', label: 'Octogonal' },
    { value: 'Paranoá', label: 'Paranoá' },
    { value: 'Park Way', label: 'Park Way' },
    { value: 'Planaltina', label: 'Planaltina' },
    { value: 'Por do Sol', label: 'Por do Sol' },
    { value: 'Recanto das Emas', label: 'Recanto das Emas' },
    { value: 'Riacho Fundo', label: 'Riacho Fundo' },
    { value: 'Riacho Fundo II', label: 'Riacho Fundo II' },
    { value: 'Samambaia', label: 'Samambaia' },
    { value: 'Santa Maria', label: 'Santa Maria' },
    { value: 'São Sebastião', label: 'São Sebastião' },
    { value: 'SCIA', label: 'SCIA' },
    { value: 'SIA', label: 'SIA' },
    { value: 'Sobradinho', label: 'Sobradinho' },
    { value: 'Sobradinho II', label: 'Sobradinho II' },
    { value: 'Sol Nascente', label: 'Sol Nascente' },
    { value: 'Sudoeste', label: 'Sudoeste' },
    { value: 'Taguatinga', label: 'Taguatinga' },
    { value: 'Varjão', label: 'Varjão' },
    { value: 'Vicente Pires', label: 'Vicente Pires' },
    { value: 'Plano Piloto', label: 'Plano Piloto' }]

  const [local, setLocal] = useState('');
  const [assinatura, setAssinatura] = useState('');

  const [state, setState] = useState({
    assinatura: '',
    nome: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    cpf: '',
    text01: 'Solicitante informa perturbação do sossego, porém não quis se identificar. Foi orientado a ligar para a Ouvidora Geral do GDF (162).',
    aviso01: 'ATENÇÃO!! VIATURA NÃO DEVE SER ACIONADA. ENCERRE A OCORRÊNCIA COMO INFORMAÇÃO.',
    text02: 'Informe ao solicitante que o som alto em residência é infração do artigo 42 da Lei de Contravenções Penais, e que para que a Polícia Militar possa atuar, é necessária a assinatura do Termo Circunstanciado de Ocorrência, de acordo com o TJDFT (ACÓRDÃO Nº 1425679). Pergunte se o solicitante deseja assinar o Termo Circunstanciado de Ocorrência.',
    text03: 'Informe ao solicitante que a Polícia Militar somente pode agir na responsabilização criminal do autor, e para isso precisa de vítima. Se o solicitante não quiser assinar o TCO, peça para ligar 197, para denúncia anônima, ou 162 (OUVIDORIA GDF). Clique no botão "COPIAR TEXTO" e cole (CTRL + V) no campo "Narrativa" do CAD.',
    text04: 'RESPONSABILIDADE DO DETRAN - FAÇA O REGISTRO NORMALMENTE - A OCORRÊNCIA SERÁ ENCAMINHADA AO DETRAN PELO DESPACHANTE.',
    text05: 'Informe ao solicitante que a denúncia deverá ser feita no telefone 162, pois a responsabilidade para atuar em estabelecimento comercial é do IBRAM.',
    text06: 'Solicitante informa som alto em estabelecimento comercial. Foi orientado a ligar na Ouvidora do GDF (162).',
    text07: '',
    text08: '',
    text09: 'NATUREZA CAD: PERTURBAÇÃO DO TRABALHO OU DO SOSSEGO ALHEIO - ART. 42 LCP',
    text10: 'NATUREZA CAD: SOM ALTO - AUTOMOTIVO ART. 228 CTB'
  });

  const {
    nome,
    telefone,
    endereco,
    regiaoAdministrativa,
    referencia,
    text01,
    aviso01,
    text02,
    text03,
    text04,
    text05,
    text07,
    text06,
    text08,
    text09,
    text10
  } = state;

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

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11); 
    }
    setCPF(value);

    if (value.length === 11) {
      if (!validateCPF(value)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError('');
      }
    } else {
      setCpfError('');
    }
  };

  useEffect(() => {
    if (cpf.length === 11 && validateCPF(cpf)) {
      setCpfValido(true);
    } else {
      setCpfValido(false);
    }
    setState(prevState => ({
      ...prevState,
      text07: `Solicitante${nome === '' ? '' : ': ' + nome.toUpperCase()}, 
${endereco === '' ? '' : 'Endereço: ' + endereco.toUpperCase() + ','} 
${telefone === '' ? '' : 'Telefone: ' + telefone + ','}
CPF:  ${cpfValido ? cpf : 'CPF inválido'},
Cidade: ${regiaoAdministrativa.toUpperCase()}, ponto de referência: ${referencia.toUpperCase()}.
Informa som alto no local, pede PMDF pois TEM INTERESSE EM ASSINAR O TCO.`,

      text08: `Solicitante ${nome.toUpperCase()},
endereço: ${endereco.toUpperCase()},
cidade: ${regiaoAdministrativa.toUpperCase()},
ponto de referência: ${referencia.toUpperCase()}
telefone: ${telefone} informa que tem som automotivo no local, pede apoio do DETRAN  `,

    }));
  }, [nome, endereco, telefone, cpf, regiaoAdministrativa, referencia, cpfValido]);

  const renderOpcoesAssinatura = () => (
    <>
      {local === 'automóvel' ? (
        <Alert severity="error" sx={{width:'51%'}}>{text10}</Alert>
      ) : (
        <Alert severity="error" sx={{width:'51%'}}>{text09}</Alert>)
      }
      <Grid item xs={8}>
        <TextField
          sx={{ marginBottom: 0, marginRight: 2, width: '80%' }}
          placeholder="Qual o nome do solicitante ?"
          fullWidth
          id="outlined-basic-nome"
          onChange={(e) => handleChange('nome', e.target.value)}
          label="Qual o nome do solicitante ?"
          variant="outlined"
        />
        <CopyToClipboard text={nome} onCopy={() => console.log('Nome copiado!')}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Grid>

      <Grid item xs={8}>
        <TextField
          sx={{ marginBottom: 0, marginRight: 2, width: '80%' }}
          placeholder="Qual endereço do solicitante ?"
          fullWidth
          id="outlined-basic-endereco"
          onChange={(e) => handleChange('endereco', e.target.value)}
          label="Qual endereço do solicitante ?"
          variant="outlined"
        />
        <CopyToClipboard text={endereco} onCopy={() => console.log('Endereço copiado!')}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Grid>

      <Grid item xs={8}>
        <TextField
          sx={{ marginBottom: 1, marginRight: 2, width: '80%' }}
          fullWidth
          type='number'
          id="outlined-basic-telefone"
          label="Qual o telefone do solicitante ?"
          name="telefone"
          variant="outlined"
          value={telefone}
          onChange={(e) => handleTelefoneChange(e, 'telefone')}
        />
        <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Grid>

      <Grid item xs={8}>
        <TextField
          className="disable-scroll"
          sx={{ marginBottom: 0, marginRight: 2, width: '80%' }}
          placeholder="Qual o CPF do solicitante ?"
          fullWidth
          value={cpf}
          id="outlined-basic-cpf"
          onChange={handleCPFChange}
          label="Qual o CPF do solicitante ?"
          variant="outlined"
          error={!!cpfError}
          helperText={cpfError}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 11);
          }}
          inputProps={{
            maxLength: 11,
          }}
        />
        <CopyToClipboard text={cpf} onCopy={() => console.log('CPF copiado!')}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Grid>
      
        <Grid item xs={8}>
            <FormLabel style={{fontSize: 16, }} id="demo-controlled-radio-buttons-group">Qual a cidade da perturbação ?</FormLabel>
            <Select
              id="regiaoAdministrativa"
              sx={{ marginBottom: 0, marginRight: 2, width: '80%' }}
              placeholder="regiaoAdministrativa:"
              value={regiaoAdministrativa}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
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
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF' }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      
      <Grid item xs={8}>
        <TextField
          sx={{ marginBottom: 0, marginRight: 2, width: '80%' }}
          placeholder="Qual o ponto de referência ?"
          fullWidth
          id="outlined-basic-referencia"
          label="Qual o ponto de referência ?"
          name="referencia"
          onChange={(e) => handleChange('referencia', e.target.value)}
          variant="outlined"
        />
        <CopyToClipboard text={referencia} onCopy={() => console.log('Referência copiado!')}>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF'}}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Grid>

      <Grid item xs={8} sx={{ mt: 1 }}>
        <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
        <TextField
          sx={{
            backgroundColor: 'rgba(0, 200, 0, 0.1)',
          }}
          multiline
          fullWidth
          value={assinatura === 'sim' && local === 'residência' ? text07 : text08}
          InputProps={{
            disabled: true
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
        <CopyToClipboard text={assinatura === 'sim' && local === 'residência' ? text07 : text08} onCopy={() => console.log('Narrativa copiada!')}>
          <Button variant="contained"
            color="secondary"
            onClick={handleClick}
            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '80%', marginBottom: 15 }}>Copiar texto</Button>
        </CopyToClipboard>
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
    </>
  );

  return (
    <Box paddingRight={2} marginTop={4} marginBottom={8}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{
            fontWeight: 'bold',
            fontSize: 30,
          }} id="demo-controlled-radio-buttons-group">PERTURBAÇÃO DO SOSSEGO</FormLabel>
          <Box sx={{ mt: 2 }} noValidate autoComplete="off">
            <FormControl>
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-row-radio-buttons-group-label">Qual o tipo de local da perturbação ?</FormLabel>
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
              <Alert severity="warning" sx={{width:'51%'}}>{text02}</Alert>
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-row-radio-buttons-group-label">Solicitante deseja assinar TCO/PMDF ?</FormLabel>
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
                  {assinatura === 'sim' && renderOpcoesAssinatura()}
                  {assinatura === 'não' && (
                    <>
                      <Alert severity="warning" sx={{width:'51%'}}>{text03}</Alert>
                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
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
                      <CopyToClipboard text={text01} onCopy={() => console.log('Narrativa copiada!')}>
                        <Button variant="contained"
                          color="secondary"
                          onClick={handleClick}
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
                      </CopyToClipboard>
                      <Snackbar
                        sx={{
                          top: '70%',
                          marginLeft: '30%'
                        }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}>
                        <Alert severity="warning" sx={{width:'51%'}}>Texto COPIADO</Alert>
                      </Snackbar>
                    </>
                  )}
                </Stack>
              </Grid>
            </>
          )}
          {local === 'automóvel' && (
            <>
              <Alert severity="warning" sx={{width:'51%'}}>{text04} </Alert>
              {renderOpcoesAssinatura()}
            </>
          )
          }
          {local === 'estabelecimento comercial' && (
            <>
              <Alert severity="warning" sx={{width:'51%'}}>{text05} </Alert>
              <Alert severity="warning" sx={{width:'51%'}}>{aviso01}</Alert>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                <TextField
                  sx={{
                    backgroundColor: 'rgba(0, 200, 0, 0.1)',
                    width:'70%'
                  }}
                  multiline
                  value={text06}
                  InputProps={{
                    disabled: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 8}} sm={6}>
                <CopyToClipboard text={text06} onCopy={() => console.log('Narrativa copiada!')}>
                  <Button variant="contained"
                    color="secondary"
                    onClick={handleClick}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '80%', marginBottom: 15 }}>Copiar texto</Button>
                </CopyToClipboard>
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
            </>)
          }
        </Stack>

      </Grid >
    </Box>

  );
}
