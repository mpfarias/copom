import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const usuario = localStorage.getItem('usuario'); // Recupera o nome do usuário do localStorage
        const ramal = localStorage.getItem('ramal'); // Recupera o ramal do localStorage

        if (usuario) {
            try {
                // Faz uma requisição para o backend para registrar o logout
                const response = await fetch('http://localhost:3001/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usuario, ramal }), // Envia o nome do usuário e o ramal no corpo da requisição
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.message); // Loga a mensagem do backend no console
                } else {
                    console.error('Erro ao registrar logout:', await response.text());
                }
            } catch (error) {
                console.error('Erro ao registrar logout:', error);
            }
        } else {
            console.log('Usuário não encontrado no localStorage.');
        }

        // Remove o nome do usuário, o ramal e o fila_id do localStorage
        localStorage.removeItem('nome');
        localStorage.removeItem('ramal');
        localStorage.removeItem('usuario');
        localStorage.removeItem('fila_id');

        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
        >
            Sair
        </Button>
    );
};

export default LogoutButton;
