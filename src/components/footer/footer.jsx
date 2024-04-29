import { Box } from "@mui/material"


function Footer() {
    return (

        <Box sx={{
            margin: 0, // Remover margem de todos os lados
            padding: 0,
            height:60,
            backgroundColor: '#000066',
            alignContent:'center'
        }}>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#000066',
                    margin: 0,
                    color: '#ffffff',
                    display: 'flex',
                    textAlign: 'center',
                    letterSpacing: 2,
                    justifyContent: 'center',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(5px + 1vw)',
                    fontWeight: 'light',
                }}
            >
                COPOM/PMDF - {new Date().getFullYear()}
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#000066',
                    margin: 0,
                    color: '#ffffff',
                    display: 'flex',
                    letterSpacing: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(5px + 1vw)',
                    fontWeight: 'light',
                }}
            >

                Seção de Tecnologia - COPOM
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#000066',
                    color: '#ffffff',
                    display: 'flex',
                    letterSpacing: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(5px + 1vw)',
                    fontWeight: 'light',
                }}
            >
                2º Sgt M. Farias
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#000066',
                    margin: 0,
                    color: '#ffffff',
                    height: 'auto',
                    display: 'flex',
                    letterSpacing: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Myriad Pro',
                    fontSize: 'calc(5px + 1vw)',
                    fontWeight: 'light',
                }}
            >

                2º Sgt Gadelha
            </Box>
        </Box>
    )
}

export default Footer
