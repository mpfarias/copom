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

import { regioesAdministrativas, crimes, tiposDeDanos, estadoVitimaOption, qtdeVitimas, tipoAcidenteOption } from './Const/Consts';

import FileCopyIcon from '@mui/icons-material/FileCopy';

function AcidenteTransito() {

    const [state, setState] = useState({
        naturezaAcidente: '',
        crimeNoLocal: 'false',
        crime: 'dano',
        nome: '',
        endereco: '',
        regiaoAdministrativa: 'Plano Piloto',
        referencia: '',
        telefone: '',
        vitimas: [],
        estadoVitima: [],
        tipoAcidente: [],
        colisao: 'true',
        narrativa: '',
        text01: 'PARA ACIONAMENTO DA VIATURA, É NECESSÁRIO QUE TENHA OCORRIDO DANO AO PATRIMÔNIO PÚBLICO OU QUE ESTEJA OCORRENDO ALGUM CRIME NO LOCAL OU CONDUTORES ESTEJAM EMBRIAGADOS. CASO TENHA OCORRIDO APENAS A COLISÃO SEM VÍTIMAS, ORIENTAR O SOLICITANTE A DIRIGIR-SE À DP PARA REGISTRO',
        text02: 'INFORME O SOLICITANTE PARA DESLOCAR À DP OU FAZER O REGISTRO PELA DELEGACIA ONLINE. NÃO ACIONAR A VIATURA!',
        text03: 'ATENÇÃO: NESSE CASO O SOLICITANTE DEVE SOLICITAR O CORPO DE BOMBEIROS MILITAR. TRANSFIRA O SOLICITANTE PARA O 193'
    });

    const { naturezaAcidente, crimeNoLocal, crime, nome, endereco, regiaoAdministrativa, referencia, telefone, colisao, vitimas, estadoVitima, tipoAcidente, text01, text02, text03, narrativa } = state;

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    }

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [crimesSelecionados, setCrimesSelecionados] = useState([]);
    const [danosSelecionados, setDanosSelecionados] = useState([]);


    useEffect(() => {
        setMostrarAlerta(naturezaAcidente === 'sem vítima' && crimeNoLocal === 'false');
    }, [naturezaAcidente, crimeNoLocal]);

    const handleTelefoneChange = (event) => {
        const formattedTelefone = event.target.value.replace(/\D/g, "");
        const limitedTelefone = formattedTelefone.slice(0, 11);
        setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
    };



    const crimesValues = crimes.map(crime => crime.value);
    const danosValues = tiposDeDanos.map(crime => crime.value)
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

    const handleCheckboxChange = (field, value) => {
        setState(prevState => ({
            ...prevState,
            [field]: prevState[field].includes(value)
                ? prevState[field].filter(item => item !== value)
                : [...prevState[field], value]
        }));
    };


    const handleCrimeChange = (crimeValue) => {
        setCrimesSelecionados(prevState =>
            prevState.includes(crimeValue)
                ? prevState.filter(crime => crime !== crimeValue)
                : [...prevState, crimeValue]
        );
    };


    const handleDanoChange = (danoValue) => {
        setDanosSelecionados(prevState =>
            prevState.includes(danoValue)
                ? prevState.filter(crime => crime !== danoValue)
                : [...prevState, danoValue]
        );
    };
    
    const [outroCrime, setOutroCrime] = useState('');
    const [outroDano, setOutroDano] = useState('');
    const [outroEstadoVitima, setOutroEstadoVitima] = useState('');
    const [outroTipoAcidente, setOutroTipoAcidente] = useState('');

    useEffect(() => {
        if (naturezaAcidente === 'com vítima') {
            setState(prevState => ({ ...prevState, crimeNoLocal: 'false' }));
        }

        if (naturezaAcidente === 'sem vítima') {
            setState(prevState => ({ ...prevState, colisao: 'false' }));
        }

        let estadosVitimaParaNarrativa = [...estadoVitima];
        let tipoAcidenteParaNarrativa = [...tipoAcidente];

        if (estadoVitima.includes('outro')) {
            estadosVitimaParaNarrativa = estadosVitimaParaNarrativa.filter(item => item !== 'outro');
            if (outroEstadoVitima.trim()) {
                estadosVitimaParaNarrativa.push(outroEstadoVitima);
            }
        }

        if (tipoAcidenteParaNarrativa.includes('outro')) {
            tipoAcidenteParaNarrativa = tipoAcidenteParaNarrativa.filter(item => item !== 'outro');
            if (outroTipoAcidente.trim()) {
                tipoAcidenteParaNarrativa.push(outroTipoAcidente.trim());
            }
        }

        let text = `Acidente ${naturezaAcidente}
    
        * A pessoa de NOME: ${nome.toUpperCase()}, telefone ${telefone}, informa que houve um acidente ${naturezaAcidente.toUpperCase()} em ${endereco.toUpperCase()}, cidade: ${regiaoAdministrativa.toUpperCase()}, ${referencia.toUpperCase()},`
        if (crime === 'dano' && naturezaAcidente === 'sem vítima') {
            let danosText = crime === 'dano'
                    ? `${danosSelecionados.filter(c => c !== 'outro').join(', ')}`
                    : `condutor embriagado`;
                if (danosSelecionados.includes('outro')) {
                    danosText += `, ${outroDano}`;
                }
            text += ` porém viatura deve deslocar ao local pois houve DANO AO PATRIMÔNIO PÚBLICO.
            
            Colisão contra ${danosText}.
            `
        } else
            if (crimeNoLocal === 'true') {
                let crimesText = crime === 'crime'
                    ? `pessoa sofrendo ${crimesSelecionados.filter(c => c !== 'outro').join(', ')}`
                    : `condutor embriagado`;
                if (crimesSelecionados.includes('outro')) {
                    crimesText += `, ${outroCrime}`;
                }
            
                text += `porém pede VIATURA para dar apoio na situação, pois tem ${crimesText} no local.`;
            } else if (vitimas >= 1 && vitimas <= 5) {
                text += ` e pede CBMDF e PMDF no local, com total de ${vitimas} ${vitimas == 1 ? `vítima` : `vítimas`} com`
            } else if (vitimas == -1) {
                text += ` e pede CBMDF e PMDF no local, porém não sabe definir quantas vítimas no local. `
            } else if (vitimas > 5) {
                text += ` e pede CBMDF e PMDF no local, pois tem várias vítimas no local, com `
            }
        text += ` ${estadosVitimaParaNarrativa.join(', ')} `

        if (naturezaAcidente === 'com vítima') {
            text += `
       
       Tipo de acidente: ${tipoAcidenteParaNarrativa.join(', ').toUpperCase()}`
        }

        setState(prevState => ({ ...prevState, narrativa: text }));
    }, [naturezaAcidente, nome, endereco, referencia, regiaoAdministrativa, outroCrime, outroDano, telefone, crime, vitimas, crimeNoLocal, estadoVitima, tipoAcidente, outroEstadoVitima, outroTipoAcidente, danosSelecionados, crimesSelecionados]);

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
                                Dano, crime ou embriaguez no local?
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
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local do acidente?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={12} marginBottom={4}>
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
                                                        {regioesAdministrativas
                                                            .slice()
                                                            .sort((a, b) => a.label.localeCompare(b.label))
                                                            .map(option => (
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
                                                        onClick={handleClick}
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
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} type="number" inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
                                        <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
                                            <Button variant="contained"
                                                color="secondary"
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-row-radio-buttons-group-label">Selecione o tipo da ocorrência</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => handleChange("crime", e.target.value)}
                                        value={crime}
                                        sx={{ mb: 2 }}
                                    >
                                        <FormControlLabel value="dano" control={<Radio />} label="Dano" />
                                        <FormControlLabel value="embriaguez" control={<Radio />} label="Embriaguez" />
                                        <FormControlLabel value="crime" control={<Radio />} label="Crime" />

                                    </RadioGroup>

                                    {crime === 'dano' && (
                                        <>
                                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
                                                Colisão contra:
                                            </FormLabel>
                                            <Grid item xs={12} sm={10}>
                                                <FormGroup>
                                                    {danosValues.map(danoValue => (
                                                        <FormControlLabel
                                                            key={danoValue}
                                                            control={
                                                                <Checkbox                                                                    
                                                                    checked={danosSelecionados.includes(danoValue)}
                                                                    onChange={() => handleDanoChange(danoValue)}
                                                                />
                                                            }
                                                            label={danoValue}
                                                        />
                                                    ))}
                                                    {danosSelecionados.includes('outro') && (
                                                        <TextField
                                                            label="Especifique o dano"
                                                            value={outroDano}
                                                            onChange={(e) => setOutroDano(e.target.value)}
                                                            fullWidth
                                                            sx={{ mt: 2 }}
                                                        />
                                                    )}
                                                </FormGroup>
                                            </Grid>
                                        </>
                                    )}

                                    {crime === 'crime' && (
                                        <>
                                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
                                                Qual crime?
                                            </FormLabel>
                                            <Grid item xs={12} sm={10}>
                                                <FormGroup>
                                                    {crimesValues.map(crimeValue => (
                                                        <FormControlLabel
                                                            key={crimeValue}
                                                            control={
                                                                <Checkbox
                                                                    checked={crimesSelecionados.includes(crimeValue)}
                                                                    onChange={() => handleCrimeChange(crimeValue)}
                                                                />
                                                            }
                                                            label={crimeValue.charAt(0).toUpperCase() + crimeValue.slice(1).toLowerCase()}
                                                        />
                                                    ))}
                                                    {crimesSelecionados.includes('outro') && (
                                                        <TextField
                                                            label="Especifique o crime"
                                                            value={outroCrime}
                                                            onChange={(e) => setOutroCrime(e.target.value)}
                                                            fullWidth
                                                            sx={{ mt: 2 }}
                                                        />
                                                    )}
                                                </FormGroup>
                                            </Grid>

                                        </>
                                    )}

                                    <Grid item xs={12} sx={{ mb: 4, mt: 4 }}>
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
                    {naturezaAcidente === 'com vítima' && (
                        <>
                            <Grid item xs={12} sm={10}>
                                <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-switch">
                                    Colisão ou atropelamento?
                                </FormLabel>
                                <Stack direction="row" spacing={1} marginBottom={2} alignItems="center">
                                    <Typography>Atropelamento</Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={colisao === "true"}
                                                onChange={(e) => handleChange("colisao", e.target.checked ? "true" : "false")}
                                                name="controlled-switch"
                                            />
                                        }
                                        sx={{
                                            display: 'block',

                                        }}
                                    />
                                    <Typography>Colisão</Typography>
                                </Stack>
                            </Grid>


                            {colisao === 'true' ? (
                                <>
                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Nome do solicitante" id="outlined-basic-endereco" label="Qual seu nome?" name="nome" onChange={e => handleChange('nome', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={nome} onCopy={() => console.log("nome")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField sx={{ marginBottom: 4, marginRight: 2, width: '80%' }} placeholder="Local do acidente" id="outlined-basic-endereco" label="Qual o local do acidente?" name="endereco" onChange={e => handleChange('endereco', e.target.value)} variant="outlined" />
                                        <CopyToClipboard text={endereco} onCopy={() => console.log("endereco")}>
                                            <Button variant="contained"
                                                color="secondary"
                                                onClick={handleClick}
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
                                                        {regioesAdministrativas
                                                            .slice()
                                                            .sort((a, b) => a.label.localeCompare(b.label))
                                                            .map(option => (
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
                                                        onClick={handleClick}
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
                                                onClick={handleClick}
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
                                                onClick={handleClick}
                                                style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                                            </Button>
                                        </CopyToClipboard>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl sx={{ width: '80%', marginBottom: 4 }}>
                                            <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-radio-buttons-group">Quantas vítimas no local?</FormLabel>
                                            <RadioGroup
                                                aria-label="vitimas"
                                                name="vitimas"
                                                value={vitimas}
                                                onChange={(e) => handleChange('vitimas', e.target.value)}
                                            >
                                                {qtdeVitimas.map((option) => (
                                                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-checkbox-group">Qual estado da(s) vítima(s) ?</FormLabel>
                                        <Grid container spacing={0} sx={{ width: '80%', marginBottom: 4 }}>
                                            {estadoVitimaOption.map(option => (
                                                <Grid item key={option.value} xs={6} sm={4} md={5}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={estadoVitima.includes(option.value)}
                                                                onChange={(e) => handleCheckboxChange('estadoVitima', option.value)}
                                                                sx={{ fontSize: '1.5vw !important' }}
                                                            />
                                                        }
                                                        label={option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                                                    />
                                                    {option.value === 'outro' && estadoVitima.includes(option.value) && (
                                                        <TextField
                                                            label="Especifique o estado da vítima"
                                                            value={outroEstadoVitima}
                                                            onChange={(e) => setOutroEstadoVitima(e.target.value)}
                                                            fullWidth
                                                            sx={{ mt: 1 }}
                                                            disabled={!estadoVitima.includes(option.value)}
                                                        />
                                                    )}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-checkbox-group">Qual foi o tipo do acidente?</FormLabel>
                                        <Grid container spacing={0} sx={{ width: '80%', marginBottom: 4 }}>
                                            {tipoAcidenteOption.map(option => (
                                                <Grid item key={option.value} xs={6} sm={4} md={5}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={tipoAcidente.includes(option.value)}
                                                                onChange={(e) => handleCheckboxChange('tipoAcidente', option.value)}
                                                                sx={{ fontSize: '1.5vw !important' }}
                                                            />
                                                        }
                                                        label={option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                                                    />
                                                    {option.value === 'outro' && tipoAcidente.includes(option.value) && (
                                                        <TextField
                                                            label="Especifique o tipo de acidente"
                                                            value={outroTipoAcidente}
                                                            onChange={(e) => setOutroTipoAcidente(e.target.value)}
                                                            fullWidth
                                                            sx={{ mt: 1 }}
                                                            disabled={!tipoAcidente.includes(option.value)}
                                                        />
                                                    )}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

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
                            ) : (
                                <>
                                    <Alert severity="error">{text03}</Alert>
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
