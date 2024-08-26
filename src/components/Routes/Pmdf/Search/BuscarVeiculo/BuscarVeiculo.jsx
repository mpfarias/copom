import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Search } from '@mui/icons-material';

function BuscarVeiculo() {
  const [formData, setFormData] = useState({
    placa: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      placa: '',

    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, ml: 2, mb:2, width: '60ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-search"
          label="Digite a placa"
          type="search"
          name="placa"
          value={formData.placa}
          onChange={handleInputChange}
          inputProps={{ maxLength:7, style: { textTransform: 'uppercase' }}}
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

export default BuscarVeiculo
