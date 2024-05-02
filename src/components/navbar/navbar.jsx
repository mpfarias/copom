import React from 'react';
import { Box } from '@mui/material';


const Navbar = () => {
    return (
        <Box >
            <Box component="section"
                sx={{
                    p: 1.5,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backgroundColor: '#000066',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(10px + 1vw)',
                    width: '100%',
                    padding: 0,
                }}>
                Polícia Militar do Distrito Federal
            </Box>

            <Box component="section"
                sx={{
                    p: 1.5,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backgroundColor: '#000066',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(20px + 1vw)',
                    width: '100%',
                    marginBottom: 0,
                    padding: 0,
                }}>
                COPOM
            </Box>

            <Box component="section"
                sx={{
                    p: 1.5,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backgroundColor: '#000066',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(20px + 1vw)',
                    width: '100%',
                    marginBottom: 0,
                    padding: 0,
                }}>
                Formulário de Ocorrência CAD
            </Box>

            <Box component="section"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 0,
                    backgroundImage: 'url("https://github.com/mpfarias/copom-mulher/blob/main/src/img/faixa.png?raw=true")', // Definindo a imagem de fundo
                    backgroundRepeat: 'repeat-x', // Repete horizontal e verticalmente
                    padding: '19px', // Adiciona espaço em torno da imagem
                }}>

            </Box>
        </Box>
    )
}

export default Navbar
