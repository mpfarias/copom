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
    MenuItem,
    Snackbar,
    FormGroup,
    Checkbox
} from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { regioesAdministrativas, crimes } from './Const/Consts';

import FileCopyIcon from '@mui/icons-material/FileCopy';
function AcidenteTransito() {
    const [state, setState] = useState({
        naturezaAcidente: '',
        crimeNoLocal: 'false',
        crime: 'embriagado',
        nome: '',
        endereco: '',
        regiaoAdministrativa: 'Plano Piloto',
        referencia: '',
        telefone: '',
        narrativa: '',
        text01: 'PARA ACIONAMENTO DA VIATURA, É NECESSÁRIO QUE ESTEJA OCORRENDO ALGUM CRIME NO LOCAL OU CONDUTORES ESTEJAM EMBRIAGADOS. CASO ESTEJA OCORRENDO APENAS A COLISÃO SEM VÍTIMAS, ORIENTAR O SOLICITANTE A DIRIGIR-SE À DP PARA REGISTRO',
        text02: 'INFORME O SOLICITANTE PARA DESLOCAR À DP OU FAZER O REGISTRO PELA DELEGACIA ONLINE. NÃO ACIONAR A VIATURA!',
    });

    const { naturezaAcidente, crimeNoLocal, crime, nome, endereco, regiaoAdministrativa, referencia, telefone, text01, text02, narrativa } = state;

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    }

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [crimesSelecionados, setCrimesSelecionados] = useState([]);

    const handleCrimeChange = (crime) => (event) => {
        if (event.target.checked) {
            setCrimesSelecionados([...crimesSelecionados, crime]);
        } else {
            setCrimesSelecionados(crimesSelecionados.filter(c => c !== crime));
        }
    };

    useEffect(() => {
        setMostrarAlerta(naturezaAcidente === 'sem vítima' && crimeNoLocal === 'false');
    }, [naturezaAcidente, crimeNoLocal]);

    const handleTelefoneChange = (event) => {
        const formattedTelefone = event.target.value.replace(/\D/g, "");
        const limitedTelefone = formattedTelefone.slice(0, 11);
        setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
    };

    useEffect(() => {
        const text = `Acidente ${naturezaAcidente}
    
        * A pessoa de NOME: ${nome.toUpperCase()}, telefone ${telefone}, informa que houve um acidente ${naturezaAcidente.toUpperCase()} em ${endereco.toUpperCase()}, cidade: ${regiaoAdministrativa.toUpperCase()}, ${referencia.toUpperCase()}, porém pede VIATURA para dar apoio na situação, pois tem ${crime === 'sofrendo' ? `pessoa ${crime} ${crimesSelecionados.join(', ')}` : `condutor ${crime}`} no local.`;

        setState(prevState => ({ ...prevState, narrativa: text }));
    }, [naturezaAcidente, nome, endereco, referencia, regiaoAdministrativa, telefone, crime, crimesSelecionados]);

    const crimesValues = crimes.map(crime => crime.value);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
                    {naturezaAcidente === 'sem vítima' || naturezaAcidente === 'com vítima' && (
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
                                <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local do acidente?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
                                <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
                                    <Button variant="contained"
                                        color="secondary"
                                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                    </Button>
                                </CopyToClipboard>
                            </Grid>

                            <Grid item xs={12} sm={6} marginBottom={4}>
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
                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
                                Houve crime ou embriaguez no local?
                            </FormLabel>
                            <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
                                <Typography>Embriaguez</Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={crime === "sofrendo"}
                                            onChange={(e) => handleChange("crime", e.target.checked ? "sofrendo" : "embriagado")}
                                            name="controlled-switch"
                                        />
                                    }
                                    sx={{
                                        display: 'block',

                                    }}
                                />
                                <Typography>Crime</Typography>
                            </Stack>
                            {crime === 'sofrendo' && (
                                <>
                                    <Grid item xs={12} sm={10}>
                                        <FormGroup>
                                            {crimesValues.map(crimeValue => ( // Itera sobre os valores dos crimes
                                                <FormControlLabel
                                                    key={crimeValue}
                                                    control={
                                                        <Checkbox
                                                            checked={crimesSelecionados.includes(crimeValue)}
                                                            onChange={handleCrimeChange(crimeValue)}
                                                        />
                                                    }
                                                    label={crimeValue} // Exibe o valor do crime como label
                                                />
                                            ))}
                                        </FormGroup>
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12} sx={{ mb: 4 }}>
                                <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>

                                <TextField
                                    className="narrativa-text"
                                    sx={{
                                        backgroundColor: 'rgba(0, 200, 0, 0.1)',
                                    }}
                                    multiline
                                    fullWidth
                                    value={narrativa}
                                    InputProps={{
                                        disabled: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CopyToClipboard text={narrativa} onCopy={() => console.log("narrativa")}>
                                    <Button variant="contained"
                                        color="secondary"
                                        onClick={handleClick}
                                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto
                                    </Button>
                                </CopyToClipboard>
                            </Grid>
                            <Snackbar
                                sx={{
                                    top: '70%',
                                    marginLeft: '26%'
                                }}
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}>
                                <Alert severity="warning">Texto COPIADO</Alert>
                            </Snackbar>
                        </>
                    )}
                </>
                            )}
            </Grid>
        </Grid>
        </Box >
    )
}

export default AcidenteTransito
