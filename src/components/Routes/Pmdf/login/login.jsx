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
    usuario: '', // Armazena o nome de usuário
    senha: '', // Armazena a senha do usuário
    ramal: '', // Armazena o ramal selecionado
    nome: '', // Armazena o nome do usuário (preenchido após login)
    nivel_acesso: '' // Armazena o nível de acesso do usuário (preenchido após login)
  });

  // Define o estado inicial para armazenar a lista de ramais obtidos do backend
  const [ramais, setRamais] = useState([]); 

  // Inicializa o hook useNavigate para navegação/roteamento
  const navigate = useNavigate(); 

  // Função chamada ao alterar qualquer campo do formulário
  const handleChange = (e) => {
    // Atualiza o estado do userData com o novo valor do campo editado
    setUserData({
      ...userData, // Mantém os valores atuais dos outros campos
      [e.target.name]: e.target.value, // Atualiza o campo que foi alterado
    });
  };

  // Função chamada ao submeter o formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    try {
      // Faz uma requisição POST para o backend com os dados do formulário
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST', // Método HTTP POST
        headers: {
          'Content-Type': 'application/json', // Especifica que o conteúdo é JSON
        },
        body: JSON.stringify(userData), // Converte os dados do userData em JSON e envia no corpo da requisição
      });

      // Converte a resposta do backend em um objeto JavaScript
      const result = await response.json();

      console.log('Resposta do backend:', result); // Loga a resposta do backend no console

      if (response.status === 200) { // Verifica se o status da resposta é 200 (sucesso)
        // Login bem-sucedido

        // Armazena informações do usuário e ramal no localStorage para acesso futuro
        localStorage.setItem('agente_id', result.agente_id);
        localStorage.setItem('nome', result.nome);
        localStorage.setItem('ramal', result.ramal);
        localStorage.setItem('usuario', result.usuario);
        localStorage.setItem('nivel_acesso', result.nivel_acesso);

        // Registra o login do agente
        await fetch('http://localhost:3001/api/log_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agente_id: result.agente_id, // ID do agente retornado pelo backend
            ramal_id: result.ramal_id,   // ID do ramal retornado pelo backend
            login_time: new Date().toISOString(), // Hora do login
          }),
        });

        // Loga as informações de login no console
        console.log(`Usuário logado: ${result.nome}, Ramal selecionado: ${result.ramal}`);
        console.log('Armazenando no localStorage:', result.nivel_acesso, result.nome, result.ramal, result.usuario);
        navigate('/Main'); // Redireciona para a página principal (Main) após login bem-sucedido
      } else {
        // Caso o login falhe, exibe uma mensagem de alerta com a mensagem do backend
        alert(result.message);
      }
    } catch (error) {
      // Loga qualquer erro que ocorrer durante a tentativa de login e exibe um alerta
      console.error('Erro ao realizar login:', error);
      alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };

  // Função chamada ao fazer logout
  const handleLogout = async () => {
    try {
      // Pega os dados do agente e do ramal armazenados no localStorage
      const agente_id = localStorage.getItem('agente_id');
      const ramal_id = localStorage.getItem('ramal_id');

      // Registra o logout do agente
      await fetch('http://localhost:3001/api/log_logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agente_id: agente_id, // ID do agente armazenado
          ramal_id: ramal_id,   // ID do ramal armazenado
          logout_time: new Date().toISOString(), // Hora do logout
        }),
      });

      // Limpa o localStorage e redireciona para a página de login
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  // Função para buscar os ramais ao carregar o componente
  useEffect(() => {
    const fetchRamais = async () => {
      try {
        // Faz uma requisição GET para o backend para obter a lista de ramais
        const response = await fetch('http://localhost:3001/api/ramais');
        const ramaisData = await response.json(); // Converte a resposta em um objeto JavaScript
        setRamais(ramaisData); // Armazena a lista de ramais no estado
      } catch (error) {
        // Loga qualquer erro que ocorrer durante a tentativa de buscar os ramais
        console.error('Erro ao buscar ramais:', error);
      }
    };

    fetchRamais(); // Chama a função fetchRamais ao montar o componente
  }, []); // Executa apenas uma vez quando o componente monta

  // Renderiza o formulário de login
  return (
    <Container maxWidth="xs"> {/* Define o container com um tamanho máximo "xs" (extra pequeno) */}
      <Box
        sx={{
          marginTop: 8, // Define uma margem superior de 8 unidades de espaçamento
          display: 'flex', // Define o layout flexível
          flexDirection: 'column', // Alinha os itens em uma coluna
          alignItems: 'center', // Centraliza os itens horizontalmente
        }}
      >
        <Typography component="h1" variant="h5"> {/* Define o título da página como "Login" */}
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}> {/* Define o formulário que chama handleSubmit no envio */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Usuário"
            name="usuario"
            autoComplete="username"
            autoFocus
            value={userData.usuario} // Vincula o valor ao estado userData.usuario
            onChange={handleChange} // Chama handleChange ao modificar o campo
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
            value={userData.senha} // Vincula o valor ao estado userData.senha
            onChange={handleChange} // Chama handleChange ao modificar o campo
          />
          <FormControl fullWidth margin="normal"> {/* Componente para selecionar o ramal */}
            <InputLabel id="ramal-label">Ramal</InputLabel> {/* Label para o campo de seleção de ramal */}
            <Select
              labelId="ramal-label"
              id="ramal"
              name="ramal"
              value={userData.ramal} // Vincula o valor ao estado userData.ramal
              label="Ramal"
              onChange={handleChange} // Chama handleChange ao modificar o campo
              required
            >
              {/* Mapeia a lista de ramais e cria um MenuItem para cada ramal */}
              {ramais.map((ramal) => (
                <MenuItem key={ramal.ramal_id} value={ramal.ramal}>
                  {ramal.ramal} {/* Exibe o número do ramal */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained" // Estilo do botão como "contained" (preenchido)
            sx={{ mt: 3, mb: 2 }} // Define margens superior e inferior para o botão
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

// Exporta o componente Login como padrão, para que possa ser importado em outros arquivos
export default Login;
