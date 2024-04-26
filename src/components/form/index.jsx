import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function FormularioViolenciaDomestica() {
  const [state, setState] = useState({
    nomeVitima: "",
    endereco: "",
    teledone: "",
    animais: false,
    residencias: false,
    origem: false,
    origemText: '',
    pessoaNoLocal: false,
    relato: '',
    narrativa: '',
    pontoReferencia: '',
    irEstrada: false,
    pontoReferenciaBoolean: false
  });

  const { nomeVitima, endereco, telefone, Ameaça, narrativa, pontoReferencia, irEstrada, pontoReferenciaBoolean } = state;


  const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const [value, setValue] = React.useState('vitima');

  const radioChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <Box
      my={3}
      ml={50}
      sx={{
        width: 600,
        maxWidth: '100%',
        marginTop: 5
      }}
      noValidate
      autoComplete="off"
    >
      <FormLabel id="demo-controlled-radio-buttons-group">Solicitante</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={radioChange}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="vitima" control={<Radio />} label="Vítima" />
        <FormControlLabel value="denunciante" control={<Radio />} label="Denunciante" />
      </RadioGroup>
      <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic" label="Nome solicitante/vítima" name="nomeVitima" value={nomeVitima} onChange={handleChange} variant="outlined" />
      <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic" label="Endereço" name="endereco" value={endereco} onChange={handleChange} variant="outlined" />
      <TextField sx={{ marginBottom: 4 }} fullWidth id="outlined-basic" label="Telefone" name="telefone" value={telefone} onChange={handleChange} variant="outlined" />
      <FormLabel id="demo-controlled-radio-buttons-group">Tipo de agressão:</FormLabel>
      <Box sx={{ display: 'flex', gap: 3, padding: 3 }}>
        <Checkbox value={Ameaça} label="Ameaça" />
        <Checkbox label="Agressão física" />
        <Checkbox label="Agressão psicológica" />
      </Box>
      <Box sx={{ display: 'flex', gap: 3, padding: 3, marginBottom: 3 }}>
        <Checkbox label="Voz masculina ao fundo" />
        <Checkbox label="Gritos" />
      </Box>


      <Select
        placeholder="Parentesco"
        indicator={<KeyboardArrowDown />}
        sx={{
          width: 240,
          marginBottom: 4,
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        <Option value="Marido">Marido</Option>
        <Option value="Companheiro">Companheiro</Option>
        <Option value="Namorado">Namorado</Option>
        <Option value="Pai">Pai</Option>
        <Option value="Filho">Filho</Option>
        <Option value="Irmão">Irmão</Option>
        <Option value="Tio">Tio</Option>
      </Select>

      <FormLabel id="demo-controlled-radio-buttons-group">Possui medida protetiva?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={radioChange}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <FormLabel id="demo-controlled-radio-buttons-group">Está ferida?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={radioChange}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <FormLabel id="demo-controlled-radio-buttons-group">Criança envolvida?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={radioChange}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="true" control={<Radio />} label="Sim" />
        <FormControlLabel value="false" control={<Radio />} label="Não" />
      </RadioGroup>

      <FormLabel id="demo-controlled-radio-buttons-group">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>


    </Box>
  );
}