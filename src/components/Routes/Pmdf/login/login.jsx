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
    cpf: '', // Armazena o nome de usuário
    senha: '', // Armazena a senha do usuário
    ramal: '', // Armazena o ramal selecionado
    nome: '', // Armazena o nome do usuário (preenchido após login)
    nivel_acesso: '' // Armazena o nível de acesso do usuário (preenchido após login)
  });
  const [ramais, setRamais] = useState([]);
  const [showRamalField, setShowRamalField] = useState(false);
  const [isLoadingRamais, setIsLoadingRamais] = useState(true); // Novo estado para controlar o loading dos ramais
  const [buttonLabel, setButtonLabel] = useState('Escolher ramal');
  const [isRamalSelected, setIsRamalSelected] = useState(false);
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
        localStorage.setItem('orgao_id', result.orgao_id);
        localStorage.setItem('nome', result.nome); // Salvando o nome do usuário no localStorage
        console.log('Nome retornado do backend:', result.nome);
        console.log('Nome salvo no localStorage:', localStorage.getItem('nome'));
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

  // Função para buscar os ramais ao carregar o componente
  useEffect(() => {
    const fetchRamais = async () => {
      try {
        // Obtém o orgao_id do localStorage
        const orgaoId = localStorage.getItem('orgao_id');

        // Adicione um log para garantir que o orgao_id está correto
        console.log("orgao_id obtido do localStorage:", orgaoId);

        // Se o orgao_id for nulo ou indefinido, exiba um erro
        if (!orgaoId) {
          console.error("Erro: orgao_id não encontrado no localStorage");
          return;
        }

        // Faz a requisição GET para o backend para obter a lista de ramais
        const response = await fetch(`http://localhost:3001/api/ramais?orgao_id=${orgaoId}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na requisição de ramais: ${response.statusText}`);
        }

        const ramaisData = await response.json(); // Converte a resposta em um objeto JavaScript

        // Armazena a lista de ramais no estado
        setRamais(ramaisData);

        console.log("Ramais carregados:", ramaisData);
      } catch (error) {
        console.error('Erro ao buscar ramais:', error);
      }
    };

    fetchRamais(); // Chama a função fetchRamais ao montar o componente
  }, []);

  // Confirmação de acesso ao sistema
  const handleRamalSubmit = async (e) => {
    e.preventDefault();

    // Adicionando log para verificar o ramal no frontend antes de enviar ao backend
    console.log('Ramal selecionado para envio:', userData.ramal);

    try {
      const response = await fetch('http://localhost:3001/api/select_ramal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ramal: userData.ramal })  // Envia o ramal selecionado
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log("LOGIN COM RAMAL EFETIVADO COM SUCESSO");

        // Armazena o ramal no localStorage para usar no WebSocket e logout
        localStorage.setItem('ramal', userData.ramal);
        localStorage.setItem('cpf', userData.cpf);

        // Após o login bem-sucedido, podemos agora conectar o ramal ao WebSocket ou Asterisk
        // Função para adicionar o ramal à fila (Você pode ativar isso se for necessário logo após o login)
        // await addMemberToQueue(userData.ramal, 'nome_da_fila');

        navigate('/Main');  // Redireciona para o sistema
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao selecionar ramal:', error);
      alert('Erro ao selecionar ramal. Tente novamente mais tarde.');
    }
  };



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
        <Box component="form" onSubmit={showRamalField ? handleRamalSubmit : handleSubmit} sx={{ mt: 1 }}> {/* Define o formulário que chama handleSubmit no envio */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="cpf"
            autoFocus
            value={userData.cpf} // Vincula o valor ao estado userData.cpf
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
          {/* Exibe o select dos ramais após a autenticação */}
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
                  handleChange(e);
                  setIsRamalSelected(true);  // Habilita o botão após a seleção de ramal
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
          {/* O botão muda de "Escolher ramal" para "Entrar" */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={showRamalField && !isRamalSelected}  // O botão "Entrar" fica desabilitado até que um ramal seja selecionado
          >
            {buttonLabel}  {/* Texto dinâmico do botão */}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

// Exporta o componente Login como padrão, para que possa ser importado em outros arquivos
export default Login;
