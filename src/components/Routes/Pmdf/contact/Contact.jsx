import React from 'react'
import { Link } from 'react-router-dom'

function TelefonesUteis() {
  return (
    <div>
      <Link to="/src/components/Archieves/batalhoes.pdf" target="_blank" rel="noopener noreferrer">Batalhões da PMDF</Link><br/>
      <Link to="/src/components/Archieves/conselhosTutelares.pdf" target="_blank" rel="noopener noreferrer">Conselhos Tutelares</Link><br/>
      <Link to="/src/components/Archieves/delegacias.pdf" target="_blank" rel="noopener noreferrer">Delegacias</Link><br/>
      <Link to="/src/components/Archieves/mesas.pdf" target="_blank" rel="noopener noreferrer">Mesas o Copom</Link><br/>
      <Link to="/src/components/Archieves/outrosOrgaos.pdf" target="_blank" rel="noopener noreferrer">Órgãos Públicos</Link><br/>
    </div>
  )
}

export default TelefonesUteis
