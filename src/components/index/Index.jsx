import React, { useState } from 'react';
import './App.css'; // Para estilos básicos

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [extension, setExtension] = useState('5960');

  const handleLogin = () => {
    // Aqui você pode adicionar lógica para autenticação
    console.log('Usuário:', username);
    console.log('Senha:', password);
    console.log('Ramal:', extension);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="extension">Ramal</label>
          <select
            id="extension"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
          >
            <option value="5960">5960</option>
            <option value="5962">5962</option>
          </select>
        </div>
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};

export default Index;