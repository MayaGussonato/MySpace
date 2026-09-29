import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL: "http://172.16.1.183:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

const CHAVE_LOGADO = "@myspace_usuario_logado"

function mesmoValor(a, b) {
    return String(a ?? "") === String(b ?? "")
}

async function garantirDataCriacao(usuario) {
    if (!usuario || usuario.criadaEm) {
        return usuario
    }

    try {
        const resposta = await api.patch(
            `/usuarios/${usuario.id}`,
            { criadaEm: new Date().toISOString() }
        )

        return resposta.data
    } catch (erro) {
        return usuario
    }
}

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
        criadaEm: new Date().toISOString(),
    }

    try {
        const resposta = await api.post(
            "/usuarios",
            novoUsuario
        )

        return resposta.data
    } catch (erro) {
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

        const usuario = await garantirDataCriacao(
            resposta.data[0]
        )

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
    const dados = await AsyncStorage.getItem(
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

        const usuario = await garantirDataCriacao(
            resposta.data
        )

        await AsyncStorage.setItem(
            CHAVE_LOGADO,
            JSON.stringify(usuario)
        )

        return usuario
    } catch (erro) {
        await AsyncStorage.removeItem(
            CHAVE_LOGADO
        )

        return null
    }
}

export async function obterUsuarioPorIdentificador(
    identificador
) {
    if (
        identificador === undefined ||
        identificador === null ||
        identificador === ""
    ) {
        return null
    }

    try {
        const resposta = await api.get(
            `/usuarios/${identificador}`
        )

        return resposta.data
    } catch (erro) {
        try {
            const resposta = await api.get(
                "/usuarios",
                {
                    params: {
                        email: identificador,
                    },
                }
            )

            return resposta.data &&
                resposta.data.length > 0
                ? resposta.data[0]
                : null
        } catch (erro2) {
            return null
        }
    }
}

export async function atualizarSeguidoresUsuario(
    id,
    seguidores
) {
    const resposta = await api.patch(
        `/usuarios/${id}`,
        { seguidores }
    )

    return resposta.data
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
    const resposta = await api.get("/publicacoes")

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

async function listarTodasNotificacoes() {
    const resposta = await api.get("/notificacoes")

    return resposta.data || []
}

export async function obterNotificacoes(
    usuarioId
) {
    const todas = await listarTodasNotificacoes()

    return todas
        .filter(notificacao =>
            mesmoValor(notificacao.paraId, usuarioId)
        )
        .sort((a, b) =>
            String(b.criadaEm || "").localeCompare(
                String(a.criadaEm || "")
            )
        )
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

export async function criarNotificacaoDe({
    paraId,
    de,
    tipo,
    publicacaoId = null,
}) {
    if (
        paraId === undefined ||
        paraId === null ||
        paraId === "" ||
        !de ||
        mesmoValor(paraId, de.id)
    ) {
        return null
    }

    const textos = {
        seguir: "começou a seguir você.",
        curtida: "curtiu sua publicação.",
        comentario: "comentou na sua publicação.",
        salvo: "salvou sua publicação.",
    }

    try {
        if (tipo !== "comentario") {
            const todas = await listarTodasNotificacoes()

            const existente = todas.find(
                notificacao =>
                    mesmoValor(notificacao.paraId, paraId) &&
                    mesmoValor(notificacao.deId, de.id) &&
                    notificacao.tipo === tipo &&
                    mesmoValor(
                        notificacao.publicacaoId,
                        publicacaoId
                    )
            )

            if (existente) {
                return existente
            }
        }

        const agora = new Date()

        return await criarNotificacao({
            paraId,
            deId: de.id,
            nome: de.nome,
            tipo,
            texto: textos[tipo],
            publicacaoId,
            data: agora.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            criadaEm: agora.toISOString(),
        })
    } catch (erro) {
        return null
    }
}

export async function excluirNotificacaoPorAcao({
    paraId,
    deId,
    tipo,
    publicacaoId = null,
}) {
    try {
        const todas = await listarTodasNotificacoes()

        const alvos = todas.filter(
            notificacao =>
                mesmoValor(notificacao.paraId, paraId) &&
                mesmoValor(notificacao.deId, deId) &&
                notificacao.tipo === tipo &&
                mesmoValor(
                    notificacao.publicacaoId,
                    publicacaoId
                )
        )

        await Promise.all(
            alvos.map(notificacao =>
                api.delete(
                    `/notificacoes/${notificacao.id}`
                )
            )
        )
    } catch (erro) {
        return null
    }
}

export async function excluirNotificacoesDaPublicacao(
    publicacaoId
) {
    const todas = await listarTodasNotificacoes()

    const alvos = todas.filter(notificacao =>
        mesmoValor(notificacao.publicacaoId, publicacaoId)
    )

    await Promise.all(
        alvos.map(notificacao =>
            api.delete(
                `/notificacoes/${notificacao.id}`
            )
        )
    )
}

export async function obterSalvos() {
    const resposta = await api.get("/salvos")

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
    const resposta = await api.get("/curtidas")

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

export async function obterUsuarios() {
    const resposta = await api.get("/usuarios")

    return resposta.data || []
}