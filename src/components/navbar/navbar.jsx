import { Box } from '@mui/material';

const Navbar = () => {
    return (
        <Box sx={{
            margin: 0, // Remover margem de todos os lados
            padding: 0,
        }}>
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
                }}>
                COPOM Mulher
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
                }}>
                Formulário CAD
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
