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


import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputMask from 'react-input-mask';

import { cores, qtdeIndividuos, regioesAdministrativas, caracteristicasOption, opcoesParteDeBaixo, opcoesParteDeCima } from './Consts';
import { handleCopy, handleTelefoneChange, handleResetForm } from './Functions';

export default function RouboFurto() {

  const [objeto, setObjeto] = useState('');
  const [solicitante, setSolicitante] = useState('vitima');
  const [showOutraCaracteristica, setShowOutraCaracteristica] = useState(false);
  const [caracteristicasIndividuos, setCaracteristicasIndividuos] = useState([]);
  const [selectedOptionBaixo, setSelectedOptionBaixo] = useState('');
  const [selectedOptionCima, setSelectedOptionCima] = useState('');


  const [state, setState] = useState({
    nome: '',
    tipo: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    individuos: '1',
    corCamisetas: ['clara'],
    corCalcas: ['clara'],
    caracteristicas: [],
    narrativa: ''
  });

  const {
    tipo,
    nome,
    regiaoAdministrativa,
    telefone,
    individuos,
    corCamisetas,
    corCalcas,
    outraCaracteristica,
    caracteristicas,
    narrativa
  } = state;

  const handleChange = (field, value) => {

    setState(prevState => ({ ...prevState, [field]: value }));

  };
  // Função para atualizar os selects "corRoupa" com base no número selecionado de indivíduos
  const handleIndividuosChange = (e) => {
    const numIndividuos = e.target.value;
    const newCorCamisetas = Array.from({ length: parseInt(numIndividuos) }, () => 'clara'); // Inicialize com 'clara'
    const newCorCalcas = Array.from({ length: parseInt(numIndividuos) }, () => 'clara');
    setState(prevState => ({ ...prevState, individuos: numIndividuos, corCamisetas: newCorCamisetas, corCalcas: newCorCalcas }));
    handleChange('individuos', e.target.value);
  };

  // Função para lidar com a alteração de corRoupa de cada indivíduo
  const handleCorRoupaChange = (index, value, type) => {
    const newColors = [...(type === 'camiseta' ? corCamisetas : corCalcas)];
    newColors[index] = value;
    setState(prevState => ({
      ...prevState,
      corCamisetas: type === 'camiseta' ? newColors : corCamisetas,
      corCalcas: type === 'calca' ? newColors : corCalcas
    }));
  };

  useEffect(() => {

    const text = `Tipo de solicitante: ${solicitante === 'vitima' ? 'Vítima' : 'Denunciante'}

* A pessoa de NOME: ${nome} informa que teve seu ${objeto} ${tipo} ${individuos === 'não sabe' ? '.' : individuos > 1 ? 'por ' + individuos + ' pessoas' : 'por ' + individuos + ' pessoa'}`;

    const coresIndividuos = [];
    for (let i = 0; i < individuos; i++) {
      const corCamiseta = corCamisetas[i];
      const corCalca = corCalcas[i];
      coresIndividuos.push(`Características do indivíduo ${i + 1}:\n- Cor da camiseta: ${corCamiseta}\n- Cor da calça: ${corCalca}`);
    }

    const coresText = coresIndividuos.join('\n\n');
    const finalText = `${text}\n\n${coresText}`;

    setState(prevState => ({ ...prevState, narrativa: finalText }));  
    setShowOutraCaracteristica(Array.from({ length: parseInt(individuos) }, () => false));
  },
    [
      solicitante,
      objeto,
      tipo,
      nome,
      individuos,
      corCamisetas,
      outraCaracteristica,
      corCalcas,
      caracteristicas
    ]
  );

  const handleChangeCima = (event) => {
    setSelectedOptionCima(event.target.value);
  };

  const handleChangeBaixo = (event) => {
    setSelectedOptionBaixo(event.target.value);
  };

  const handleOutraCaracteristicaCheckboxChange = (individuoIndex) => {
    const updatedShowOutraCaracteristica = [...showOutraCaracteristica];
    updatedShowOutraCaracteristica[individuoIndex] = !updatedShowOutraCaracteristica[individuoIndex];
    setShowOutraCaracteristica(updatedShowOutraCaracteristica);
  };
  const handleCheckboxChange = (individuoIndex, value) => {
    // Verifica se o array de características do indivíduo já existe
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
              <FormControlLabel value="vitima" control={<Radio />} label="Vítima" />
              <FormControlLabel value="denunciante" control={<Radio />} label="Denunciante" />
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
                  <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Nome solicitante ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('nome')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Endereço" fullWidth id="outlined-basic-endereco" onChange={e => handleChange('endereco', e.target.value)} label="Endereço ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('endereco')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
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
                      {regioesAdministrativas.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" fullWidth id="outlined-basic-referencia" label="Ponto de Referência ?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
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
                    onChange={e => handleTelefoneChange(e, 'telefone')}
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
                    onClick={() => handleCopy('telefone')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Placa do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('placa', e.target.value)} label="Placa do veículo ?" variant="outlined" />
                  <Button variant="contained"
                    color="secondary"
                    onClick={() => handleCopy('placa')}
                    style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Modelo do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('modelo', e.target.value)} label="Modelo do veículo ?" variant="outlined" />
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

                <FormControl>
                  <FormLabel sx={{ marginBottom: 2, fontWeight:'bold', textDecoration:'underline', fontStyle:'italic' }} id="demo-row-radio-buttons-group-label">Tipo de roupa:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedOptionCima}
                    onChange={handleChangeCima}
                  >
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
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedOptionBaixo}
                    onChange={handleChangeBaixo}
                  >
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

                {Array.from({ length: parseInt(individuos) }).map((_, individuoIndex) => (
                  <Grid key={individuoIndex} sx={{ display: 'grid', gridTemplateColumns: { sm: '2fr 2fr' }, gap: 0 }}>
                    <Grid item xs={10}>
                      <FormControl>
                        <FormLabel  sx={{ marginBottom: 2, fontWeight:'bold', textDecoration:'underline', fontStyle:'italic' }}  id={`corCamiseta-label-${individuoIndex}`}>Cor da camiseta/camisa/regata do indivíduo {individuoIndex + 1}:</FormLabel>
                        <Select
                          value={corCamisetas[individuoIndex]}
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
                        <FormLabel  sx={{ marginBottom: 2, fontWeight:'bold', textDecoration:'underline', fontStyle:'italic' }}  id={`corCalca-label-${individuoIndex}`}>Cor da calça/bermuda do indivíduo {individuoIndex + 1}:</FormLabel>
                        <Select
                          sx={{ marginBottom: 2 }}
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
                    <FormGroup row>
                      {caracteristicasOption.map(option => (
                        <FormControlLabel
                          key={`${option}-${individuoIndex}`} // Use uma chave única para cada checkbox
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
                            checked={(caracteristicasIndividuos[individuoIndex] || []).includes('outro')}
                            onChange={() => handleOutraCaracteristicaCheckboxChange(individuoIndex)}
                          />
                        }
                        label="Outro"
                      />
                    </FormGroup>
                    {showOutraCaracteristica[individuoIndex] && (
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { width: '80%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        
                        <TextField
                          id={`outraCaracteristica-${individuoIndex}`}
                          value={outraCaracteristica}
                          label="Outra característica"
                          variant="outlined"
                          onChange={(e) => handleChange('outraCaracteristica', e.target.value)}
                        />
                      </Box>
                    )}

                  </Grid>
                ))}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <FormLabel id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                  <TextField
                    className="narrativa-text"
                    sx={{
                      backgroundColor: 'rgba(0, 200, 0, 0.1)',
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