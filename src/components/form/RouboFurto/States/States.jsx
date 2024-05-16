import { useState } from 'react';

export const useFormStates = () => {
  const [objeto, setObjeto] = useState('');
  const [solicitante, setSolicitante] = useState('vitima');
  const [caracteristicasIndividuos, setCaracteristicasIndividuos] = useState([]);

  const [state, setState] = useState({
    nome: '',
    tipo: '',
    endereco: '',
    regiaoAdministrativa: 'Plano Piloto',
    referencia: '',
    telefone: '',
    placa: '',
    modelo: '',
    individuos: '1',
    corCamisetas: ['clara'],
    corCalcas: ['clara'],
    caracteristicas: [],
    narrativa: ''
  });

  const [outrasCaracteristicas, setOutrasCaracteristicas] = useState([]);
  const [showOutraCaracteristica, setShowOutraCaracteristica] = useState([]);
  const [selectedOptionCima, setSelectedOptionCima] = useState([]);
  const [selectedOptionBaixo, setSelectedOptionBaixo] = useState([]);
  const [selectedOptionArma, setSelectedOptionArma] = useState([]);
  const [selectedOptionCalcadoIndividuos, setSelectedOptionCalcadoIndividuos] = useState([]);
  const [update, setUpdate] = useState(false);

  return {
    objeto, setObjeto,
    solicitante, setSolicitante,
    caracteristicasIndividuos, setCaracteristicasIndividuos,
    state, setState,
    outrasCaracteristicas, setOutrasCaracteristicas,
    showOutraCaracteristica, setShowOutraCaracteristica,
    selectedOptionCima, setSelectedOptionCima,
    selectedOptionBaixo, setSelectedOptionBaixo,
    selectedOptionArma, setSelectedOptionArma,
    selectedOptionCalcadoIndividuos, setSelectedOptionCalcadoIndividuos,
    update, setUpdate
  };
};
