import React, { useState } from 'react';

import {FormLabel, FormControlLabel, Box, RadioGroup, Radio } from '@mui/material';
import { listaCrimesSexuais } from '../../../../../Consts/TiposCrimesSexuais';
function Cabecalho() {
    const [state, setState] = useState({
        tipoCrime: '',
      });
    
      const { tipoCrime, } = state;
    
      const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
      };
    
    return (
        <>
            <FormLabel style={{
                fontWeight: 'bold',
                fontSize: 30,
            }} id="demo-controlled-radio-buttons-group">Crimes Sexuais</FormLabel>
            <Box sx={{ mt: 2 }} noValidate autoComplete="off">
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-radio-buttons-group">
                    Tipo de crime
                </FormLabel>
                <RadioGroup
                    row
                    aria-label="solicitante"
                    name="Tipo de crime"
                    value={tipoCrime}
                    onChange={e => handleChange('tipoCrime', e.target.value)}
                >
                    {listaCrimesSexuais.map(option => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </Box>
        </>
    )
}

export default Cabecalho