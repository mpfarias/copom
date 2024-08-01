import React, { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { Box, Grid } from '@mui/material';

import { styled } from '@mui/joy/styles';

const Item = styled(Sheet)(({ theme }) => ({
    bottom: 0,
    paddingTop: 8,
    paddingBottom: 0,
    width: '100%',
    height: '2rem',
    backgroundColor: '#346399',
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: '#ffffff',
    fontSize: 12
}));


export default function Footer() {
    const [ip, setIp] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Função para atualizar a hora
    const updateClock = () => {
        setCurrentTime(new Date());
    };


    useEffect(() => {

        const timerID = setInterval(updateClock, 1000);

        return () => clearInterval(timerID);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    useEffect(() => {
        // Função para buscar o IP
        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error('Erro ao obter o IP:', error);
            }
        };

        fetchIp();
    }, []);
    return (
        <Grid container sx={{ flex: 1 }}>
            <Grid item md={4}>
                <Box sx={{ width: '100%', marginBottom: 0 }}>
                    <Stack spacing={0}>
                        
                        <Item>Polícia Militar do Distrito Federal
                            <Item></Item>
                            <Item></Item>
                        </Item>
                    </Stack>
                </Box>
            </Grid>
            <Grid item md={4}>
                <Box sx={{ width: '100%', marginBottom: 0 }}>
                    <Stack spacing={0}>

                        <Item>HEFESTO - Sistema de Gereciamento de Atedimento de Ocorrências
                            <Item>IP: {ip ? ip : 'Carregando...'} - {formattedDate} - {formattedTime}</Item>
                            <Item></Item>
                        </Item>
                    </Stack>
                </Box>
            </Grid>
            <Grid item md={4}>
                <Box sx={{ width: '100%', marginBottom: 0 }}>
                    <Stack spacing={0}>
                        <Item>Desenvolvido por:
                            <Item>2º Sgt Marcelo Pires de Farias - (61) 9 9972-9293</Item>
                            <Item>2º Sgt Rafael Gadelha de Menezes - (61) 9 9277-1680</Item>
                        </Item>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}


