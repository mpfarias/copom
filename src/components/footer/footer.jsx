import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';

const Item = styled(Sheet)(({ theme }) => ({
    bottom:0,
    paddingTop:5,
    paddingBottom: 0,
    width: '100%',
    height: '1.5rem',
    backgroundColor: '#000066',
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: '#ffffff',
    fontSize:12
}));


export default function Footer() {
    return (

        <Box sx={{ width: '100%' }}>
            <Stack spacing={0}>
                <Item>Copom
                    <Item>Desenvolvimento de Sistemas
                        <Item>2º Sgt M. Farias  
                            <Item>2º Sgt Gadelha</Item>
                        </Item>
                    </Item>

                </Item>
            </Stack>
        </Box>



        /*<Box sx={{
            margin: 0,
            padding: 0
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
                    fontSize: 'calc(.1px + 1vw)',
                    fontWeight: 'light',
                }}
            >

                Seção de Tecnologia
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
                    fontSize: 'calc(.1px + 1vw)',
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
                    fontSize: 'calc(.1px + 1vw)',
                    fontWeight: 'light',
                }}
            >

                2º Sgt Gadelha
            </Box>
        </Box>*/
    )
}


