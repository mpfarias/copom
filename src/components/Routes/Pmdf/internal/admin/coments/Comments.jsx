import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Paper, Pagination, Stack } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Comments() {
  const [comentarios, setComentarios] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const limit = 10; 

  const getHome = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8080/Admins/comentarios?page=${page}&limit=${limit}`);
      setComentarios(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("API não conectada!");
      }
    }
  };

  useEffect(() => {
    getHome(page);
    const interval = setInterval(() => {
      getHome(page);
    }, 1000); 
    
    return () => clearInterval(interval);
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          siblingCount={1}
          boundaryCount={1} 
        />
      </Stack>
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => {
          
          const formattedDate = format(new Date(comentario.dataRegistro), 'dd/MM/yyyy', { locale: ptBR });
          const formattedTime = format(new Date(comentario.dataRegistro), 'HH:mm:ss', { locale: ptBR });
          
          return (
            <Box
              key={comentario.id}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 'auto',
                  height: 'auto',
                  padding: 2
                },
              }}
            >
              <Paper>
                <p>IP da Máquina: {comentario.ipMaquina}</p>
                <p>Data do Registro: {formattedDate}</p>
                <p>Hora do Registro: {formattedTime}</p>
                <p>Comentário: {comentario.comentario}</p>
              </Paper>
            </Box>
          );
        })
      ) : (
        <div>{message || "Nenhum comentário encontrado"}</div>
      )}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </>
  );
}

export default Comments;
