import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LogoutButton from '../logoff/logout';

const Navbar = () => {
  const [callData, setCallData] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ws, setWs] = useState(null);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [pauseMessage, setPauseMessage] = useState(''); // Nova variável para controlar a mensagem de pausa
  const [logPausaId, setLogPausaId] = useState(null); // ID da pausa para atualizar depois
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferNumber, setTransferNumber] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [fadeClass, setFadeClass] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [pauseTime, setPauseTime] = useState(0); 
  const [motivos, setMotivos] = useState([]); // Estado para armazenar os motivos de pausa

  const nomeUsuario = localStorage.getItem('nome');
  const agenteId = localStorage.getItem('agente_id'); // Assumindo que o ID do agente está salvo no localStorage
  const ramal = localStorage.getItem('ramal');



  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080'); // Criando uma nova conexão WebSocket
    setWs(websocket); // Armazenando a conexão WebSocket no estado

    // Definindo o comportamento quando o WebSocket receber uma mensagem
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Convertendo a mensagem recebida em objeto JSON

      console.log('Mensagem recebida no frontend:', data); // Verifica o conteúdo de `data`

      if (data && data.callerId && data.channel) {
        setCallData(data); // Armazena os dados da chamada no estado
        setIsCallActive(true); // Marca a chamada como ativa
      }
      // Verifica se a chamada foi encerrada
      else if (data && data.callEnded) {
        console.log('Chamada encerrada, desativando botões:', data.callEnded); // Certifique-se de que este log está sendo atingido
        setCallData(null); // Limpa os dados da chamada
        setIsCallActive(false); // Marca a chamada como inativa
      }
    };


    // Função de limpeza que fecha o WebSocket quando o componente é desmontado
    return () => {
      websocket.close();
    };
  }, []); // O array vazio como segundo argumento garante que este useEffect execute apenas uma vez, ao montar o componente

  const fetchMotivosPausa = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/motivos-pausa'); // Ajuste a URL conforme necessário
      const data = await response.json();
      setMotivos(data); // Armazena os motivos no estado
    } catch (error) {
      console.error('Erro ao buscar motivos de pausa:', error);
    }
  };

// Função para converter segundos para o formato "mm:ss"
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const startTimer = () => {
  const id = setInterval(() => {
    setPauseTime(prevTime => prevTime + 1);
  }, 1000);
  setIntervalId(id);
};

const stopTimer = () => {
  clearInterval(intervalId);
  setIntervalId(null);
};


  // Confirma o início da pausa
  const handlePauseConfirm = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pausar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agente_id: agenteId,
          motivo: pauseReason,  // Enviar o motivo selecionado
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsPaused(true);
        setPauseMessage(`Pausa para ${pauseReason}`);
        setLogPausaId(data.log_pausa_id);  // Salva o ID da pausa para usar ao sair da pausa
        setPauseTime(0); // Reseta o cronômetro
        startTimer(); // Inicia o cronômetro
      }
    } catch (error) {
      console.error('Erro ao iniciar a pausa:', error);
    }

    setShowPauseModal(false);
  };


  //Função para sair da pausa
  const handleSairDaPausa = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sair-da-pausa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          log_pausa_id: logPausaId, // Envia o ID da pausa para atualizar
        }),
      });
      if (response.ok) {
        setIsPaused(false);
        setPauseMessage(''); // Limpa a mensagem de pausa
        stopTimer(); // Para o cronômetro
      }
    } catch (error) {
      console.error('Erro ao finalizar a pausa:', error);
    }
  };


  const handlePauseCancel = () => {
    setShowPauseModal(false);  // Cancela a pausa e fecha o modal
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

  const handlePauseClick = () => {
    if (!isPaused) {
      setShowPauseModal(true); // Abre o modal ao clicar em "Pausar"
      fetchMotivosPausa();      // Busca os motivos ao abrir o modal
    } else {
      handleSairDaPausa();
      setIsPaused(false);
      setPauseMessage(''); // Remove a mensagem ao sair da pausa
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'togglePause', isPaused: false }));
      } else {
        console.error('WebSocket não está conectado');
      }
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
            marginBottom: 2
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
          disabled={!isCallActive} // Este botão deve ser desativado quando `isCallActive` for false
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
          disabled={!isCallActive} // Este botão deve ser desativado quando `isCallActive` for false
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

              borderRadius: '5px',
              background: 'white',
              color: 'black',
              padding: 1
            }}
          >{ramal}</Box>
        </Typography>

        {/* Mensagem de pausa */}
        {isPaused && pauseMessage && (
          <Typography
            sx={{
              marginLeft: 2,
              fontSize: '1.2rem', // Aumenta o tamanho da fonte
              color: 'red', // Destaca o texto em vermelho
              fontWeight: 600, // Deixa o texto mais "pesado"
              backgroundColor: 'white',
              borderRadius: '3px',
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            {pauseMessage}: {formatTime(pauseTime)}
          </Typography>
        )}
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


      {/* Modal de Pausa */}
      <Modal open={showPauseModal} onClose={handlePauseCancel}>
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Escolha o motivo da pausa
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="pause-reason-label">Motivo da Pausa</InputLabel>
            <Select
              labelId="pause-reason-label"
              id="pause-reason-select"
              value={pauseReason}
              label="Motivo da Pausa"
              onChange={(e) => setPauseReason(e.target.value)}
            >
              {motivos.map((motivo) => (
                <MenuItem key={motivo.pausa_id} value={motivo.mot_pausa}>
                  {motivo.mot_pausa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handlePauseConfirm}>
              OK
            </Button>
            <Button variant="contained" color="secondary" onClick={handlePauseCancel}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

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