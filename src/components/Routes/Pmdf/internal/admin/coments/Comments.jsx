import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Paper, Pagination, Stack } from '@mui/material';

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
      setTotalPages(response.data.totalPages); // Corrigido para capturar o total de páginas
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
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Atualiza a página
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
          siblingCount={1} // Adiciona um número de páginas vizinhas (opcional)
          boundaryCount={1} // Adiciona um número de páginas no início e no final (opcional)
        />
      </Stack>
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
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
              <p>Data de Registro: {comentario.dataRegistro}</p>
              <p>Comentário: {comentario.comentario}</p>
              <p>Atualizado em: {comentario.updatedAt}</p>
            </Paper>
          </Box>
        ))
      ) : (
        <div>{message || "Nenhum comentário encontrado"}</div>
      )}
    </>
  );
}

export default Comments;
