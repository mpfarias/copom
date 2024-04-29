
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
                    p: 2,
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
                    p: 2,
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
        </div>
    )
}

export default Navbar
