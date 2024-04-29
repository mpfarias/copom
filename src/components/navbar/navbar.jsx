
import Box from '@mui/material/Box';

const Navbar = () => {
    return (
        <>
        <Box component="section"
            sx={{
                p: 1.5,
                height: 10,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                color: '#ffffff',
                backgroundColor: '#000066',
                fontFamily: 'Myriad Pro',
                fontSize: '20px'
            }}>
            Polícia Militar do Distrito Federal
        </Box>
        <Box component="section"
            sx={{
                p: 2,
                height: 20,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                color: '#ffffff',
                backgroundColor: '#000066',
                fontFamily: 'Myriad Pro',
                fontSize: '40px'
            }}>
            COPOM Mulher
        </Box>
        <Box component="section"
            sx={{
                p: 2,
                height: 20,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                color: '#ffffff',
                backgroundColor: '#000066',
                fontFamily: 'Myriad Pro',
                fontSize: '40px'
            }}>
            Formulário de cadastro
        </Box>
        </>
    )
}

export default Navbar
