import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useCall } from '../../../context/CallContext';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { isCallActive } = useCall();

    const handleLogout = async () => {
        const cpf = localStorage.getItem('cpf'); // Recupera o CPF do localStorage
        const ramal = localStorage.getItem('ramal'); // Recupera o ramal do localStorage

        if (cpf && ramal) {
            try {
                // Faz uma requisição para o backend para registrar o logout
                const response = await fetch('http://localhost:3001/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cpf, ramal }),  // Envia o CPF e o ramal no corpo da requisição
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Logout registrado:', result.message);  // Loga a mensagem do backend no console
                } else {
                    console.error('Erro ao registrar logout:', await response.text());
                }
            } catch (error) {
                console.error('Erro ao registrar logout:', error);
            }
        } else {
            console.log('CPF ou Ramal não encontrado no localStorage.');
        }

        // Remove o nome do usuário, o ramal e o CPF do localStorage
        localStorage.clear();
        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            disabled={isCallActive} // Este botão deve ser desativado quando `isCallActive` for false
        >
            Sair
        </Button>
    );
};

export default LogoutButton;
