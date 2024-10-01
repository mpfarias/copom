// Importa o React e os hooks useState e useEffect para gerenciar o estado e efeitos colaterais do componente
import React, { useState, useEffect } from 'react';
// Importa o hook useNavigate do react-router-dom para redirecionamento após o login
import { useNavigate } from 'react-router-dom';
// Importa componentes do Material-UI para criar a interface do usuário
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

// Declaração do componente funcional Login
const Login = () => {
  // Define o estado inicial do userData com useState, que armazena as informações do formulário de login
  const [userData, setUserData] = useState({
    cpf: '', // Armazena o CPF do usuário
    senha: '', // Armazena a senha do usuário
    ramal: '', // Armazena o ramal selecionado
  });
  const [ramais, setRamais] = useState([]);
  const [showRamalField, setShowRamalField] = useState(false);
  const [isLoadingRamais, setIsLoadingRamais] = useState(false); // Estado para controlar o carregamento dos ramais
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio do formulário
  const [buttonLabel, setButtonLabel] = useState('Escolher ramal');
  const [isRamalSelected, setIsRamalSelected] = useState(false);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null); // Estado para o WebSocket

  // Função chamada ao alterar qualquer campo do formulário
  const handleChange = (e) => {
    setUserData({
      ...userData, // Mantém os valores atuais dos outros campos
      [e.target.name]: e.target.value, // Atualiza o campo que foi alterado
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
        body: JSON.stringify({
          cpf: userData.cpf,
          senha: userData.senha,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log("Nome retornado do backend:", result.nome);
        localStorage.setItem('agente_id', result.agente_id);
        localStorage.setItem('orgao_id', result.orgao_id);
        localStorage.setItem('nome', result.nome); // Salvando o nome do usuário no localStorage
        localStorage.setItem('cpf', result.cpf);   // Salvando o CPF no localStorage
        localStorage.setItem('nivel_acesso', result.nivel_acesso.toString()); // Garantir que nivel_acesso seja uma string

        setIsLoadingRamais(true);

        const ramaisResponse = await fetch(
          `http://localhost:3001/api/ramais?orgao_id=${result.orgao_id}`
        );
        const ramaisData = await ramaisResponse.json();

        setRamais(ramaisData);
        setIsLoadingRamais(false);
        setShowRamalField(true);
        setButtonLabel('Entrar'); // Altera o texto do botão
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    const initializeWebSocket = () => {
      const websocket = new WebSocket('ws://localhost:8080');
      setWs(websocket);

      websocket.onopen = () => {
        const agente_id = localStorage.getItem('agente_id');
        if (agente_id) {
          websocket.send(JSON.stringify({ agente_id }));
          console.log('Enviando agente_id via WebSocket:', agente_id);
        } else {
          console.error('Erro: agente_id não encontrado no localStorage');
        }
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Mensagem recebida no frontend:', data);
      };

      websocket.onclose = () => {
        console.log('WebSocket desconectado.');
      };
    };

    // Somente inicializa o WebSocket se o login foi realizado com sucesso
    if (localStorage.getItem('agente_id')) {
      initializeWebSocket();
    }
  }, []);

  const handleRamalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/select_ramal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ramal: userData.ramal,
          ramal_id: userData.ramal_id,  // Adiciona o ramal_id
          agente_id: localStorage.getItem('agente_id'),  // Adiciona o agente_id, se necessário
        }), // Envia o ramal selecionado
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem('ramal', userData.ramal);
        localStorage.setItem('cpf', userData.cpf);
        localStorage.setItem('ramal_id', userData.ramal_id); 
        navigate('/Main');  // Redireciona para o sistema
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao selecionar ramal:', error);
      alert('Erro ao selecionar ramal. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
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
        <Box component="form" onSubmit={showRamalField ? handleRamalSubmit : handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="cpf"
            autoFocus
            value={userData.cpf}
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
          {showRamalField && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="ramal-label">Ramal</InputLabel>
              <Select
                labelId="ramal-label"
                id="ramal"
                name="ramal"
                value={userData.ramal}
                label="Ramal"
                onChange={(e) => {
                  const selectedRamal = ramais.find(ramal => ramal.ramal === e.target.value); // Encontra o objeto ramal correspondente
                  setUserData({
                    ...userData,
                    ramal: selectedRamal.ramal,  // Armazena o nome/valor do ramal
                    ramal_id: selectedRamal.ramal_id,  // Armazena o ramal_id correspondente
                  });
                  setIsRamalSelected(true); // Habilita o botão após a seleção de ramal
                }}
                required
              >
                {Array.isArray(ramais) && ramais.length > 0 ? (
                  ramais.map((ramal) => (
                    <MenuItem key={ramal.ramal_id} value={ramal.ramal}>
                      {ramal.ramal}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Nenhum ramal disponível</MenuItem>
                )}
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={(showRamalField && !isRamalSelected) || isSubmitting}
          >
            {isSubmitting ? 'Verificando...' : buttonLabel}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
