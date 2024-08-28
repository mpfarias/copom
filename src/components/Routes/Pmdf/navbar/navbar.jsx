import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import LogoutButton from '../logoff/logout';

const Navbar = () => {
  const [callData, setCallData] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ws, setWs] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferNumber, setTransferNumber] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [fadeClass, setFadeClass] = useState('');
  const nomeUsuario = localStorage.getItem('nome');
  const ramal = localStorage.getItem('ramal');

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCallData(data);
      setIsCallActive(true);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'togglePause', isPaused: !isPaused }));
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  const handleTransferClick = () => {
    setShowTransferModal(true);
  };

  const handleTransferCancelClick = () => {
    setShowTransferModal(false);
    setTransferNumber('');
  };

  const handleTransferOkClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        action: 'transferCall',
        exten: transferNumber,
        channel: callData?.channel,
        context: 'from-internal'
      }));

      setShowTransferModal(false);
      setTransferNumber('');
      setTransferMessage('Transferência realizada com sucesso');
      setIsCallActive(false);
      setFadeClass('fade-in');

      setTimeout(() => {
        setFadeClass('fade-out');
      }, 4000);

      setTimeout(() => {
        setTransferMessage('');
      }, 5000);
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  const handleHangupClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        action: 'hangupCall',
        channel: callData?.channel,
      }));

      setIsCallActive(false);
    } else {
      console.error('WebSocket não está conectado');
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#346399",
        color: "#ffffff",
      }}
    >
      <Box
        component="section"
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          textAlign: "center",
          marginBottom: 0.5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Governo do Distrito Federal
      </Box>

      <Box
        component="section"
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
          textAlign: "center",
          marginBottom: 0.5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Polícia Militar do Distrito Federal
      </Box>

      <Box
        component="section"
        sx={{
          fontSize: "0.75rem",
          fontWeight: 500,
          textAlign: "center",
          marginBottom: 2,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        HEFESTO - Registro de Ocorrências
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#ffffff",
            flex: 1,
            marginBottom:2
          }}
        >
          {callData ? `${nomeUsuario}. Identificação da chamada: nº: ${callData.callerId}` : `${nomeUsuario}. Nenhuma chamada`}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: isPaused ? 'red' : 'green',
            '&:hover': {
              backgroundColor: isPaused ? 'darkred' : 'darkblue',
            },
            fontSize: "1rem",
            fontWeight: 500,
            padding: "6px 12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
          onClick={handlePauseClick}
        >
          {isPaused ? 'Sair da Pausa' : 'Pausar'}
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#B0C4DE',
            color: 'black',
            '&:hover': {
              backgroundColor: '#9AB1CE',
            },
            fontSize: "1rem",
            fontWeight: 500,
            padding: "6px 12px",
            marginLeft: 2,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
          onClick={handleHangupClick}
          disabled={!isCallActive}
        >
          Desligar
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#B0C4DE',
            color: 'black',
            '&:hover': {
              backgroundColor: '#9AB1CE',
            },
            fontSize: "1rem",
            fontWeight: 500,
            padding: "6px 12px",
            marginLeft: 2,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
          onClick={handleTransferClick}
          disabled={!isCallActive}
        >
          Transferir
        </Button>
      </Box>
      <Box
       sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0",
        
      }}>
        <Typography
          sx={{
            fontSize: "2rem",
            marginBottom: 1,
            textAlign: "left",
            letterSpacing: "0.05em",
          }}
        >
          Ramal <Box
          component="span"
          sx={{
            
            borderRadius:'5px',
            background:'white',
            color:'black',
            padding:1
          }}
          >{ramal}</Box>
        </Typography>
        <LogoutButton />
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
            transition: 'opacity 1s ease-in-out',
            opacity: fadeClass === 'fade-out' ? 0 : 1,
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {transferMessage}
        </Typography>
      )}

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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2, fontSize: "1rem", fontWeight: 500 }}>
            Transferir Chamada
          </Typography>
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            label="Número de Transferência"
            variant="outlined"
            value={transferNumber}
            onChange={(e) => setTransferNumber(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#346399', color: '#ffffff', fontWeight: 500 }}
              onClick={handleTransferOkClick}
            >
              Transferir
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#B0C4DE', color: 'black', fontWeight: 500 }}
              onClick={handleTransferCancelClick}
            >
              Cancelar
            </Button>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FFA500', color: 'black', fontWeight: 500, width: '100%' }}
            >
              Transferência Assistida
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Navbar;