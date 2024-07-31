import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import {Box, Grid} from '@mui/material';

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
    return (
        <Grid container sx={{ flex: 1}}>
            <Grid item md={4}>
                <Box sx={{ width: '100%', marginBottom: 0 }}>
                    <Stack spacing={0}>
                    <Item></Item>
                        <Item>Polícia Militar do Distrito Federal
                            <Item></Item>
                        </Item>
                    </Stack>
                </Box>
            </Grid>
            <Grid item md={4}>
                <Box sx={{ width: '100%', marginBottom: 0 }}>
                    <Stack spacing={0}>
                    <Item></Item>
                        <Item>HEFESTO - Sistema de Criação e Despacho de Ocorrências
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


