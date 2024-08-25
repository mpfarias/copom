import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FormularioBase from '../../Components/FormularioBase';
import CamposCrimesSexuais from './DemaisCampos/CamposCrimesSexuais';
import TiposCrimes from './DemaisCampos/TiposCrimes';
import Narrativa from '../../Components/Narrativa';
import Cabecalho from '../../Components/Cabecalho';

function CrimesSexuais() {
  
    const [narrativa, setNarrativa] = useState('');
    const [tipoCrime, setTipoCrime] = useState('');

    const handleNarrativaChange = (value) => {
        setNarrativa(value);
    };

    const handleTipoCrimeChange = (value) => {
        setTipoCrime(value);
    };

    return (
        <Grid item xs={12} marginBottom={2} marginLeft={4}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Cabecalho title="Crimes Sexuais" />
                    <TiposCrimes onTipoCrimeChange={handleTipoCrimeChange} />
                    <FormularioBase />
                    {tipoCrime !== 'ato obsceno' ? (
                        <CamposCrimesSexuais />
                    ) : (
                        ''
                    )}
                    <Narrativa narrativa={narrativa} onNarrativaChange={handleNarrativaChange} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CrimesSexuais;
