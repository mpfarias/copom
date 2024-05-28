import React, { useEffect, useState } from 'react'
import {
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid,
    Alert,
} from '@mui/material';

function AcidenteTransito() {
    const [state, setState] = useState({
        naturezaAcidente: '',
        crimeNoLocal: '',
        text01: 'PARA ACIONAMENTO DA VIATURA, É NECESSÁRIO QUE ESTEJA OCORRENDO ALGUM CRIME NO LOCAL OU CONDUTORES ESTEJAM EMBRIAGADOS. CASO ESTEJA OCORRENDO APENAS A COLISÃO SEM VÍTIMAS, ORIENTAR O SOLICITANTE A DIRIGIR-SE À DP PARA REGISTRO',
        text02: 'INFORME O SOLICITANTE PARA DESLOCAR À DP OU FAZER O REGISTRO PELA DELEGACIA ONLINE. NÃO ACIONAR A VIATURA!',
        text03: 'EM PRODUÇÃO!'
    });

    const { naturezaAcidente, crimeNoLocal, text01, text02, text03 } = state;

    return (
        <Box paddingRight={2} marginTop={4} marginBottom={8}>
            <Grid container sx={{ marginLeft: 1, width: '100%' }} spacing={3}>
                <Grid item style={{ paddingTop: 0 }} xs={12}>
                    <FormLabel style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                    }} id="demo-controlled-radio-buttons-group">ACIDENTE DE TRÂNSITO</FormLabel>
                    <Box sx={{ mt: 2 }} noValidate autoComplete="off">
                        <FormControl>
                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-row-radio-buttons-group-label">Qual foi a natureza do acidente?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                id="naturezaAcidente"
                                value={naturezaAcidente}
                                onChange={(event) => setState({ ...state, naturezaAcidente: event.target.value })}
                            >
                                <FormControlLabel value="sem vítima" control={<Radio />} label="Sem vítima" />
                                <FormControlLabel value="com vítima" control={<Radio />} label="Com vítima" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {naturezaAcidente === 'sem vítima' && (
                        <>
                            <Alert severity="error">{text01}</Alert>
                            <FormControl sx={{ marginTop: 2 }}>
                                <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-row-radio-buttons-group-label">Crime ou embriaguez no local?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    id='crimeNoLocal'
                                    value={crimeNoLocal}
                                    onChange={(event) => setState({ ...state, crimeNoLocal: event.target.value })}
                                >
                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="não" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            {crimeNoLocal === 'sim' && (
                                <Alert severity="warning">{text03}</Alert>
                            )}
                            {crimeNoLocal === 'não' && (
                                <>
                                    <Alert severity="warning">{text02}</Alert>
                                </>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default AcidenteTransito
