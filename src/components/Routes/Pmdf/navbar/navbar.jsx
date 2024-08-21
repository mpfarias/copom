import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

const Navbar = () => {
  const [callData, setCallData] = useState(null); // Armazena todos os dados da chamada
  const [isCallActive, setIsCallActive] = useState(false); // Indica se há uma chamada ativa
  const [isPaused, setIsPaused] = useState(false);
  const [ws, setWs] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferNumber, setTransferNumber] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [fadeClass, setFadeClass] = useState(''); // Estado para controlar o fade

  useEffect(() => {
    // Conectando ao WebSocket do backend
    const websocket = new WebSocket('ws://localhost:8080');
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCallData(data); // Armazena os dados da chamada ativa
      setIsCallActive(true); // Define que há uma chamada ativa
    };

    return () => {
      websocket.close();
    };
  }, []);

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Enviando solicitação de pausa:', !isPaused);
      ws.send(JSON.stringify({ action: 'togglePause', isPaused: !isPaused }));
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  const handleTransferClick = () => {
    setShowTransferModal(true); // Abre a modal de transferência
  };

  const handleTransferCancelClick = () => {
    setShowTransferModal(false); // Fecha a modal de transferência
    setTransferNumber(''); // Limpa o campo de transferência
  };

  const handleTransferOkClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Enviando solicitação de transferência:', transferNumber);
      ws.send(JSON.stringify({
        action: 'transferCall',
        exten: transferNumber,  // Número para o qual a chamada será transferida
        channel: callData?.channel,  // Canal da chamada (assumindo que o canal está em callData)
        context: 'from-internal'  // Contexto onde a transferência ocorrerá
      }));

      // Desabilitar os botões após a transferência
      setShowTransferModal(false); // Fecha a modal após efetuar a transferência
      setTransferNumber(''); // Limpa o campo de transferência
      setTransferMessage('Transferência realizada com sucesso'); // Exibe mensagem de sucesso
      setIsCallActive(false); // Desabilita os botões desligar e transferir
      setFadeClass('fade-in'); // Inicia o fade in

      // Configura um temporizador para iniciar o fade out após 4 segundos e remover a mensagem após 5 segundos
      setTimeout(() => {
        setFadeClass('fade-out'); // Inicia o fade out
      }, 4000);

      setTimeout(() => {
        setTransferMessage(''); // Limpa a mensagem após o fade out
      }, 5000);
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  // Função para desligar a chamada em andamento
  const handleHangupClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Envia uma solicitação de desligamento de chamada ao servidor via WebSocket
      ws.send(JSON.stringify({
        action: 'hangupCall',
        channel: callData?.channel,  // Canal da chamada a ser desligada
      }));
      
      // Desabilitar os botões após o desligamento
      setIsCallActive(false); // Desabilita os botões desligar e transferir
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
        color: "#ffffff",
        backgroundColor: "#346399",
        fontSize: "calc(16px + 1vw)",
        width: "100%",
        padding: 0,
        marginBottom: 5
      }}
    >
      <Box component="section">
        Governo do Distrito Federal
      </Box>

      <Box component="section" sx={{ marginBottom: 0 }}>
        Secretaria de Segurança Pública
      </Box>

      <Box component="section" sx={{ paddingBottom: 2 }}>
        HEFESTO - Registro de Ocorrências
      </Box>

      <Box
        component="section"
        sx={{
          paddingBottom: 2,
          textAlign: 'left',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography
          sx={{
            marginRight: 2,
            fontSize: "calc(14px + 1vw)",
            color: "#ffffff",
          }}
        >
          {callData ? `Identificação da chamada: ${callData.callerId}` : 'Identificação da chamada:'}
        </Typography>

        <Button
          variant="contained"
          sx={{
            width: 500,
            height: 60,
            marginLeft: 2,
            backgroundColor: isPaused ? 'red' : 'green',
            '&:hover': {
              backgroundColor: isPaused ? 'darkred' : 'darkblue',
            },
          }}
          onClick={handlePauseClick}
        >
          {isPaused ? 'Sair da Pausa' : 'Pausar'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{
              marginRight: 2,
              color: 'black',
              backgroundColor: '#B0C4DE',
              '&:hover': {
                backgroundColor: '#B0C4DE',
              },
            }}
            onClick={handleHangupClick}
            disabled={!isCallActive} // Botão desabilitado se não houver chamada ativa
          >
            Desligar
          </Button>

          <Button
            variant="contained"
            sx={{
              color: 'black',
              backgroundColor: '#B0C4DE',
              '&:hover': {
                backgroundColor: '#B0C4DE',
              },
            }}
            onClick={handleTransferClick}
            disabled={!isCallActive} // Botão desabilitado se não houver chamada ativa
          >
            Transferir
          </Button>
        </Box>
      </Box>

      {transferMessage && (
        <Typography
          className={fadeClass}
          sx={{
            color: 'white',
            backgroundColor: 'green',
            padding: '8px',
            borderRadius: '4px',
            marginTop: 2,
            textAlign: 'center',
            width: 'fit-content',
            transition: 'opacity 1s ease-in-out',
            opacity: fadeClass === 'fade-out' ? 0 : 1,
          }}
        >
          {transferMessage}
        </Typography>
      )}

      {/* Modal de transferência */}
      <Modal
        open={showTransferModal}
        onClose={handleTransferCancelClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Transferir Chamada
          </Typography>
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label="Número de Transferência"
            variant="outlined"
            value={transferNumber}
            onChange={(e) => setTransferNumber(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleTransferOkClick}>
              Transferir
            </Button>
            <Button variant="contained" color="secondary" onClick={handleTransferCancelClick}>
              Cancelar
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#FFA500', marginLeft: 2 }} fullWidth>
              Transferência Assistida
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Navbar;
