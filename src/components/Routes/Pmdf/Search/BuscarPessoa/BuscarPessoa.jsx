import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Search, CheckCircle } from '@mui/icons-material';
import { validateCPF } from '../../../../Consts/ValidacaoCpf'
import Cabecalho from '../../form/Components/Cabecalho';


function BuscarPessoa() {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    nomeMae: '',
    dataNascimento: '',
  });

  const [cpfError, setCpfError] = useState('');
  const [cpfValid, setCpfValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Garantir que apenas números sejam digitados no campo CPF
    if (name === 'cpf' || name === 'dataNascimento') {
      const onlyNumbers = value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
      setFormData({
        ...formData,
        [name]: onlyNumbers,
      });
      if (onlyNumbers.length === 11) {
        if (!validateCPF(onlyNumbers)) {
          setCpfError('CPF inválido');
          setCpfValid(false);
        } else {
          setCpfError('');
          setCpfValid(true);
        }
      } else {
        setCpfError('');
        setCpfValid(false);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    }
  };

  const handleClear = () => {
    setFormData({
      cpf: '',
      nome: '',
      nomeMae: '',
      dataNascimento: '',
    });
    setCpfError('');
    setCpfValid(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, ml: 2, width: '60ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12} sx={{mb:2}}>
          <Cabecalho title="Buscar pessoas" />
        </Grid>
        <TextField
          id="outlined-search"
          label="Digite o CPF"
          type="search"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          inputProps={{ maxLength: 11, inputMode: 'numeric', style: { textTransform: 'uppercase' } }}
          error={!!cpfError}
          helperText={cpfError}
          InputProps={{
            endAdornment: cpfValid && <CheckCircle sx={{ color: 'green' }} />,
            sx: {
              '& fieldset': {
                borderColor: cpfValid ? 'green' : '',
              },
            },
          }}
        />
        <TextField
          id="outlined-search"
          label="Digite o nome completo"
          type="search"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <TextField
          id="outlined-search"
          label="Digite o nome da mãe"
          type="search"
          name="nomeMae"
          value={formData.nomeMae}
          onChange={handleInputChange}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <TextField
          id="outlined-search"
          label="Digite a data de nascimento"
          type="search"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleInputChange}
          inputProps={{ maxLength: 8, inputMode: 'numeric', style: { textTransform: 'uppercase' } }}
        />
        <Stack direction="row" spacing={2} marginLeft={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>
            Apagar
          </Button>
          <Button variant="contained" endIcon={<Search />}>
            Buscar
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default BuscarPessoa
