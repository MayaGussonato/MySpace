import { useState } from "react"
import { Alert } from "react-native"
import { useUsuario } from "../../contexts/UsuarioContext"

export function useCriarConta(onSucesso) {
    const { cadastrar } = useUsuario()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [mostrarSenha, setMostrarSenha] =
        useState(false)
    const [carregando, setCarregando] =
        useState(false)

    async function criarConta() {
        if (
            !nome.trim() ||
            !email.trim() ||
            !senha.trim()
        ) {
            Alert.alert(
                "Atenção",
                "Preencha todos os campos"
            )
            return
        }

        setCarregando(true)

        try {
            await cadastrar({
                nome: nome.trim(),
                email: email
                    .trim()
                    .toLowerCase(),
                senha,
            })

            Alert.alert(
                "Sucesso",
                "Conta criada com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            onSucesso?.(),
                    },
                ]
            )
        } catch (erro) {
            console.log(
                "ERRO AO CRIAR CONTA:",
                erro
            )

            Alert.alert(
                "Erro ao criar conta",
                erro?.message ||
                    "Não foi possível criar a conta."
            )
        } finally {
            setCarregando(false)
        }
    }

    function alternarSenha() {
        setMostrarSenha(
            valorAtual => !valorAtual
        )
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
        carregando,
    }
}