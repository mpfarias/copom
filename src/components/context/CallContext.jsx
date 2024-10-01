import React, { createContext, useState, useContext } from 'react';

// Criação do Contexto
const CallContext = createContext();

// Criar um Hook para acessar o contexto facilmente em qualquer componente
export const useCall = () => {
  return useContext(CallContext);
};

// Provedor do contexto que vai englobar toda a aplicação
export const CallProvider = ({ children }) => {
  const [callData, setCallData] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false); // Estado que controla se uma chamada está ativa

  return (
    <CallContext.Provider value={{ callData, setCallData, isCallActive, setIsCallActive }}>
      {children}
    </CallContext.Provider>
  );
};
