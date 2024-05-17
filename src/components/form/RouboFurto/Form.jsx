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
  Checkbox,
  FormGroup
} from '@mui/material';

import Divider from '@mui/joy/Divider';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputMask from 'react-input-mask';

import { cores, qtdeIndividuos, regioesAdministrativas, caracteristicasOption, opcoesParteDeBaixo, opcoesParteDeCima, opcoesCalcado, opcoesArma, opcoesCabelo } from './Const/Consts';
import { handleCopy, handleTelefoneChange, handleResetForm } from './Function/Functions';

export default function RouboFurto() {

  const [objeto, setObjeto] = useState('');
  const [solicitante, setSolicitante] = useState('vitima');
  const [caracteristicasIndividuos, setCaracteristicasIndividuos] = useState([]);


  const [state, setState] = useState({
    solicitante:'Vítima',
    nome: '',
    tipo: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    placa: '',
    modelo: '',
    individuos: 'não sabe',
    corCamisetas: ['clara'],
    corCalcas: ['clara'],
    caracteristicas: [],
    narrativa: ''
  });

  const {
    tipo,
    nome,
    endereco,
    regiaoAdministrativa,
    referencia,
    telefone,
    placa,
    modelo,
    individuos,
    corCalcas,
    caracteristicas,
    narrativa
  } = state;

  const [outrasCaracteristicas, setOutrasCaracteristicas] = useState(Array.from({ length: parseInt(individuos || 0) }, () => ''));
  const [showOutraCaracteristica, setShowOutraCaracteristica] = useState(Array.from({ length: parseInt(individuos) }, () => false));

  const handleChange = (field, value) => {

    setState(prevState => ({ ...prevState, [field]: value }));

  };

  // Função para lidar com a alteração de corRoupa de cada indivíduo

  

  const [selectedOptionCima, setSelectedOptionCima] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionBaixo, setSelectedOptionBaixo] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionArma, setSelectedOptionArma] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionCabelo, setSelectedOptionCabelo] = useState(Array.from({ length: parseInt(individuos) }, () => ''));

  const handleChangeCima = (individuoIndex, event) => {
    const newOptions = [...selectedOptionCima];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionCima(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, parteDeCima: event.target.value } : individuo
    ));
  };

  const handleChangeBaixo = (individuoIndex, event) => {
    const newOptions = [...selectedOptionBaixo];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionBaixo(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, parteDeBaixo: event.target.value } : individuo
    ));
  };

  const handleChangeCabelo = (individuoIndex, event) => {
    const newOptions = [...selectedOptionCabelo];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionCabelo(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, tipoCabelo: event.target.value } : individuo
    ));
  };

  const handleChangeArma = (individuoIndex, event) => {
    const newOptions = [...selectedOptionArma];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionArma(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, usoArma: event.target.value } : individuo
    ));
  };

  const [selectedOptionCalcadoIndividuos, setSelectedOptionCalcadoIndividuos] = useState(Array.from({ length: parseInt(individuos) }, () => ''));

  const handleCalcadoChange = (individuoIndex, event) => {
    const newOptions = [...selectedOptionCalcadoIndividuos];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionCalcadoIndividuos(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, calcado: event.target.value } : individuo
    ));
  };

  const handleOutraCaracteristicaCheckboxChange = (individuoIndex) => {
    const updatedShowOutraCaracteristica = [...showOutraCaracteristica];
    updatedShowOutraCaracteristica[individuoIndex] = !updatedShowOutraCaracteristica[individuoIndex];
    setShowOutraCaracteristica(updatedShowOutraCaracteristica);
  };

  const handleCheckboxChange = (individuoIndex, value) => {
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex
        ? { ...individuo, caracteristicas: individuo.caracteristicas.includes(value) ? individuo.caracteristicas.filter(item => item !== value) : [...individuo.caracteristicas, value] }
        : individuo
    ));
    const updatedCaracteristicas = [...caracteristicasIndividuos];
    if (!updatedCaracteristicas[individuoIndex]) {
      updatedCaracteristicas[individuoIndex] = [];
    }

    let updatedValue;

    if (updatedCaracteristicas[individuoIndex].includes(value)) {
      updatedValue = updatedCaracteristicas[individuoIndex].filter(item => item !== value);
    } else {
      updatedValue = [...updatedCaracteristicas[individuoIndex], value];
    }

    updatedCaracteristicas[individuoIndex] = updatedValue;
    setCaracteristicasIndividuos(updatedCaracteristicas);
  };

  const handleOutraCaracteristicaChange = (individuoIndex, value) => {
    const novasCaracteristicas = [...outrasCaracteristicas];
    novasCaracteristicas[individuoIndex] = value;
    setOutrasCaracteristicas(novasCaracteristicas);
  };


  const [individuosData, setIndividuosData] = useState([{
    parteDeCima: '',
    parteDeBaixo: '',
    corCamiseta: 'clara',
    corCalca: 'clara',
    caracteristicas: [],
    calcado: '',
    tipoCabelo: '',
    usoArma: '',
    outraCaracteristica: '',
    showOutraCaracteristica: false,
  }]);


  const handleIndividuosChange = (e) => {
    const numIndividuos = parseInt(e.target.value);

    const novosIndividuos = Array.from({ length: numIndividuos }, (_, index) => ({
      parteDeCima: selectedOptionCima[index] || '',
      parteDeBaixo: selectedOptionBaixo[index] || '',
      //corCamiseta: corCamisetas[index] || 'clara',
      corCalca: corCalcas[index] || 'clara',
      caracteristicas: caracteristicasIndividuos[index] || [],
      calcado: selectedOptionCalcadoIndividuos[index] || '',
      tipoCabelo: selectedOptionCabelo[index] || '',
      usoArma: selectedOptionArma[index] || '',
      outraCaracteristica: outrasCaracteristicas[index] || '',
      showOutraCaracteristica: showOutraCaracteristica[index] || false,
    }));

    setIndividuosData(novosIndividuos);
    setSelectedOptionCima(novosIndividuos.map(individuo => individuo.parteDeCima));
    setSelectedOptionBaixo(novosIndividuos.map(individuo => individuo.parteDeBaixo));
    // ... atualize outros estados de forma similar
    setState(prevState => ({ ...prevState, individuos: numIndividuos }));
    //setCorCamisetas(Array.from({ length: numIndividuos }, (_, index) => corCamisetas[index] || 'clara'));
    //setCorCalcas(Array.from({ length: numIndividuos }, (_, index) => corCalcas[index] || 'clara'));

  };

 /* const handleCorRoupaChange = (individuoIndex, value, type) => {
    if (type === 'camiseta') {
      setCorCamisetas(prevCorCamisetas => prevCorCamisetas.map((cor, index) => (index === individuoIndex ? value : cor)));
    } else {
      setCorCalcas(prevCorCalcas => prevCorCalcas.map((cor, index) => (index === individuoIndex ? value : cor)));
    }
  };*/

  const generateNarrative = () => {
    let text = `${solicitante}
    Solicitante ${nome}, endereço: ${endereco}, ${regiaoAdministrativa}, ${referencia}, Telefone: ${telefone}, informa que teve seu veículo ${tipo === 'roubado' ? 'tomado de ASSALTO (ROUBO)' : 'furtado'}, trata-se de um ${modelo}, ${placa ==='' ? 'não soube informar a placa' : 'placa: ' + placa}, ${individuosData.length === 1 ? 'por 1 indivíduo.' : individuosData.length === 0 ? '' : 'por ' + individuosData.length + ' indivíduos.'}`;

    for (let i = 0; i < individuosData.length; i++) {
      const individuo = individuosData[i];

      text += ` \n\nIndivíduo ${i + 1}:\n`;
      text += ` - Parte de Cima: ${opcoesParteDeCima[individuo.parteDeCima] || 'Não selecionado'}\n`;
      text += ` - Parte de Baixo: ${opcoesParteDeBaixo[individuo.parteDeBaixo] || 'Não selecionado'}\n`;
      text += ` - Cor da Camiseta/Camisa/Regata: ${cores[individuo.corCamiseta]?.label || 'Não selecionado'}\n`;
      text += ` - Cor da Calça/Bermuda: ${cores[individuo.corCalca]?.label || 'Não selecionado'}\n`;
      text += ` - Características: ${individuo.caracteristicas.length > 0 ? individuo.caracteristicas.map(option => caracteristicasOption[option]).join(', ') : 'Nenhuma característica selecionada'}\n`;
      text += ` - Calçado: ${opcoesCalcado[individuo.calcado] || 'Não selecionado'}\n`;
      text += ` - Tipo de Cabelo: ${opcoesCabelo[individuo.tipoCabelo] || 'Não selecionado'}\n`;
      text += ` - Uso de Arma: ${opcoesArma[individuo.usoArma] || 'Não selecionado'}\n`;
      if (individuo.showOutraCaracteristica && individuo.outraCaracteristica.trim() !== '') { // Verifica se a outra característica está visível e preenchida
        text += ` - Outra Característica: ${individuo.outraCaracteristica}\n`;
      }
      
    }
    text += `\nPede divulgação na rede rádio, foi orientado a comparecer à DP para registro.`;
    return text;
  };

  useEffect(() => {
    const updatedNarrative = generateNarrative();
    setState(prevState => ({ ...prevState, narrativa: updatedNarrative }));
  }, [
    solicitante, tipo, nome, endereco, regiaoAdministrativa, referencia, telefone, placa, modelo,
    individuosData, selectedOptionCima, selectedOptionBaixo, selectedOptionCalcadoIndividuos,
    selectedOptionCabelo, selectedOptionArma, outrasCaracteristicas, showOutraCaracteristica,
    caracteristicasIndividuos, //corCamisetas, corCalcas
  ]);


  return (
    <Box paddingRight={2} marginTop={4}>
      <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
        <Grid item style={{ paddingTop: 0 }} xs={12}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: 30 }} id="demo-controlled-radio-buttons-group">ROUBO/FURTO</FormLabel>
          <Box sx={{ mt: 2 }} noValidate autoComplete="off">
            <FormLabel id="demo-controlled-radio-buttons-group">Solicitante:</FormLabel>
            <RadioGroup
              id="solicitante"
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              sx={{ marginBottom: 0 }}
            >
              <FormControlLabel value="Vítima" control={<Radio />} label="Vítima" />
              <FormControlLabel value="Denunciante" control={<Radio />} label="Denunciante" />
            </RadioGroup>
          </Box>
          <Box sx={{ mt: 2 }} noValidate autoComplete="off">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Tipo:</FormLabel>
              <RadioGroup
                id="tipo"
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={tipo}
                onChange={e => handleChange('tipo', e.target.value)}
                sx={{ marginBottom: 0 }}
              >
                <FormControlLabel value="roubado" control={<Radio />} label="Roubo" />
                <FormControlLabel value="furtado" control={<Radio />} label="Furto" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }} noValidate autoComplete="off">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Objeto do roubo/furto:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                id="objeto"
                value={objeto}
                onChange={(e) => setObjeto(e.target.value)}
              >
                <FormControlLabel value="veículo" control={<Radio />} label="Veículo" />
                <FormControlLabel value="celular" control={<Radio />} label="Aparelho Celular" />
                <FormControlLabel value="transeunte" control={<Radio />} label="Transeunte" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Stack sx={{ width: '100%' }} spacing={2}>
            {objeto === 'veículo' && (
              <>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Nome solicitante ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('nome')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Endereço" fullWidth id="outlined-basic-endereco" onChange={e => handleChange('endereco', e.target.value)} label="Endereço ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('endereco')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      <FormControl fullWidth>
                        <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                        <Select
                          sx={{ marginBottom: 2 }}
                          placeholder="Cidade:"
                          value={regiaoAdministrativa}
                          onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
                          IconComponent={KeyboardArrowDownIcon}
                          variant="outlined"
                          id="outlined-basic-regiaoAdministrativa"
                        >
                          {regioesAdministrativas.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}> {/* O botão ocupa 4/12 do espaço */}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCopy('regiaoAdministrativa', regiaoAdministrativa)}
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}
                      >
                        <FileCopyIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
                    placeholder="Ponto de referência"
                    fullWidth
                    id="outlined-basic-referencia" // Corrigido o ID
                    label="Ponto de Referência ?"
                    name="referencia"
                    onChange={e => handleChange('referencia', e.target.value)}
                    variant="outlined"
                  />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('referencia')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <InputMask
                    mask="(99)99999-9999"
                    value={telefone}
                    onChange={(e) => handleTelefoneChange(e.target.value, 'telefone')}
                  >
                    {() => (
                      <TextField
                        sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
                        placeholder="Telefone"
                        fullWidth
                        id="outlined-basic-telefone"
                        label="Telefone ?"
                        name="telefone"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </InputMask>
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('telefone')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Placa do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('placa', e.target.value)} label="Placa do veículo ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('placa')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Marca/Modelo do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('modelo', e.target.value)} label="Marca/Modelo do veículo ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('modelo')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: '80%' }}>
                    <FormLabel sx={{ marginBottom: 2 }} id="demo-controlled-radio-buttons-group">Indivíduos:</FormLabel>
                    <RadioGroup

                      aria-label="individuos"
                      name="individuos"
                      value={individuos}
                      onChange={handleIndividuosChange}
                    >
                      {qtdeIndividuos.map((option) => (
                        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {Array.from({ length: parseInt(individuos || 0) }).map((_, individuoIndex) => (
                  <>
                    <Divider orientation="horizontal" sx={{ fontSize: 25 }}>
                      Indivíduo {individuoIndex + 1}
                    </Divider>
                    <Grid key={individuoIndex} sx={{ display: 'grid', gridTemplateColumns: { sm: '2fr 2fr' }, gap: 0 }}>
                      <FormControl>
                        <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Parte de cima:</FormLabel>
                        <RadioGroup
                          sx={{ marginBottom: 5 }}
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={`row-radio-buttons-group-cima-${individuoIndex}`} // Use um nome exclusivo para cada grupo de rádio
                          value={selectedOptionCima[individuoIndex]} // Use o estado correspondente às seleções da parte de cima do indivíduo
                          onChange={(e) => handleChangeCima(individuoIndex, e)}>
                          {opcoesParteDeCima.map((opcao) => (
                            <FormControlLabel
                              key={opcao.value}
                              value={opcao.value}
                              control={<Radio />}
                              label={opcao.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Parte de baixo:</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={`row-radio-buttons-group-cima-${individuoIndex}`} // Use um nome exclusivo para cada grupo de rádio
                          value={selectedOptionBaixo[individuoIndex]} // Use o estado correspondente às seleções da parte de cima do indivíduo
                          onChange={(e) => handleChangeBaixo(individuoIndex, e)}>
                          {opcoesParteDeBaixo.map((opcao) => (
                            <FormControlLabel
                              key={opcao.value}
                              value={opcao.value}
                              control={<Radio />}
                              label={opcao.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <Grid item xs={10}>
                        <FormControl>
                          <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id={`corCamiseta-label-${individuoIndex}`}>Cor da camiseta/camisa/regata do indivíduo {individuoIndex + 1}:</FormLabel>
                          <Select
                            sx={{ marginBottom: 5 }}
                            //value={corCamisetas[individuoIndex]}
                            onChange={(e) => handleCorRoupaChange(individuoIndex, e.target.value, 'camiseta')}
                            IconComponent={KeyboardArrowDownIcon}
                            variant="outlined"
                          >
                            {cores.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={10}>
                        <FormControl fullWidth>
                          <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id={`corCalca-label-${individuoIndex}`}>Cor da calça/bermuda do indivíduo {individuoIndex + 1}:</FormLabel>
                          <Select
                            value={corCalcas[individuoIndex]}
                            onChange={(e) => handleCorRoupaChange(individuoIndex, e.target.value, 'calca')}
                            IconComponent={KeyboardArrowDownIcon}
                            variant="outlined"
                          >
                            {cores.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <FormControl component="fieldset">
                        <FormLabel
                          sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}
                          id="demo-row-radio-buttons-group-label"
                        >
                          Características:
                        </FormLabel>
                        <FormGroup row>
                          {caracteristicasOption.map(option => (
                            <FormControlLabel
                              key={`${option}-${individuoIndex}`}
                              control={
                                <Checkbox
                                  checked={(caracteristicasIndividuos[individuoIndex] || []).includes(option)}
                                  onChange={(e) => handleCheckboxChange(individuoIndex, option)}
                                />
                              }
                              label={option.charAt(0).toUpperCase() + option.slice(1)}
                            />
                          ))}
                          <FormControlLabel
                            control={
                              <Checkbox
                                // Use o estado específico do indivíduo
                                checked={showOutraCaracteristica[individuoIndex]}
                                onChange={() => handleOutraCaracteristicaCheckboxChange(individuoIndex)}
                              />
                            }
                            label="Outro"
                          />
                        </FormGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Calçado:</FormLabel>
                        <RadioGroup
                          row
                          sx={{ marginBottom: 5 }}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={`row-radio-buttons-group-calcado-${individuoIndex}`}
                          value={selectedOptionCalcadoIndividuos[individuoIndex]}
                          onChange={(e) => handleCalcadoChange(individuoIndex, e.target.value)}
                        >
                          {opcoesCalcado.map((opcao) => (
                            <FormControlLabel
                              key={opcao.value}
                              value={opcao.value}
                              control={<Radio />}
                              label={opcao.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      {showOutraCaracteristica[individuoIndex] && (
                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { width: '80%' },
                            marginTop: 3,
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id={`outraCaracteristica-${individuoIndex}`}
                            value={outrasCaracteristicas[individuoIndex]}
                            label="Outra característica"
                            variant="outlined"
                            onChange={(e) => handleOutraCaracteristicaChange(individuoIndex, e.target.value)}
                          />
                        </Box>
                      )}
                      <FormControl>
                        <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Tipo de cabelo:</FormLabel>
                        <RadioGroup
                          sx={{ marginBottom: 5 }}
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={`row-radio-buttons-group-cima-${individuoIndex}`}
                          value={selectedOptionCabelo[individuoIndex]}
                          onChange={(e) => handleChangeCabelo(individuoIndex, e)}>
                          {opcoesCabelo.map((opcao) => (
                            <FormControlLabel
                              key={opcao.value}
                              value={opcao.value}
                              control={<Radio />}
                              label={opcao.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Uso de arma:</FormLabel>
                        <RadioGroup
                          sx={{ marginBottom: 5 }}
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name={`row-radio-buttons-group-cima-${individuoIndex}`}
                          value={selectedOptionArma[individuoIndex]}
                          onChange={(e) => handleChangeArma(individuoIndex, e)}>
                          {opcoesArma.map((opcao) => (
                            <FormControlLabel
                              key={opcao.value}
                              value={opcao.value}
                              control={<Radio />}
                              label={opcao.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid >
                  </>
                ))}
                <Grid item xs={12}>
                  <FormLabel sx={{ marginTop: 10 }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                  <TextField
                    className="narrativa-text"
                    sx={{
                      backgroundColor: 'rgba(0, 200, 0, 0.1)'
                    }}
                    multiline
                    fullWidth
                    name="narrativa"
                    value={narrativa}
                    InputProps={{
                      disabled: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained"
                    color="secondary"
                    onClick={handleCopy}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
                  <Button variant="contained"
                    color="secondary"
                    onClick={handleResetForm}
                    sx={{ marginBottom: 8 }}
                    style={{ backgroundColor: '#000066', color: '#FFFFFF' }}>Limpar Formulário</Button>
                </Grid>
              </>
            )}
          </Stack>
        </Grid>
      </Grid >
    </Box >

  );
}