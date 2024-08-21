import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';


function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [ramal, setRamal] = useState('5062');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Obtém a função de login do contexto

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, senha, ramal })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                console.log("Login bem-sucedido, autenticando...");
                login(); // Marca o usuário como autenticado
                console.log("Redirecionando para /dashboard");
                navigate('/Main'); // Redireciona para a página principal da aplicação
            } else {
                console.log("Login falhou: ", data.message);
                setError(data.message);
            }
            
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            setError('Erro ao tentar logar. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <br />
            <select value={ramal} onChange={(e) => setRamal(e.target.value)}>
                <option value="5062">5062</option>
                <option value="5061">5061</option>
                <option value="5060">5060</option>
            </select>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
