import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após login bem-sucedido
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const Login = () => {
  const [userData, setUserData] = useState({
    usuario: '',
    senha: '',
    ramal: '',
    nome: '',
    nivel:''
  });

  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      console.log('Resposta do backend:', result);

      if (response.status === 200) {
        // Login bem-sucedido
        
        // Armazena informações do usuário e ramal
        localStorage.setItem('nome', result.nome);
        localStorage.setItem('ramal', result.ramal);
        localStorage.setItem('usuario', result.usuario);
        localStorage.setItem('nivel', result.nivel);


        console.log(`Usuário logado: ${result.nome}, Ramal selecionado: ${result.ramal}`);
        console.log('Armazenando no localStorage:', result.nivel, result.nome, result.ramal, result.usuario);
        navigate('/Main'); // Redireciona para a página principal
      } else {
        // Falha no login
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Usuário"
            name="usuario"
            autoComplete="username"
            autoFocus
            value={userData.usuario}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={userData.senha}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="ramal-label">Ramal</InputLabel>
            <Select
              labelId="ramal-label"
              id="ramal"
              name="ramal"
              value={userData.ramal}
              label="Ramal"
              onChange={handleChange}
              required
            >
              <MenuItem value={5960}>5960</MenuItem>
              <MenuItem value={5961}>5961</MenuItem>
              <MenuItem value={5962}>5962</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
