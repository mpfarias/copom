
import { Box } from '@mui/material';


const Navbar = () => {
    return (
        <div>
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
                    width:'100%',
                    marginBottom: 0,
                }}>
                Polícia Militar do Distrito Federal
            </Box>

            <Box component="section"
                sx={{
                    p: 1,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backgroundColor: '#000066',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(20px + 1vw)',
                    width:'100%',
                    marginBottom: 0,
                }}>
                COPOM Mulher
            </Box>

            <Box component="section"
                sx={{
                    p: 1,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#ffffff',
                    backgroundColor: '#000066',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(20px + 1vw)',
                    width:'100%',
                    marginBottom: 0,
                }}>
                Formulário CAD
            </Box>
            <img
                    src={'./src/img/faixa.png'}
                    alt="Faixa"
                    style={{
                        width: '100%', // Garante que a imagem ocupe toda a largura disponível
                        height: 'auto', // Mantém a proporção da imagem
                        display: 'block', // Remove espaços em branco abaixo da imagem
                        margin:0,
                    }}
                />
        </div>
    )
}

export default Navbar
