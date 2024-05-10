import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function somAlto() {
  const text01 = 'SOLICITANTE INFORMA PERTURBAÇÃO DO SOSSEGO E DIZ NÃO QUERER SE IDENTIFICAR. FOI ORIENTADO LIGAR PARA A OUVIDORIA DO GDF (162)';
  const aviso01 = 'ATENÇÃO!! VIATURA NÃO DEVE SER ACIONADA. ENCERRE A OCORRÊNCIA COMO INFORMAÇÃO'
  const text02 = 'Informe ao solicitante que o som alto em residência é infração do artigo 42 da Lei de Contravenções Penais, e que para que a Polícia Militar possa atuar, é necessária a assinatura do Termo Circunstanciado de Ocorrência, de acordo com o TJDFT (ACÓRDÃO Nº 1425679). Pergunte se o solicitante deseja assinar o Termo Circunstanciado de Ocorrência.';
  const text03 = 'INFORME AO SOLICITANTE QUE A POLICIA MILITAR SOMENTE PODE AGIR CASO EXISTA VÍTIMA PARA RESPONSABILIZAÇÃO CRIMINAL DO AUTOR. SE NÃO QUISER ASSINAR O TCO, PEÇA PARA LIGAR 162 (OUVIDORIA GDF). CLIQUE NO BOTÃO "COPIAR TEXTO" E COLE (CTRL + V) NO CAD';
  const text04 = 'RESPONSABILIDADE DO DETRAN - FAÇA O REGISTRO NORMALMENTE'

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionPerturbacao, setSelectedOptionPerturbacao] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleRadioChangePerturbacao = (event) => {
    setSelectedOptionPerturbacao(event.target.value);
  }

  return (
    <FormControl sx={{ marginTop: 3 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Local:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedOption}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="residência" control={<Radio />} label="Residência" />
        <FormControlLabel value="automóvel" control={<Radio />} label="Automóvel na rua" />
        <FormControlLabel value="estabelecimento comercial" control={<Radio />} label="Estabelecimento comercial" />
      </RadioGroup>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {selectedOption === 'residência' && (
          <>
            <Alert severity="warning">{text02}</Alert>
            <FormLabel id="demo-row-radio-buttons-group-label">Solicitante deseja assinar?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedOptionPerturbacao}
              onChange={handleRadioChangePerturbacao}
            >
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="não" control={<Radio />} label="Não" />
            </RadioGroup>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {selectedOptionPerturbacao === 'sim' && (
                <>
                  <FormLabel id="demo-row-radio-buttons-group-label">Nome completo</FormLabel>
                  <TextField fullWidth label="Nome Completo" placeholder="Nome Completo" id="fullWidth" />
                </>
              )
              }
              {selectedOptionPerturbacao === 'não' && <Alert severity="warning">{text03}</Alert> }
            </Stack>
          </>
        )}
        {selectedOption === 'automóvel' && <Alert severity="warning">{text04}</Alert>}
      </Stack>
    </FormControl>
  );
}