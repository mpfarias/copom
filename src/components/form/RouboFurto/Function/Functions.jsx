export const handleCopy = async (fieldId = null, fieldValue = null) => {
  try {
    const fieldToCopy = fieldId ? document.getElementById(`outlined-basic-${fieldId}`) : document.querySelector('.narrativa-text');
    if (fieldToCopy) {
      let textToCopy = '';
      if (fieldId === 'telefone') {
        textToCopy = fieldToCopy.inputRef.current.unmaskedValue;
      } else if (fieldId === 'regiaoAdministrativa') {
        textToCopy = fieldValue; 
      } else {
        textToCopy = fieldToCopy.value || fieldToCopy.textContent;
      }

      await navigator.clipboard.writeText(textToCopy);
      alert('Texto copiado com sucesso!');
    }
  } catch (err) {
    console.error('Falha ao copiar texto: ', err);
    alert('Falha ao copiar texto.');
  }
};


  export const handleResetForm = (setState) => {
    setState({
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
  };