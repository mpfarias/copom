import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const usuario = localStorage.getItem('usuario'); // Recupera o nome do usuário do localStorage

        if (usuario) {
            try {
                // Faz uma requisição para o backend para registrar o logout
                const response = await fetch('http://localhost:3001/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usuario }), // Envia o nome do usuário no corpo da requisição
                });

                const result = await response.json();
                console.log(result.message); // Loga a mensagem do backend no console
            } catch (error) {
                console.error('Erro ao registrar logout:', error);
            }
        }

        // Remove o nome do usuário e o ramal do localStorage
        localStorage.removeItem('nome');
        localStorage.removeItem('ramal');
        localStorage.removeItem('usuario');

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
