import React, { useState, useEffect } from 'react';
import { TextField } from "@mui/material";

const AutoFillPhoneInput = ({ value, onChange, ...props }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);  // Verifique o que está sendo recebido
      if (data.callerId) {
        setPhoneNumber(data.callerId);
        if (onChange) {
          onChange({ target: { value: data.callerId } }); // Notifica o componente pai
        }
      }
    };

    return () => {
      websocket.close();
    };
  }, [onChange]);

  useEffect(() => {
    setPhoneNumber(value); // Atualiza o campo se o valor da prop mudar
  }, [value]);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
    if (onChange) {
      onChange(e); // Notifica o componente pai sobre a mudança
    }
  };

  return (
    <TextField
      label="Telefone"
      value={phoneNumber}  // Adicionei o valor aqui para garantir que o estado interno seja exibido
      onChange={handleInputChange}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default AutoFillPhoneInput;
