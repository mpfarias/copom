import React, { useState, useEffect } from 'react';
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
  Button,
  Alert,

} from '@mui/material';
import Snackbar from '@mui/material/Snackbar'

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { listaVitimasFemininas } from '../../../../../Consts/Vitimas';
import { listaParentesco } from '../../../../../Consts/Parentesco';
import { regioesAdministrativas } from '../../../../../Consts/RegioesAdministrativas';

export default function FormularioViolenciaDomestica() {
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

  const handleTelefoneChange = (e) => {
    const maxLength = 11;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange('telefone', e.target.value);
  };

  const [agressaoOptions, setAgressaoOptions] = useState(['ameaça', 'agressão física', 'agressão psicológica', 'xingamentos', 'cárcere privado', 'estupro', 'violação de zona de proteção']);
  const gritosOptions = ['voz masculina ao fundo', 'gritos de socorro', 'choro'];
  const [solicitante, setSolicitante] = useState('vitima');

  const [state, setState] = useState({
    nomeVitima: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    conheceVitima: '',
    agressao: [],
    gritos: [],
    armado: '',
    parentesco: 'marido',
    vitimaParentesco: 'mãe',
    medida: '',
    agressorNoLocal: '',
    ferida: '',
    gestante:'',
    criancas: '',
    urgencia: '',
    substancia: '',
    narrativa: '',
    text01: 'NATUREZA CAD: VIOLÊNCIA DOMÉSTICA',
    text02: 'NATUREZA CAD: DMPP - DESCUMPRIMENTO DE MEDIDA PROTETIVA - VIOLAÇÃO DE ZONA DE EXCLUSÃO'
  });

  const [outroParentesco, setOutroParentesco] = useState('');
  const [outraVitima, setOutraVitima] = useState('');
  const [enderecoDenunciante, setEnderecoDenunciante] = useState('');
  const [showOutroInput, setShowOutroInput] = useState(false);
  const [showOutraVitimaInput, setShowOutraVitimaInput] = useState(false);
  const { nomeVitima, conheceVitima, vitimaParentesco, endereco, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, parentesco, medida, agressorNoLocal, ferida, gestante, substancia, criancas, urgencia, narrativa, text01, text02 } = state;

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

  const handleChangeVitima = (field, value) => {
    if (field === 'outraVitima') {
      setOutraVitima(value);
      setState(prevState => ({
        ...prevState,
        vitimaParentesco: value === '' ? vitimaParentesco : value
      }));
    } else if (field === 'vitimaParentesco') {
      setShowOutraVitimaInput(value === '');
      setState(prevState => ({
        ...prevState,
        vitimaParentesco: value === '' ? outraVitima : value
      }));
    } else {
      setState(prevState => ({ ...prevState, [field]: value }));
    }
  };


  useEffect(() => {
    const text = `Tipo de solicitante: ${solicitante === 'vitima' ? 'Vítima' : 'Denunciante'}

${solicitante === 'vitima' ? 'A pessoa que ligou é VÍTIMA de violencia doméstica.' : 'A pessoa que ligou está DENUNCIANDO uma violencia doméstica.'} 
NOME: ${nomeVitima.toUpperCase()}, ${solicitante === 'vitima' ? ' RESIDENTE EM: ' + endereco.toUpperCase() + ', RA: ' + regiaoAdministrativa.toUpperCase() + (referencia === '' ? '' : ', PONTO DE REFERÊNCIA: ') + referencia.toUpperCase() + ', TELEFONE: ' + telefone + ', informa que está sendo vítima de ' + agressao.join(', ') :

        solicitante === 'denunciante' ? 'telefone: ' + telefone + ', ' + (conheceVitima === 'não' && enderecoDenunciante === 'endereço próprio' ? 'residente em: ' + endereco.toUpperCase() + ', ' + regiaoAdministrativa.toUpperCase() + ', ' + referencia.toUpperCase() + ', informa que está presenciando uma pessoa ' + (agressao.includes('pedido de socorro') ? ' gritando por socorro, possivelmente sendo agredida' : 'sofrendo ' + agressao.join(', ')) : conheceVitima === 'não' && enderecoDenunciante === 'endereço da vítima' ? ' uma pessoa, residente em ' + endereco.toUpperCase() + ', ' + regiaoAdministrativa.toUpperCase() + ', ' + referencia.toUpperCase() + (agressao.includes('pedido de socorro') ? ' pedindo por socorro, possivelmente sendo agredida' : ', está sendo vítima de ' + agressao.join(', ')) :
          (conheceVitima === 'sim' && enderecoDenunciante === 'endereço da vítima' ? 'informa que sua ' + (vitimaParentesco === '' ? outraVitima : vitimaParentesco) + ', residente em ' + endereco.toUpperCase() + ', ' + regiaoAdministrativa.toUpperCase() + ', ' + referencia.toUpperCase() + ', ' + 'está sofrendo ' + agressao.join(', ') :
            (conheceVitima === 'sim' && enderecoDenunciante === 'endereço próprio' ? 'residente em ' + endereco.toUpperCase() + ', ' + regiaoAdministrativa.toUpperCase() + ', ' + referencia.toUpperCase() + ', informa que sua ' + (vitimaParentesco === '' ? outraVitima : vitimaParentesco) + (agressao.includes('pedido de socorro') ? ' está pedindo socorro, possivelmente sendo agredida' : ' está sofrendo ' + agressao.join(', ')) : '')



          )) : ''} pelo(a) ${parentesco === '' ? outroParentesco : parentesco}, ${ferida === 'null' ? 'e que não sabe se está ferida.' : ferida === 'true' ? 'e que está ferida. Precisa de apoio CBMDF.' : 'porém, não está ferida.'}
 ${medida === 'null' ? '* Não sabe se possui medida' : medida === 'true' ? '* Possui medida protetiva' :
        'Não possui medida protetiva'} contra o agressor.
 ${agressorNoLocal === 'null' ? '* Não sabe informar se o' : '* O'} agressor${agressorNoLocal === 'true' || agressorNoLocal === 'null' ? ' ' :
        ' não '}encontra-se no local${armado === 'null' ? ', e não sabe se está armado.' : armado === 'true' ? ', e está armado, equipe agir com cautela.' : '.'}
 ${gritos.length > 0 ? '* É possível ouvir ' + gritos.join(' e ') : ''}
 ${criancas === 'true' ? '* Há crianças no local' : ''}
 ${substancia === 'true' ? '* Agressor sob influência de drogas/álcool.' : (substancia === 'não' ? '' : '')}
 ${urgencia === 'true' ? '* ATENÇÃO: PRIORIDADE/URGÊNCIA NO ATENDIMENTO!' : ''}
 ${gestante === 'true' ? '* Solicitante está GESTANTE' : ''}
`;
const formattedText = text.split('\n').map(line => line.trim()).filter(line => line !== '').join('\n');
    setState(prevState => ({ ...prevState, narrativa: formattedText }));
  }, [solicitante, nomeVitima, conheceVitima, vitimaParentesco, endereco, outraVitima, enderecoDenunciante, referencia, regiaoAdministrativa, telefone, agressao, gritos, armado, gestante, vitimaParentesco, parentesco, medida, agressorNoLocal, ferida, criancas, urgencia, substancia, outroParentesco]);

  useEffect(() => {
    if (solicitante === 'denunciante' && !agressaoOptions.includes('pedido de socorro')) {
      setAgressaoOptions(prevOpcoes => [...prevOpcoes, 'pedido de socorro']);
    } else if (solicitante !== 'denunciante') {
      setAgressaoOptions(prevOpcoes =>
        prevOpcoes.filter(opcao => opcao !== 'pedido de socorro')
      );
    }
  }, [solicitante, agressaoOptions]);

 

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
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual o tipo de solicitante ?</FormLabel>
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
          <CopyToClipboard text={nomeVitima} onCopy={() => console.log("nomeVitima")}>
            <Button variant="contained"
              color="secondary"
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12} >
          {solicitante === 'denunciante' && (
            <>
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Conhece a vítima?</FormLabel>
              <RadioGroup

                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={conheceVitima}
                onChange={(e) => handleChange('conheceVitima', e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                <FormControlLabel value="não" control={<Radio />} label="Não" />
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />

              </RadioGroup>
              {conheceVitima === 'sim' && (
                <>
                  <Grid item xs={12} sm={7}>
                    <FormControl fullWidth>
                      <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Quem é a vítima?</FormLabel>
                      <Select
                        sx={{ marginBottom: 2 }}
                        placeholder="Parentesco"
                        value={vitimaParentesco}
                        onChange={(e) => handleChangeVitima('vitimaParentesco', e.target.value)}
                        IconComponent={KeyboardArrowDownIcon}
                        variant="outlined"
                      >
                        {listaVitimasFemininas
                          .slice()
                          .sort((a, b) => a.label.localeCompare(b.label))
                          .map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    {showOutraVitimaInput && (
                      <FormControl fullWidth>
                        <TextField
                          sx={{ marginBottom: 5 }}
                          fullWidth
                          value={outraVitima}
                          onChange={(e) => setOutraVitima(e.target.value)}
                          label="Outra Vítima"
                          variant="outlined"
                        />
                      </FormControl>
                    )}
                  </Grid>
                </>
              )}
              <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-row-radio-buttons-group-label">O endereço é próprio ou da vítima ?</FormLabel>
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
          <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Endereço" id="outlined-basic-endereco" label="Qual o endereço da violência ?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
          <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
            <Button variant="contained"
              color="secondary"
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual é a cidade da vítima ?</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Cidade:"
              value={regiaoAdministrativa}
              onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
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
        <Grid item xs={4}>
          <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
            <Button variant="contained"
              color="secondary"
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginTop: '10%' }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Qual é o Ponto de Referência ?" fullWidth id="outlined-basic-referencia" label="Qual ponto de referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
          <CopyToClipboard text={referencia} onCopy={() => console.log("Referencia copiada")}>
            <Button variant="contained"
              color="secondary"

              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual é o telefone do solicitante ?" name="telefone" variant="outlined" />
          <CopyToClipboard text={telefone} onCopy={() => console.log("Telefone copiada")}>
            <Button variant="contained"
              color="secondary"

              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-checkbox-group">Qual é o tipo de agressão ?</FormLabel>
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
          <FormLabel id="demo-controlled-checkbox-group" style={{ color: '#990000', fontWeight: 'bold', fontSize: 16 }}>ATENÇÃO ATENDENTE, você escuta alguma coisa no fundo da conversa ?</FormLabel>
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
            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Qual o grau parentesco do agressor ?</FormLabel>
            <Select
              sx={{ marginBottom: 2 }}
              placeholder="Parentesco"
              value={parentesco}
              onChange={(e) => handleChange('parentesco', e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              variant="outlined"
            >
              {listaParentesco
                .map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Vítima possui medida protetiva contra o agressor ?</FormLabel>
          <RadioGroup
            row
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">O agressor encontra-se no local ?</FormLabel>
          <RadioGroup
            row
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
          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">O agressor está armado com arma de fogo/faca ?</FormLabel>
          <RadioGroup
            row
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">A vítima está ferida ?</FormLabel>
          <RadioGroup
            row
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

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">A vítima está gestante ?</FormLabel>
          <RadioGroup
            row
            value={gestante}
            onChange={(e) => handleChange("gestante", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
          </RadioGroup>

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Tem criança envolvida na agressão ?</FormLabel>
          <RadioGroup
            row
            value={criancas}
            onChange={(e) => handleChange("criancas", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
          </RadioGroup>

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Agressor sob influência de substância entorpecente/álcool ?</FormLabel>
          <RadioGroup
            row
            value={substancia}
            onChange={(e) => handleChange("substancia", e.target.value)}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            sx={{ marginBottom: 4 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="null" control={<Radio />} label="Não sabe" />
          </RadioGroup>

          <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group">Urgência no atedimento?</FormLabel>
          <RadioGroup
            row
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
          {agressao.includes('violação de zona de proteção') ? (
            <Alert sx={{ mb: 4 }} severity="error">{text02}</Alert>
          ) : (
            agressao.length > 0 && <Alert sx={{ mb: 4 }} severity="error">{text01}</Alert>
          )}
          <TextField
            className="narrativa-text"
            sx={{
              backgroundColor: 'rgba(0, 200, 0, 0.1)',
            }}
            multiline
            fullWidth
            value={state.narrativa}
            InputProps={{
              disabled: true
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 8 }} sm={6}>
          <CopyToClipboard text={narrativa} onCopy={() => console.log("narrativa")}>
            <Button variant="contained"
              color="secondary"
              onClick={handleClick}
              style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto
            </Button>
          </CopyToClipboard>
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
      </Grid >
    </Box >

  );
}