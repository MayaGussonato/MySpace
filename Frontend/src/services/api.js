import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL: "http://172.16.1.128:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

const CHAVE_LOGADO = "@myspace_usuario_logado"

export async function cadastrarUsuario({ nome, email, senha }) {
    const novoUsuario = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        username:
            "@" +
            nome
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "."),
        bio: "",
        avatar: null,
        seguidores: [],
        seguindo: [],
        publicacoes: [],
    }

    console.log("CADASTRANDO USUARIO:", novoUsuario)

    try {
        const resposta = await api.post(
            "/usuarios",
            novoUsuario
        )

        console.log(
            "USUARIO SALVO NA API:",
            resposta.data
        )

        return resposta.data
    } catch (erro) {
        console.log(
            "ERRO AO CADASTRAR:",
            erro.message
        )

        console.log(
            "STATUS:",
            erro.response?.status
        )

        console.log(
            "RESPOSTA:",
            erro.response?.data
        )

        throw new Error(
            erro.response?.data?.message ||
            erro.message ||
            "Não foi possível criar a conta."
        )
    }
}

export async function logarUsuario({ email, senha }) {
    try {
        const resposta = await api.get("/usuarios", {
            params: {
                email: email.trim().toLowerCase(),
                senha,
            },
        })

        if (
            !resposta.data ||
            resposta.data.length === 0
        ) {
            throw new Error(
                "E-mail ou senha incorretos"
            )
        }

        const usuario = resposta.data[0]

        await AsyncStorage.setItem(
            CHAVE_LOGADO,
            JSON.stringify(usuario)
        )

        return usuario
    } catch (erro) {
        if (
            erro.message ===
            "E-mail ou senha incorretos"
        ) {
            throw erro
        }

        throw new Error(
            "Não foi possível conectar à API."
        )
    }
}

export async function obterUsuarioLogado() {
    const dados =
        await AsyncStorage.getItem(
            CHAVE_LOGADO
        )

    if (!dados) {
        return null
    }

    const usuarioSalvo = JSON.parse(dados)

    try {
        const resposta = await api.get(
            `/usuarios/${usuarioSalvo.id}`
        )

        return resposta.data
    } catch (erro) {
        await AsyncStorage.removeItem(
            CHAVE_LOGADO
        )

        return null
    }
}

export async function deslogarUsuario() {
    await AsyncStorage.removeItem(
        CHAVE_LOGADO
    )
}

export async function atualizarUsuario(
    usuarioAtualizado
) {
    const resposta = await api.put(
        `/usuarios/${usuarioAtualizado.id}`,
        usuarioAtualizado
    )

    await AsyncStorage.setItem(
        CHAVE_LOGADO,
        JSON.stringify(resposta.data)
    )

    return resposta.data
}

export async function obterPublicacoes() {
    const resposta =
        await api.get("/publicacoes")

    return resposta.data
}

export async function criarPublicacao(
    publicacao
) {
    const resposta = await api.post(
        "/publicacoes",
        publicacao
    )

    return resposta.data
}

export async function atualizarPublicacao(
    id,
    dadosAtualizados
) {
    const resposta = await api.patch(
        `/publicacoes/${id}`,
        dadosAtualizados
    )

    return resposta.data
}

export async function excluirPublicacaoApi(
    id
) {
    await api.delete(`/publicacoes/${id}`)
}

export async function obterComentarios(
    publicacaoId
) {
    const resposta = await api.get(
        "/comentarios",
        {
            params: {
                publicacaoId,
            },
        }
    )

    return resposta.data
}

export async function criarComentario(
    comentario
) {
    const resposta = await api.post(
        "/comentarios",
        comentario
    )

    return resposta.data
}

export async function obterNotificacoes() {
    const resposta =
        await api.get("/notificacoes")

    return resposta.data
}

export async function criarNotificacao(
    notificacao
) {
    const resposta = await api.post(
        "/notificacoes",
        notificacao
    )

    return resposta.data
}

export async function excluirNotificacoesDaPublicacao(
    publicacaoId
) {
    const resposta = await api.get(
        "/notificacoes",
        {
            params: {
                publicacaoId,
            },
        }
    )

    for (const notificacao of resposta.data) {
        await api.delete(
            `/notificacoes/${notificacao.id}`
        )
    }
}

export async function obterSalvos() {
    const resposta =
        await api.get("/salvos")

    return resposta.data
}

export async function salvarPublicacao(
    salvo
) {
    const resposta = await api.post(
        "/salvos",
        salvo
    )

    return resposta.data
}

export async function excluirSalvo(id) {
    await api.delete(`/salvos/${id}`)
}

export async function obterCurtidas() {
    const resposta =
        await api.get("/curtidas")

    return resposta.data
}

export async function criarCurtida(
    curtida
) {
    const resposta = await api.post(
        "/curtidas",
        curtida
    )

    return resposta.data
}

export async function excluirCurtida(id) {
    await api.delete(`/curtidas/${id}`)
}