import React, { createContext, useState, useContext, useEffect } from 'react';
import { obterUsuarioLogado, logarUsuario as logarUsuarioService, deslogarUsuario as deslogarUsuarioService } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarUsuario() {
            const usuarioSalvo = await obterUsuarioLogado();
            setUsuario(usuarioSalvo);
            setCarregando(false);
        }
        carregarUsuario();
    }, []);

    async function login({ email, senha }) {
        const usuarioLogado = await logarUsuarioService({ email, senha });
        setUsuario(usuarioLogado);
        return usuarioLogado;
    }

    async function logout() {
        await deslogarUsuarioService();
        setUsuario(null);
    }

    function atualizarUsuarioNoContexto(usuarioAtualizado) {
        setUsuario(usuarioAtualizado);
    }

    return (
        <AuthContext.Provider value={{ usuario, carregando, login, logout, atualizarUsuarioNoContexto }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return contexto;
}