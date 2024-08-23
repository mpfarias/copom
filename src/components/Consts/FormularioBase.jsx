import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Grid, FormLabel, FormControlLabel, Box, RadioGroup, Radio, Select, MenuItem, TextField, Button } from '@mui/material';
import { listaSolicitante } from './Solicitante';
import { regioesAdministrativas } from '../Routes/Pmdf/form/RouboFurto/Const/Consts';


function FormularioBase() {

    const [state, setState] = useState({
        solicitante: 'vítima',
        nome: '',
        endereco:'',
        regiaoAdministrativa:'Plano Piloto',
        referencia:'',
        telefone:'',
    });

    const { solicitante, nome, endereco, regiaoAdministrativa, referencia, telefone } = state;

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    };
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          event.preventDefault();
        }
      };

      const handleTelefoneChange = (event) => {
        const formattedTelefone = event.target.value.replace(/\D/g, "");
        const limitedTelefone = formattedTelefone.slice(0, 11);
        setState(prevState => ({ ...prevState, telefone: limitedTelefone }));
      };

    return (
        <>
            <Box sx={{ mt: 2 }} noValidate autoComplete="off">
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-radio-buttons-group">
                    Solicitante
                </FormLabel>
                <RadioGroup
                    row
                    aria-label="solicitante"
                    name="solicitante"
                    value={solicitante}
                    onChange={e => handleChange('solicitante', e.target.value)}
                >
                    {listaSolicitante.map(option => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </Box>
            <Grid item xs={12}>
                <TextField sx={{ marginBottom: 2, marginRight: 2, width: '80%' }} placeholder="Nome solicitante" fullWidth id="outlined-basic-nome" onChange={e => handleChange('nome', e.target.value)} label="Qual o nome do solicitante?" variant="outlined" />
                <CopyToClipboard text={nome} onCopy={() => console.log('Nome copiado!')}>
                    <Button variant="contained"
                        color="secondary"
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                </CopyToClipboard>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
                    placeholder="Endereço"
                    fullWidth
                    id="outlined-basic-endereco"
                    onChange={e => handleChange('endereco', e.target.value)}
                    label="Qual o endereço?"
                    variant="outlined" />
                <CopyToClipboard text={endereco} onCopy={() => console.log('Endereço copiado!')}>
                    <Button variant="contained"
                        color="secondary"
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                </CopyToClipboard>
            </Grid>

            <Grid item xs={12}>
                <FormLabel id="demo-controlled-radio-buttons-group">Qual a cidade da ocorrência?</FormLabel>
            </Grid>

            <Grid item xs={12}>
                <Select
                    sx={{ marginBottom: 2, width: '50%', marginRight: 2, }}
                    fullWidth
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
                <CopyToClipboard text={regiaoAdministrativa} onCopy={() => console.log('Cidade copiada!')}>
                    <Button variant="contained"
                        color="secondary"
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                </CopyToClipboard>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    sx={{ marginBottom: 2, marginRight: 2, width: '80%' }}
                    placeholder="Ponto de referência"
                    fullWidth
                    id="outlined-basic-referencia"
                    label="Qual o ponto de referência?"
                    name="referencia"
                    onChange={e => handleChange('referencia', e.target.value)}
                    variant="outlined"
                />
                <CopyToClipboard text={referencia} onCopy={() => console.log('Referência copiada!')}>
                    <Button variant="contained"
                        color="secondary"
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                </CopyToClipboard>
            </Grid>

            <Grid item xs={12}>
                <TextField onKeyPress={handleKeyPress} sx={{ marginBottom: 1, marginRight: 2, width: '80%' }} placeholder='Telefone' inputProps={{ maxLength: 11 }} onChange={handleTelefoneChange} fullWidth id="outlined-basic-telefone" label="Qual o telefone?" name="telefone" variant="outlined" />
                <CopyToClipboard text={telefone} onCopy={() => console.log('Telefone copiado!')}>
                    <Button variant="contained"
                        color="secondary"
                        style={{ backgroundColor: '#32CD32', color: '#FFFFFF', marginBottom: 15 }}><FileCopyIcon />
                    </Button>
                </CopyToClipboard>
            </Grid>
        </>
    )
}

export default FormularioBase