import { useState } from "react";

export function useCriarConta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function criarConta() {
    if (!nome || !email || !senha) {
      console.log("Preencha todos os campos");
      return;
    }

    console.log("Conta criada!");
    console.log({
      nome,
      email,
      senha,
    });
  }

  function alternarSenha() {
    setMostrarSenha((valorAtual) => !valorAtual);
  }

  return {
    nome,
    setNome,

    email,
    setEmail,

    senha,
    setSenha,

    mostrarSenha,
    alternarSenha,

    criarConta,
  };
}