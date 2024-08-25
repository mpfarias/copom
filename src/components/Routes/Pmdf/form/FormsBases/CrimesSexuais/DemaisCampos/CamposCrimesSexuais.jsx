import React, { useState } from 'react';

import { FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import { listaOpcoes } from '../../../../../../Consts/Opcoes';


function CamposCrimesSexuais() {
  const [state, setState] = useState({
    menor: '',
});

const { menor} = state;

const handleChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
};

  return (
    <>
      <FormLabel style={{ fontWeight: 'bold', fontSize: 18 }} id="demo-controlled-radio-buttons-group">
        Vítima menor de idade?
      </FormLabel>
      <RadioGroup
        row
        aria-label="É menor"
        name="menor"
        value={menor}
        onChange={e => handleChange('menor', e.target.value)}
      >
        {listaOpcoes.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </>
  )
}

export default CamposCrimesSexuais