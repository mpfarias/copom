import React, { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import { TextField } from '@mui/material';

function CpfInput() {
    const [cpfValue, setCpfValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleCpfChange = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        setCpfValue(cleanedValue);
        setIsValid(cpf.isValid(cleanedValue));
    };

    return (
        <div>
            <TextField
                type="text"
                sx={{ marginRight: 2, width: '80%' }}
                value={cpfValue}
                placeholder="Qual CPF do solicitante ?"
                fullWidth
                id="outlined-basic-endereco"
                onChange={(e) => handleCpfChange(e.target.value)}
                label="Qual CPF do solicitante ?"
                variant="outlined"
                inputProps={{ maxLength: 11 }}
            />
            {!isValid && <p style={{ color: 'red' }}>CPF inválido</p>}
        </div>
    );
}

export default CpfInput;