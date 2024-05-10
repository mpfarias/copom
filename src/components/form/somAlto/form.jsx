import React, { useState } from 'react';
import { Radio, Select, MenuItem, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert, Stack, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function somAlto() {
  const text01 = 'SOLICITANTE INFORMA PERTURBAÇÃO DO SOSSEGO E DIZ NÃO QUERER SE IDENTIFICAR. FOI ORIENTADO LIGAR PARA A OUVIDORIA DO GDF (162)';
  const aviso01 = 'ATENÇÃO!! VIATURA NÃO DEVE SER ACIONADA. ENCERRE A OCORRÊNCIA COMO INFORMAÇÃO'
  const text02 = 'Informe ao solicitante que o som alto em residência é infração do artigo 42 da Lei de Contravenções Penais, e que para que a Polícia Militar possa atuar, é necessária a assinatura do Termo Circunstanciado de Ocorrência, de acordo com o TJDFT (ACÓRDÃO Nº 1425679). Pergunte se o solicitante deseja assinar o Termo Circunstanciado de Ocorrência.';
  const text03 = 'INFORME AO SOLICITANTE QUE A POLICIA MILITAR SOMENTE PODE AGIR CASO EXISTA VÍTIMA PARA RESPONSABILIZAÇÃO CRIMINAL DO AUTOR. SE NÃO QUISER ASSINAR O TCO, PEÇA PARA LIGAR 162 (OUVIDORIA GDF). CLIQUE NO BOTÃO "COPIAR TEXTO" E COLE (CTRL + V) NO CAD';
  const text04 = 'RESPONSABILIDADE DO DETRAN - FAÇA O REGISTRO NORMALMENTE - A OCORRÊNCIA SERÁ ENCAMINHADA AO DETRAN PELO DESPACHANTE'

  const [local, setLocal] = useState('');
  const [selectedOptionPerturbacao, setSelectedOptionPerturbacao] = useState('');

  const handleRadioChange = (event) => {
    setLocal(event.target.value);
  }

  const handleRadioChangePerturbacao = (event) => {
    setSelectedOptionPerturbacao(event.target.value);
  }

  return (
    <FormControl sx={{ marginTop: 3, marginLeft: 2 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Local:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={local}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="residência" control={<Radio />} label="Residência" />
        <FormControlLabel value="automóvel" control={<Radio />} label="Automóvel na rua" />
        <FormControlLabel value="estabelecimento comercial" control={<Radio />} label="Estabelecimento comercial" />
      </RadioGroup>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {local === 'residência' && (
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
                  <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} label="Nome Completo" placeholder="Nome Completo" id="nome" />
                  <FormLabel id="demo-row-radio-buttons-group-label">Endereço</FormLabel>
                  <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} label="Endereço" placeholder="Endereço" id="nome" />
                  
                    <FormControl fullWidth>
                      <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                      <Select
                        sx={{ marginBottom: 2,  width: '80%' }}
                        placeholder="Cidade:"
                        IconComponent={KeyboardArrowDownIcon}
                        variant="outlined"
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
                </>
              )
              }
              {selectedOptionPerturbacao === 'não' && <Alert severity="warning">{text03}</Alert>}
            </Stack>
          </>
        )}
        {local === 'automóvel' && <Alert severity="warning">{text04}</Alert>}
      </Stack>
    </FormControl>
  );
}