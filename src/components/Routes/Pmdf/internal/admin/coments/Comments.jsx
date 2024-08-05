import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Paper, Pagination, Stack, Divider, styled, Alert, AlertTitle } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Comments() {
  const [comentarios, setComentarios] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

          let alertSeverity;
          const testeRegex = /teste\d*/i;
          if (comentario.comentario === 'teste' || testeRegex.test(comentario.comentario) ) {
            alertSeverity = 'error';
          } else {
            alertSeverity = 'success';
          }

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
              <Paper >
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Item><Alert icon={false} severity={alertSeverity}>
                    {comentario.id}
                  </Alert></Item>
                  <Item>IP da Rede: {comentario.ipMaquina}</Item>
                </Stack>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Comentário</AlertTitle>
                  {comentario.comentario}
                  <AlertTitle></AlertTitle>
                  Autor: {comentario.usuario}
                </Alert>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <Item>Data do Registro: {formattedDate}, às {formattedTime}</Item>
                  <Item>IP da Máquina: {comentario.ipRede}</Item>
                </Stack>
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
