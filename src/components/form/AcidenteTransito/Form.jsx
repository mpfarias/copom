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
    Switch,
    Stack,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem
} from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { regioesAdministrativas } from './Const/Consts';

import FileCopyIcon from '@mui/icons-material/FileCopy';
function AcidenteTransito() {
    const [state, setState] = useState({
        naturezaAcidente: '',
        crimeNoLocal: 'false',
        nome: '',
        endereco: '',
        regiaoAdministrativa: 'Plano Piloto',
        referencia: '',
        telefone: '',
        qtdeVitimas: '',
        text01: 'PARA ACIONAMENTO DA VIATURA, É NECESSÁRIO QUE ESTEJA OCORRENDO ALGUM CRIME NO LOCAL OU CONDUTORES ESTEJAM EMBRIAGADOS. CASO ESTEJA OCORRENDO APENAS A COLISÃO SEM VÍTIMAS, ORIENTAR O SOLICITANTE A DIRIGIR-SE À DP PARA REGISTRO',
        text02: 'INFORME O SOLICITANTE PARA DESLOCAR À DP OU FAZER O REGISTRO PELA DELEGACIA ONLINE. NÃO ACIONAR A VIATURA!',
    });

    const { naturezaAcidente, crimeNoLocal, nome, endereco, regiaoAdministrativa, referencia, telefone, qtdeVitimas, text01, text02 } = state;

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    }

    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    useEffect(() => {
        setMostrarAlerta(naturezaAcidente === 'sem vítima' && crimeNoLocal === 'false');
    }, [naturezaAcidente, crimeNoLocal]);

    const handleTelefoneChange = (event) => {
        const formattedTelefone = event.target.value.replace(/\D/g, "");
        const limitedTelefone = formattedTelefone.slice(0, 11);
        setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
    };



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
                </Grid>
                <Grid item xs={12}>
                    {naturezaAcidente === 'sem vítima' && (
                        <>
                            <Alert sx={{ marginBottom: 4 }} severity="error">{text01}</Alert>
                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
                                Crime ou embriaguez no local?
                            </FormLabel>
                            <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
                                <Typography>Não</Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={crimeNoLocal === "true"}
                                            onChange={(e) => handleChange("crimeNoLocal", e.target.checked ? "true" : "false")}
                                            name="controlled-switch"
                                        />
                                    }
                                    sx={{
                                        display: 'block',

                                    }}
                                />
                                <Typography>Sim</Typography>
                            </Stack>
                            {mostrarAlerta && (
                                <Alert severity="warning">{text02}</Alert>
                            )}

                            {crimeNoLocal === 'true' && (
                                <>
                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Nome do solicitante" id="outlined-basic-endereco" label="Qual seu nome?" name="nome" onChange={e => handleChange('nome', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={nome} onCopy={() => console.log("nome")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 0, marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local do acidente?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={8}>
                                                <FormControl fullWidth>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Cidade:</FormLabel>
                                                    <Select
                                                        sx={{ marginBottom: 2 }}
                                                        placeholder="Cidade:"
                                                        value={regiaoAdministrativa}
                                                        onChange={(e) => handleChange('regiaoAdministrativa', e.target.value)}
                                                        IconComponent={KeyboardArrowDownIcon}
                                                        variant="outlined"
                                                        id="outlined-basic-regiaoAdministrativa"
                                                    >
                                                        {regioesAdministrativas.map(option => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
                                                    <Button variant="contained"
                                                        color="secondary"
                                                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                                    </Button>
                                                </CopyToClipboard>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Ponto de referência" id="outlined-basic-endereco" label="Tem ponto de referência?" name="referencia" onChange={e => handleChange('referencia', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={referencia} onCopy={() => console.log("referência")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
                                        <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
                                            <Button variant="contained"
                                                color="secondary"
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} type="number" placeholder="São quantas vítimas no local?" id="outlined-basic-endereco" label="São quantas vítimas no local?" name="qtdeVitimas" onChange={e => handleChange('qtdeVitimas', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={qtdeVitimas} onCopy={() => console.log("qtdeVitimas")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

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
