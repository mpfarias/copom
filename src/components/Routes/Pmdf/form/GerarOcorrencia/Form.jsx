import React, { useEffect, useState } from 'react'

import {
  FormControl,
  FormLabel,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Snackbar,
  Stack,
  FormControlLabel,
  Typography,
  Switch,
  Radio,
  RadioGroup

} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { listaBatalhoes } from '../../../../Consts/Batalhoes'
import { listaGraduacoes } from '../../../../Consts/Graduacoes';
import { listaNaturezas } from '../../../../Consts/NaturezasOcorrencias';
import { listaEquipes } from '../../../../Consts/Equipes';
import { listaDelegacias } from '../../../../Consts/Delegacias';
import { qtdeIndividuos } from '../RouboFurto/Const/Consts';

import { regioesAdministrativas } from '../AcidenteTransito/Const/Consts';

function GerarOcorrencia() {

  const [matricula, setMatricula] = useState('');

  const [state, setState] = useState({
    batalhao: "1º Batalhão",
    graduacao: "Sd 2ª CL",
    nome: '',
    matricula: '',
    natureza: 'Apreensão de substância entorpecente',
    regiaoAdministrativa: 'Plano Piloto',
    endereco: '',
    referencia: '',
    telefone: '',
    prefixo: '',
    equipe: 'RP',
    individuos: '',
    deslocarDelegacia: 'false',
    delegacia: '01ª DP',
    narrativa: '',
  });

  const { batalhao, graduacao, nome, natureza, regiaoAdministrativa, endereco, referencia, telefone, prefixo, equipe, individuos, deslocarDelegacia, delegacia, narrativa } = state;

  const handleChange = (field, value) => {
    if (field === 'matricula') {
      if (/^\d*$/.test(value) && value.length <= 11) {
        setMatricula(value);
        setState(prevState => ({ ...prevState, [field]: value }));
      }
    } else {
      setState(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {

    let text = `Solicitação policial para gerar número de ocorrência:

Policial: ${graduacao} ${nome}, Matrícula: ${matricula}
Unidade: ${batalhao} - ${equipe} - Prefixo ${prefixo}
Telefone: ${telefone}
${natureza} em ${endereco}, ${referencia} - ${regiaoAdministrativa}
${individuos === '-1' ? 'Nenhum indivíduo' : (individuos === '1' ? individuos + ' indivíduo' : (individuos < 5 ? individuos + ' indivíduos' : 'Mais de 5 indivíduos'))} detido${individuos === '-1' && individuos === '1' ? '' : (individuos > 1 ? 's' : '')}
${deslocarDelegacia === 'true' ? 'Equipe deslocou-se para a ' + delegacia : ''}
`;

    setState(prevState => ({ ...prevState, narrativa: text }));
  }, [graduacao, nome, endereco, referencia, regiaoAdministrativa, telefone, batalhao, prefixo, equipe, natureza, qtdeIndividuos, individuos, deslocarDelegacia, delegacia]);




  return (
    <>
      <Grid item xs={12} sm={8} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">Unidade:</FormLabel>
              <Select
                sx={{ marginBottom: 2 }}
                placeholder="Unidade:"
                value={batalhao}
                onChange={(e) => handleChange('batalhao', e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                variant="outlined"
                id="outlined-basic-batalhoes"
              >
                {listaBatalhoes
                  .map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField onKeyPress={handleKeyPress} inputProps={{ maxLength: 6 }} sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Somente números" id="outlined-basic-endereco" label="Qual o prefixo?" name="prefixo" onChange={e => handleChange('prefixo', e.target.value)} variant="outlined" />
          <CopyToClipboard text={prefixo} onCopy={() => console.log("prefixo")}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">Qual o tipo de serviço?</FormLabel>
              <Select
                sx={{ marginBottom: 2 }}
                placeholder="equipe"
                value={equipe}
                onChange={(e) => handleChange('equipe', e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                variant="outlined"
                id="outlined-basic-batalhoes"
              >
                {listaEquipes
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
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">Graduação:</FormLabel>
              <Select
                sx={{ marginBottom: 2 }}
                placeholder="Graduação:"
                value={graduacao}
                onChange={(e) => handleChange('graduacao', e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                variant="outlined"
                id="outlined-basic-batalhoes"
              >
                {listaGraduacoes
                  .map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Nome de Guerra" id="outlined-basic-endereco" label="Qual o Nome de Guerra?" name="nome" onChange={e => handleChange('nome', e.target.value)} variant="outlined" />
          <CopyToClipboard text={nome} onCopy={() => console.log("nome")}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField onKeyPress={handleKeyPress} inputProps={{ maxLength: 7 }} sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Matrícula" id="outlined-basic-endereco" label="Qual a matrícula?" name="matricula" onChange={e => handleChange('matricula', e.target.value)} variant="outlined" />
          <CopyToClipboard text={matricula} onCopy={() => console.log("matricula")}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">Selecione a Natureza da Ocorrência:</FormLabel>
              <Select
                sx={{ marginBottom: 2 }}
                placeholder="Graduação:"
                value={natureza}
                onChange={(e) => handleChange('natureza', e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                variant="outlined"
                id="outlined-basic-batalhoes"
              >
                {listaNaturezas
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
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl sx={{ width: '80%' }}>
              <FormLabel sx={{ marginBottom: 2 }} id="demo-controlled-radio-buttons-group" style={{ fontWeight: 'bold', fontSize: 18, }}>Quantos indivíduos detidos?</FormLabel>
              <RadioGroup
                aria-label="individuos"
                name="individuos"
                value={individuos}
                onChange={e => handleChange('individuos', e.target.value)}
              >
                {qtdeIndividuos.map((option) => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label === 'Não sabe' ? 'Nenhum' : option.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} marginBottom={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
              <Select
                sx={{ marginBottom: 2 }}
                placeholder="Cidade::"
                value={regiaoAdministrativa}
                onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                variant="outlined"
                id="outlined-basic-batalhoes"
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
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Endereço" id="outlined-basic-endereco" label="Qual o endereço da situação?" name="nome" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
          <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
            <Button variant="contained"
              onClick={handleClick}
              color="secondary"
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" id="outlined-basic-endereco" label="Tem ponto de referência?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
          <CopyToClipboard text={referencia} onCopy={() => console.log("referência")}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={10}>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} onChange={e => handleChange('telefone', e.target.value)} inputProps={{ maxLength: 11 }} onKeyPress={handleKeyPress} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
          <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
        Precisou deslocar-se à DP?
      </FormLabel>
      <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
        <Typography>Não</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={deslocarDelegacia === "true"}
              onChange={(e) => handleChange("deslocarDelegacia", e.target.checked ? "true" : "false")}
              name="controlled-switch"
            />
          }
          sx={{
            display: 'block',

          }}
        />
        <Typography>Sim</Typography>
      </Stack>
      {deslocarDelegacia === 'true' && (
        <Grid item xs={12} sm={8} marginBottom={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-controlled-radio-buttons-group">Qual delegacia deslocou?</FormLabel>
                <Select
                  sx={{ marginBottom: 2 }}
                  placeholder="equipe"
                  value={delegacia}
                  onChange={(e) => handleChange('delegacia', e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  variant="outlined"
                  id="outlined-basic-batalhoes"
                >
                  {listaDelegacias
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
          </Grid>
        </Grid>
      )}

      <Grid item xs={10} sx={{ mb: 4 }}>
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
    </>
  )
}

export default GerarOcorrencia