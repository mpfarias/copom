// functions.jsx

export const handleCopy = (fieldName, state) => {
    const fieldValue = state[fieldName];
    navigator.clipboard.writeText(fieldValue);
  };
  
  export const handleTelefoneChange = (e, handleChange) => {
    const maxLength = 14;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    handleChange('telefone', e.target.value);
  };
  
  export const handleResetForm = (setState, setSolicitante, setObjeto) => {
    setState({
      solicitante: '',
      objeto: '',
      nome: '',
      endereco: '',
      regiaoAdministrativa: 'Plano Piloto',
      referencia: '',
      telefone: '',
      individuos: '1',
      corCamisetas: ['clara'],
      corCalcas: ['clara'],
      caracteristicas:[],
      outraCaracteristica:''
    });
    document.getElementById('outlined-basic-nome').value = '';
    document.getElementById('outlined-basic-endereco').value = '';
    document.getElementById('outlined-basic-telefone').value = '';
    document.getElementById('outlined-basic-referencia').value = '';
    setSolicitante('vitima');
    setObjeto('');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Role até o topo da página
  };