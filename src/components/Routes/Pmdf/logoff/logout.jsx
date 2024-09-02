import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
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