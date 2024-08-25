import React, { useState } from 'react';

import {FormLabel} from '@mui/material';

function Cabecalho({title}) {
    return (
        <>
            <FormLabel style={{
                fontWeight: 'bold',
                fontSize: 30,
            }} id="demo-controlled-radio-buttons-group">{title}</FormLabel>
        </>
    )
}

export default Cabecalho