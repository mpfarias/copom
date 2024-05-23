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
  FormGroup,
  Alert
} from '@mui/material';

import Divider from '@mui/joy/Divider';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import { cores, qtdeIndividuos, regioesAdministrativas, opcoesCorVeiculo, caracteristicasOption, opcoesParteDeBaixo, opcoesParteDeCima, opcoesCalcado, opcoesArma, opcoesCabelo } from './Const/Consts';
import { handleCopy, handleResetForm } from './Function/Functions';

import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function RouboFurto() {

  const [objeto, setObjeto] = useState('');
  const [solicitante, setSolicitante] = useState('vitima');
  const [caracteristicasIndividuos, setCaracteristicasIndividuos] = useState([]);
  const [corVeiculo, setCorVeiculo] = useState('branco'); // Estado inicial da cor do veículo
  const [outraCor, setOutraCor] = useState(''); // Estado para a cor personalizada


  const [state, setState] = useState({
    solicitante: 'Vítima',
    nome: '',
    tipo: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    placa: '',
    modelo: '',
    estabelecimento: '',
    corVeiculo: 'branco',
    outraCor: '',
    individuos: -1,
    calcado: '',
    corCamiseta: ['clara'],
    corCalca: ['clara'],
    caracteristicas: [],
    outraCaracteristica: '',
    usoArma: '',
    narrativa: '',
    text01: "Informe ao solicitante para registrar ocorrência direto na Delegacia, ou poderá fazer o registro na DELEGACIA ONLINE, pelo site da Polícia Civil. VIATURA NÃO DEVE SER ACIONADA.",

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
    estabelecimento,
    calcado,
    individuos,
    parteDeCima,
    parteDeBaixo,
    corCamiseta,
    corCalca,
    outraCaracteristica,
    usoArma,
    narrativa,
    text01
  } = state;

  const [outrasCaracteristicas, setOutrasCaracteristicas] = useState(Array.from({ length: parseInt(individuos || 0) }, () => ''));
  const [showOutraCaracteristica, setShowOutraCaracteristica] = useState(Array.from({ length: parseInt(individuos) }, () => false));

  const handleChange = (field, value) => {

    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const [selectedOptionCima, setSelectedOptionCima] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionBaixo, setSelectedOptionBaixo] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionArma, setSelectedOptionArma] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [selectedOptionCabelo, setSelectedOptionCabelo] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [nomesTimes, setNomesTimes] = useState(Array.from({ length: parseInt(individuos) }, () => ''));
  const [showCamisaTime, setShowCamisaTime] = useState(false)

  /* const handleChangeCima = (individuoIndex, event) => {
     const newOptions = [...selectedOptionCima];
     newOptions[individuoIndex] = event.target.value;
     setSelectedOptionCima(newOptions);
     setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
       index === individuoIndex ? { ...individuo, parteDeCima: event.target.value } : individuo
     ));
     setShowCamisaTime( selectedOptionCima === 'time');
   };*/

  const handleChangeCima = (individuoIndex, event) => {
    const novoValor = event.target.value;
    setSelectedOptionCima((prevOptions) => {
      const novasOpcoes = [...prevOptions];
      novasOpcoes[individuoIndex] = novoValor;
      return novasOpcoes;
    });
    setIndividuosData((prevIndividuos) =>
      prevIndividuos.map((individuo, index) =>
        index === individuoIndex ? { ...individuo, parteDeCima: novoValor } : individuo
      )
    );
    setShowCamisaTime(novoValor === 'time');
  };

  const handleNomeTimeChange = (individuoIndex, event) => {
    const novoNomeTime = event.target.value;
    setNomesTimes((prevNomesTimes) => {
      const novosNomesTimes = [...prevNomesTimes];
      novosNomesTimes[individuoIndex] = novoNomeTime;
      return novosNomesTimes;
    });
  };

  const handleChangeBaixo = (individuoIndex, event) => {
    const newOptions = [...selectedOptionBaixo];
    newOptions[individuoIndex] = event.target.value;
    setSelectedOptionBaixo(newOptions);
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, parteDeBaixo: event.target.value } : individuo
    ));
  };

  const handleChangeCabelo = (individuoIndex, value) => {
    const newOptions = [...selectedOptionCabelo];
    newOptions[individuoIndex] = value;
    setSelectedOptionCabelo(newOptions);
    setIndividuosData(prevIndividuos =>
      prevIndividuos.map((individuo, index) =>
        index === individuoIndex ? { ...individuo, tipoCabelo: value } : individuo
      )
    );
  };


  const handleChangeArma = (individuoIndex, value) => {
    const newOptions = [...selectedOptionArma];
    newOptions[individuoIndex] = value;
    setSelectedOptionArma(newOptions);
    setIndividuosData(prevIndividuos =>
      prevIndividuos.map((individuo, index) =>
        index === individuoIndex ? { ...individuo, usoArma: value } : individuo
      )
    );
  };

  const [selectedOptionCalcadoIndividuos, setSelectedOptionCalcadoIndividuos] = useState(Array.from({ length: parseInt(individuos) }, () => ''));

  const handleCalcadoChange = (individuoIndex, value) => {
    const newOptions = [...selectedOptionCalcadoIndividuos];
    newOptions[individuoIndex] = value;
    setSelectedOptionCalcadoIndividuos(newOptions);
    setIndividuosData(prevIndividuos =>
      prevIndividuos.map((individuo, index) =>
        index === individuoIndex ? { ...individuo, calcado: value } : individuo
      )
    );
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
    setIndividuosData(prevIndividuos => prevIndividuos.map((individuo, index) =>
      index === individuoIndex ? { ...individuo, outraCaracteristica: value } : individuo
    ));
  };

  const [individuosData, setIndividuosData] = useState(
    Array.from({ length: 5 }, () => ({
      parteDeCima: '',
      corVeiculo: '',
      parteDeBaixo: '',
      corCamiseta: cores[0],
      corCalca: cores[0],
      caracteristicas: [],
      calcado: '',
      tipoCabelo: '',
      usoArma: '',
      outraCaracteristica: '',
      showOutraCaracteristica: false,
    }))
  );


  const handleIndividuosChange = (e) => {
    const numIndividuos = parseInt(e.target.value, 10);

    const novosIndividuos = Array.from({ length: numIndividuos }, (_, index) => {
      const existingIndividuo = individuosData[index] || {};
      return {
        parteDeCima: selectedOptionCima[index] || '',
        parteDeBaixo: selectedOptionBaixo[index] || '',
        corCamiseta: existingIndividuo.corCamiseta || cores[0],
        corCalca: existingIndividuo.corCalca || cores[0],
        caracteristicas: existingIndividuo.caracteristicas || [],
        calcado: existingIndividuo.calcado || '',
        tipoCabelo: existingIndividuo.tipoCabelo || '',
        usoArma: existingIndividuo.usoArma || '',
        outraCaracteristica: existingIndividuo.outraCaracteristica || '',
        showOutraCaracteristica: existingIndividuo.showOutraCaracteristica || false,
      };
    });
    const novosNomesTimes = Array.from({ length: numIndividuos }, (_, index) => nomesTimes[index] || '');
    setIndividuosData(novosIndividuos);
    setSelectedOptionCima(novosIndividuos.map(individuo => individuo.parteDeCima));
    setSelectedOptionBaixo(novosIndividuos.map(individuo => individuo.parteDeBaixo));
    setNomesTimes(novosNomesTimes);
    setState(prevState => ({ ...prevState, individuos: numIndividuos }));
  };

  const handleTelefoneChange = (event) => {
    const formattedTelefone = event.target.value.replace(/\D/g, "");
    const limitedTelefone = formattedTelefone.slice(0, 11);
    setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
  };

  const generateNarrative = () => {
    const corExibida = corVeiculo === 'outra' ? outraCor.toUpperCase() : opcoesCorVeiculo.find(op => op.value === corVeiculo)?.value.toUpperCase();

    let text = `${solicitante.toUpperCase()}
     Solicitante ${nome.toUpperCase()}, endereço: ${endereco.toUpperCase()}, ${regiaoAdministrativa}, ${referencia.toUpperCase()}, Telefone: ${telefone},`

    if (objeto === 'veículo') {
      text += `informa que teve seu veículo ${tipo === 'roubado' ? 'tomado de ASSALTO (ROUBO)' : 'furtado'}, trata-se de um ${modelo.toUpperCase()} ${corExibida.toUpperCase() || 'COR NÃO INFORMADA'}, ${placa === '' ? 'não soube informar a placa' : 'placa: ' + placa.toUpperCase()}, `;
    } else if (objeto === 'transeunte') {
      text += `informa que foi vítima de  ${tipo === 'roubado' ? 'ROUBO, e ' : 'FURTO, e '}`;
    } else if (objeto === 'estabelecimento comercial') {
      text += ` informa que houve um assalto no/na ${estabelecimento}, `;
    }

    if (individuos === -1) {
      text += 'não sabe quantos indivíduos participaram do crime.';
    } else if (individuos === 6) {
      text += 'por mais de 5 indivíduos.';
    } else if (individuos > 0) {
      text += `${individuosData.length === 1 ? 'por 1 indivíduo.' : 'por ' + individuosData.length + ' indivíduos.'}`;

      for (let i = 0; i < individuosData.length && i < 5; i++) {
        const individuo = individuosData[i];

        text += ` \n\nIndivíduo ${i + 1}:\n`;
        if (individuo.parteDeCima === 'time') {
          text += ` - Camisa de time: ${nomesTimes[i].toUpperCase() || 'NÃO INFORMADO'}\n`;
        } else {
          text += ` - Parte de Cima: ${individuo.parteDeCima.toUpperCase() || 'Não selecionado'}\n`;
        }
        text += ` - Parte de Baixo: ${individuo.parteDeBaixo.toUpperCase() || 'Não selecionado'}\n`;
        if (individuo.parteDeCima === 'time') {
          text += ``;
        } else {
          text += ` - Cor da camiseta/camisa/regata: ${individuo.corCamiseta?.label.toUpperCase() || 'NÃO SELECIONADO'}\n`;
        }
        text += ` - Cor da calça/bermuda: ${individuo.corCalca?.label.toUpperCase() || 'NÃO SELECIONADO'}\n`;
        text += ` - Características: ${individuo.caracteristicas.length > 0 ? individuo.caracteristicas.join(', ').toUpperCase() : 'NENHUMA CARACTERÍSTICA SELECIONADA'}\n`;
        if (showOutraCaracteristica) {
          text += ` - Outras características: ${individuo.outraCaracteristica.toUpperCase() || 'Não selecionado'}\n`;
        }
        text += ` - Calçado: ${individuo.calcado.toUpperCase() || 'Não selecionado'}\n`;
        text += ` - Tipo de Cabelo: ${individuo.tipoCabelo.toUpperCase() || 'Não selecionado'}\n`;
        text += ` - Uso de Arma: ${individuo.usoArma.toUpperCase() || 'Não selecionado'}\n`;
        if (individuo.caracteristicas.includes('Outro') && individuo.outraCaracteristica.trim() !== '') {
          text += ` - Outra Característica: ${individuo.outraCaracteristica}\n`;
        }

      }
    }

    text += `\nPede divulgação na rede rádio, foi orientado a comparecer à DP para registro.`;
    return text;
  };



  useEffect(() => {

    const updatedNarrative = generateNarrative();
    setState(prevState => ({ ...prevState, narrativa: updatedNarrative }));
  }, [solicitante,
    objeto,
    tipo,
    nome,
    endereco,
    regiaoAdministrativa,
    referencia,
    telefone,
    modelo,
    placa,
    estabelecimento,
    individuosData,
    outraCor,
    parteDeCima,
    nomesTimes,
    parteDeBaixo,
    calcado,
    corVeiculo,
    corCamiseta,
    corCalca,
    caracteristicasIndividuos,
    outraCaracteristica,
    usoArma
  ]);


  const handleCorRoupaChange = (individuoIndex, value, type) => {
    // Cria uma cópia do array de individuos
    const updatedIndividuosData = [...individuosData];

    // Cria uma cópia do objeto do indivíduo
    const updatedIndividuo = { ...updatedIndividuosData[individuoIndex] };

    // Atualiza a cópia do objeto do indivíduo
    updatedIndividuo[type === 'camiseta' ? 'corCamiseta' : 'corCalca'] = value;

    // Atualiza a cópia do array com o objeto do indivíduo atualizado
    updatedIndividuosData[individuoIndex] = updatedIndividuo;

    // Define o novo estado com a cópia atualizada
    setIndividuosData(updatedIndividuosData);
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
                <FormControlLabel value="estabelecimento comercial" control={<Radio />} label="Estabelecimento comercial" />
                <FormControlLabel value="celular" control={<Radio />} label="Aparelho Celular" />
                <FormControlLabel value="transeunte" control={<Radio />} label="Transeunte" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Stack sx={{ width: '100%' }} spacing={2}>
            {(objeto === 'veículo' || objeto === 'transeunte' || objeto === 'estabelecimento comercial') && (
              <>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Nome solicitante ?" variant="outlined" />
                  <CopyToClipboard text={nome} onCopy={() => console.log('Nome copiado!')}>
                    <Button variant="contained"
                      color="secondary"
                      style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Endereço" fullWidth id="outlined-basic-endereco" onChange={e => handleChange('endereco', e.target.value)} label="Endereço ?" variant="outlined" />
                  <CopyToClipboard text={endereco} onCopy={() => console.log('Endereço copiado!')}>
                    <Button variant="contained"
                      color="secondary"
                      style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                  </CopyToClipboard>
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
                    <Grid item xs={4}>
                      <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
                        <Button variant="contained"
                          color="secondary"
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
                    placeholder="Ponto de referência"
                    fullWidth
                    id="outlined-basic-referencia"
                    label="Ponto de Referência ?"
                    name="referencia"
                    onChange={e => handleChange('referencia', e.target.value)}
                    variant="outlined"
                  />
                  <CopyToClipboard text={referencia} onCopy={() => console.log('Referência copiada!')}>
                    <Button variant="contained"
                      color="secondary"
                      style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={12}>
                  <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Telefone ?" name="telefone" variant="outlined" />
                  <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
                    <Button variant="contained"
                      color="secondary"
                      style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                  </CopyToClipboard>
                </Grid>
                {objeto === 'veículo' && (
                  <>
                    <Grid item xs={12}>
                      <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Placa do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('placa', e.target.value)} label="Placa do veículo ?" variant="outlined" />
                      <CopyToClipboard text={placa} onCopy={() => console.log('Placa copiada!')}>
                        <Button variant="contained"
                          color="secondary"
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </CopyToClipboard>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Marca/Modelo do veículo" fullWidth id="outlined-basic-nome" onChange={e => handleChange('modelo', e.target.value)} label="Marca/Modelo do veículo ?" variant="outlined" />
                      <CopyToClipboard text={modelo} onCopy={() => console.log('Veículo copiado!')}>
                        <Button variant="contained"
                          color="secondary"
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </CopyToClipboard>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="cor-veiculo-label">Cor do veículo</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="cor-veiculo-label"
                          name="corVeiculo"
                          value={corVeiculo}
                          onChange={(e) => {
                            setCorVeiculo(e.target.value);
                            if (e.target.value !== 'outra') {
                              setOutraCor('');
                            }
                          }}
                        >
                          {opcoesCorVeiculo.map((option) => (
                            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                          ))}
                        </RadioGroup>
                        {corVeiculo === 'outra' && (
                          <TextField
                            label="Outra cor"
                            value={outraCor}
                            onChange={(e) => setOutraCor(e.target.value)}
                          />
                        )}
                      </FormControl>
                    </Grid>
                  </>
                )}

                {objeto === 'estabelecimento comercial' && (
                  <>
                    <Grid item xs={12}>
                      <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Qual foi o estabelecimento?" fullWidth id="outlined-basic-nome" onChange={e => handleChange('estabelecimento', e.target.value)} label="Aconteceu e que estabelecimento?" variant="outlined" />
                      <CopyToClipboard text={placa} onCopy={() => console.log('Placa copiada!')}>
                        <Button variant="contained"
                          color="secondary"
                          style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                        </Button>
                      </CopyToClipboard>
                    </Grid>
                  </>
                )
                }
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

                {Array.from({ length: parseInt(individuos > 0 ? individuos : 0) }).map((_, individuoIndex) => (
                  individuos < 6 && (
                    <>
                      <Divider orientation="horizontal" sx={{ fontSize: 25 }}>
                        Indivíduo {individuoIndex + 1}
                      </Divider>
                      <Grid key={individuoIndex} sx={{ display: 'grid', gridTemplateColumns: { sm: '2fr 2fr' }, gap: 0 }}>
                        <FormControl>
                          <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Parte de cima:</FormLabel>
                          <RadioGroup
                            sx={{ marginBottom: 2 }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={`row-radio-buttons-group-cima-${individuoIndex}`}
                            value={selectedOptionCima[individuoIndex]}
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
                          {selectedOptionCima[individuoIndex] === 'time' && (
                            <TextField
                              id="outlined-search-time"
                              sx={{
                                width: '80%',
                                marginBottom: 4
                              }}
                              label="Informe o time"
                              type="search"
                              value={nomesTimes[individuoIndex]}
                              onChange={(e) => handleNomeTimeChange(individuoIndex, e)}
                            />
                          )}
                        </FormControl>
                        <FormControl>
                          <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Parte de baixo:</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={`row-radio-buttons-group-cima-${individuoIndex}`}
                            value={selectedOptionBaixo[individuoIndex]}
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
                            <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id={`corCamiseta-label-${individuoIndex}`}>Cor da camiseta/camisa do indivíduo {individuoIndex + 1}:</FormLabel>
                            <Select
                              sx={{ marginBottom: 5 }}
                              value={individuosData[individuoIndex].corCamiseta}
                              onChange={(e) => handleCorRoupaChange(individuoIndex, e.target.value, 'camiseta')}
                            >
                              {cores.map((option) => (
                                <MenuItem key={option.value} value={option}>
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
                              value={individuosData[individuoIndex].corCalca}
                              onChange={(e) => handleCorRoupaChange(individuoIndex, e.target.value, 'calca')}
                            >
                              {cores.map((option) => (
                                <MenuItem key={option.value} value={option}>
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
                                  checked={showOutraCaracteristica[individuoIndex]}
                                  onChange={() => handleOutraCaracteristicaCheckboxChange(individuoIndex)}
                                />
                              }
                              label="Outro"
                            />
                          </FormGroup>
                          {showOutraCaracteristica[individuoIndex] && (

                            <TextField
                              id={`outraCaracteristica-${individuoIndex}`}
                              sx={{marginTop:2,
                                marginBottom:3,
                                width:'80%'
                              }}
                              value={outrasCaracteristicas[individuoIndex]}
                              label="Outra característica"
                              variant="outlined"
                              onChange={(e) => handleOutraCaracteristicaChange(individuoIndex, e.target.value)}
                            />

                          )}
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
                        <FormControl>
                          <FormLabel sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }} id="demo-row-radio-buttons-group-label">Tipo de cabelo:</FormLabel>
                          <RadioGroup
                            row
                            sx={{ marginBottom: 5 }}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={`row-radio-buttons-group-cabelo-${individuoIndex}`}
                            value={selectedOptionCabelo[individuoIndex]}
                            onChange={(e) => handleChangeCabelo(individuoIndex, e.target.value)}
                          >
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
                            row
                            sx={{ marginBottom: 5 }}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={`row-radio-buttons-group-arma-${individuoIndex}`}
                            value={selectedOptionArma[individuoIndex]}
                            onChange={(e) => handleChangeArma(individuoIndex, e.target.value)}
                          >
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
                    </>)
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
                  <CopyToClipboard text={narrativa} onCopy={() => console.log('Narrativa copiada!')}>
                    <Button variant="contained"
                      color="secondary"
                      onClick={handleCopy}
                      style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto</Button>
                  </CopyToClipboard>
                </Grid>
              </>

            )}
            {objeto === 'celular' && (

              <Box >
                <Alert sx={{ marginBottom: 10 }} severity="warning">{text01}</Alert>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid >
    </Box >

  );
}