import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    cadastrarUsuario,
    logarUsuario,
    obterUsuarioLogado,
    deslogarUsuario,
    atualizarUsuario,
    obterPublicacoes,
    criarPublicacao,
    atualizarPublicacao,
    excluirPublicacaoApi,
    obterComentarios,
    criarComentario,
    obterNotificacoes,
    criarNotificacao,
    excluirNotificacoesDaPublicacao,
    obterSalvos,
    salvarPublicacao,
    excluirSalvo,
    obterCurtidas,
    criarCurtida,
    excluirCurtida,
} from "../services/api"

import { PUBLICACOES } from "../data/publicacoes"

const UsuarioContext = createContext(null)

const NOTIFICACOES_INICIAIS = [
    {
        id: "notificacao-1",
        tipo: "curtida",
        nome: "João Silva",
        texto: "curtiu sua publicação.",
        data: "10:30",
    },
    {
        id: "notificacao-2",
        tipo: "comentario",
        nome: "João Silva",
        texto: "comentou sua publicação.",
        data: "10:30",
    },
    {
        id: "notificacao-3",
        tipo: "seguir",
        nome: "Mariana Costa",
        texto: "começou a seguir você.",
        data: "09:45",
    },
    {
        id: "notificacao-4",
        tipo: "seguir",
        nome: "Lucas Mendes",
        texto: "começou a seguir você.",
        data: "09:20",
    },
    {
        id: "notificacao-5",
        tipo: "seguir",
        nome: "Ana Clara Santos",
        texto: "começou a seguir você.",
        data: "Ontem",
    },
    {
        id: "notificacao-6",
        tipo: "comentario",
        nome: "Maria Oliveira",
        texto: "comentou sua publicação.",
        data: "Ontem",
    },
]

function formatarHora(data) {
    const dataObj = new Date(data)

    if (isNaN(dataObj.getTime())) {
        return data
    }

    return dataObj.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }
    )
}

function normalizarId(valor) {
    return valor === undefined ||
        valor === null
        ? ""
        : valor.toString()
}

export function UsuarioProvider({
    children,
}) {
    const [usuario, setUsuario] =
        useState(null)

    const [carregando, setCarregando] =
        useState(true)

    const [publicacoes, setPublicacoes] =
        useState(PUBLICACOES || [])

    const [notificacoes, setNotificacoes] =
        useState(NOTIFICACOES_INICIAIS)

    const [curtidas, setCurtidas] =
        useState({})

    const [salvos, setSalvos] =
        useState([])

    const [
        comentariosPorPublicacao,
        setComentariosPorPublicacao,
    ] = useState({})

    useEffect(() => {
        async function carregarDados() {
            try {
                const usuarioSalvo =
                    await obterUsuarioLogado()

                const publicacoesApi =
                    await obterPublicacoes()

                const notificacoesApi =
                    await obterNotificacoes()

                const salvosApi =
                    await obterSalvos()

                const curtidasApi =
                    await obterCurtidas()

                if (usuarioSalvo) {
                    const usuarioNormalizado = {
                        ...usuarioSalvo,
                        avatar:
                            usuarioSalvo.avatar ||
                            null,
                        publicacoes:
                            usuarioSalvo.publicacoes ||
                            [],
                    }

                    setUsuario(
                        usuarioNormalizado
                    )
                }

                if (
                    publicacoesApi &&
                    publicacoesApi.length > 0
                ) {
                    setPublicacoes(
                        anteriores => {
                            const ids =
                                new Set(
                                    anteriores.map(
                                        item =>
                                            normalizarId(
                                                item.id
                                            )
                                    )
                                )

                            const novas =
                                publicacoesApi.filter(
                                    item =>
                                        !ids.has(
                                            normalizarId(
                                                item.id
                                            )
                                        )
                                )

                            return [
                                ...novas,
                                ...anteriores,
                            ]
                        }
                    )
                }

                if (
                    notificacoesApi &&
                    notificacoesApi.length > 0
                ) {
                    setNotificacoes(
                        [
                            ...notificacoesApi,
                            ...NOTIFICACOES_INICIAIS,
                        ]
                    )
                }

                if (
                    salvosApi &&
                    salvosApi.length > 0
                ) {
                    setSalvos(
                        salvosApi.map(
                            item =>
                                item.publicacaoId
                        )
                    )
                }

                if (
                    curtidasApi &&
                    curtidasApi.length > 0
                ) {
                    const mapa = {}

                    curtidasApi.forEach(
                        item => {
                            mapa[
                                item.publicacaoId
                            ] = true
                        }
                    )

                    setCurtidas(mapa)
                }

                const comentariosApi = []

                for (
                    const publicacao of
                    publicacoesApi || []
                ) {
                    const comentarios =
                        await obterComentarios(
                            publicacao.id
                        )

                    comentariosApi.push(
                        ...comentarios
                    )
                }

                const mapaComentarios = {}

                comentariosApi.forEach(
                    comentario => {
                        const id =
                            normalizarId(
                                comentario.publicacaoId
                            )

                        if (
                            !mapaComentarios[id]
                        ) {
                            mapaComentarios[id] =
                                []
                        }

                        mapaComentarios[id].push(
                            comentario
                        )
                    }
                )

                setComentariosPorPublicacao(
                    mapaComentarios
                )
            } catch (error) {
                console.log(
                    "Erro ao carregar dados:",
                    error
                )
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [])

    async function cadastrar(dados) {
        console.log(
            "CONTEXTO RECEBEU CADASTRO:",
            dados
        )

        try {
            const novoUsuario =
                await cadastrarUsuario(dados)

            console.log(
                "USUARIO CRIADO:",
                novoUsuario
            )

            return {
                ...novoUsuario,
                avatar: null,
                publicacoes: [],
            }
        } catch (error) {
            console.log(
                "ERRO NO CADASTRO:",
                error
            )

            throw error
        }
    }

    async function logar(dados) {
        const usuarioLogado =
            await logarUsuario(dados)

        const usuarioNormalizado = {
            ...usuarioLogado,
            avatar:
                usuarioLogado?.avatar || null,
            publicacoes:
                usuarioLogado?.publicacoes ||
                [],
        }

        setUsuario(
            usuarioNormalizado
        )

        const publicacoesApi =
            await obterPublicacoes()

        setPublicacoes(
            [
                ...(publicacoesApi || []),
                ...PUBLICACOES,
            ]
        )

        return usuarioNormalizado
    }

    async function sair() {
        await deslogarUsuario()
        setUsuario(null)
    }

    async function atualizar(
        dadosAtualizados
    ) {
        const usuarioAtual =
            usuario || {}

        const usuarioMesclado = {
            ...usuarioAtual,
            ...dadosAtualizados,
        }

        const usuarioAtualizado =
            await atualizarUsuario(
                usuarioMesclado
            )

        const usuarioNormalizado = {
            ...usuarioAtualizado,
            ...dadosAtualizados,
            avatar:
                dadosAtualizados.avatar !==
                undefined
                    ? dadosAtualizados.avatar ||
                      null
                    : usuarioAtual.avatar ||
                      null,
            publicacoes:
                dadosAtualizados.publicacoes !==
                undefined
                    ? dadosAtualizados.publicacoes
                    : usuarioAtual.publicacoes ||
                      [],
        }

        setUsuario(
            usuarioNormalizado
        )

        setPublicacoes(
            anteriores =>
                anteriores.map(item => {
                    const pertence =
                        normalizarId(
                            item.usuarioId
                        ) ===
                            normalizarId(
                                usuarioAtual.id
                            ) ||
                        normalizarId(
                            item.usuarioId
                        ) ===
                            normalizarId(
                                usuarioAtual.email
                            )

                    if (!pertence) {
                        return item
                    }

                    return {
                        ...item,
                        nome:
                            usuarioNormalizado.nome,
                        username:
                            usuarioNormalizado.username ||
                            usuarioNormalizado.usuario ||
                            "",
                        avatar:
                            usuarioNormalizado.avatar ||
                            null,
                    }
                })
        )

        return usuarioNormalizado
    }

    async function publicar({
        texto,
        imagem = null,
        localizacao = null,
        sentimento = null,
    }) {
        const agora = new Date()

        const idUsuario =
            usuario?.id ||
            usuario?.email ||
            null

        const dadosPublicacao = {
            id: Date.now().toString(),
            texto: texto || "",
            imagem: imagem || null,
            localizacao:
                localizacao || null,
            sentimento:
                sentimento || null,
            data: agora.toISOString(),
            curtidas: 0,
            comentarios: 0,
            nome:
                usuario?.nome ||
                "Usuário",
            username:
                usuario?.username ||
                usuario?.usuario ||
                "",
            avatar:
                usuario?.avatar ||
                null,
            usuarioId: idUsuario,
        }

        const novaPublicacao =
            await criarPublicacao(
                dadosPublicacao
            )

        setPublicacoes(
            anteriores => [
                novaPublicacao,
                ...anteriores,
            ]
        )

        const novaNotificacao = {
            id:
                `publicacao-${novaPublicacao.id}`,
            tipo: "publicacao",
            nome: "Sua publicação",
            texto:
                "foi publicada com sucesso.",
            data: formatarHora(agora),
            publicacaoId:
                novaPublicacao.id,
        }

        try {
            const notificacaoCriada =
                await criarNotificacao(
                    novaNotificacao
                )

            setNotificacoes(
                anteriores => [
                    notificacaoCriada,
                    ...anteriores,
                ]
            )
        } catch (error) {
            console.log(
                "Erro ao criar notificação:",
                error
            )
        }

        return novaPublicacao
    }

    async function editarPublicacao(
        id,
        dadosAtualizados
    ) {
        const publicacao =
            await atualizarPublicacao(
                id,
                dadosAtualizados
            )

        setPublicacoes(
            anteriores =>
                anteriores.map(item =>
                    normalizarId(item.id) ===
                    normalizarId(id)
                        ? {
                              ...item,
                              ...publicacao,
                          }
                        : item
                )
        )

        return publicacao
    }

    async function alternarCurtida(id) {
        const idString =
            normalizarId(id)

        if (curtidas[idString]) {
            const registros =
                await obterCurtidas()

            const registro =
                registros.find(
                    item =>
                        normalizarId(
                            item.publicacaoId
                        ) === idString
                )

            if (registro) {
                await excluirCurtida(
                    registro.id
                )
            }

            setCurtidas(
                anteriores => {
                    const novo = {
                        ...anteriores,
                    }

                    delete novo[idString]

                    return novo
                }
            )

            return
        }

        await criarCurtida({
            id:
                `curtida-${Date.now()}`,
            publicacaoId:
                idString,
            usuarioId:
                usuario?.id ||
                usuario?.email ||
                null,
        })

        setCurtidas(
            anteriores => ({
                ...anteriores,
                [idString]: true,
            })
        )
    }

    async function alternarSalvo(id) {
        const idString =
            normalizarId(id)

        if (
            salvos.some(
                item =>
                    normalizarId(item) ===
                    idString
            )
        ) {
            const registros =
                await obterSalvos()

            const registro =
                registros.find(
                    item =>
                        normalizarId(
                            item.publicacaoId
                        ) === idString &&
                        normalizarId(
                            item.usuarioId
                        ) ===
                            normalizarId(
                                usuario?.id ||
                                    usuario?.email
                            )
                )

            if (registro) {
                await excluirSalvo(
                    registro.id
                )
            }

            setSalvos(
                anteriores =>
                    anteriores.filter(
                        item =>
                            normalizarId(item) !==
                            idString
                    )
            )

            return
        }

        await salvarPublicacao({
            id:
                `salvo-${Date.now()}`,
            publicacaoId:
                idString,
            usuarioId:
                usuario?.id ||
                usuario?.email ||
                null,
        })

        setSalvos(
            anteriores => [
                ...anteriores,
                idString,
            ]
        )
    }

    async function adicionarComentario(
        id,
        texto
    ) {
        const textoLimpo =
            texto.trim()

        if (!textoLimpo) {
            return
        }

        const novoComentario = {
            id:
                `comentario-${Date.now()}`,
            publicacaoId:
                normalizarId(id),
            nome:
                usuario?.nome ||
                "Você",
            texto: textoLimpo,
            avatar:
                usuario?.avatar ||
                null,
            data:
                new Date().toISOString(),
        }

        const comentarioCriado =
            await criarComentario(
                novoComentario
            )

        setComentariosPorPublicacao(
            anteriores => ({
                ...anteriores,
                [id]: [
                    ...(anteriores[id] ||
                        []),
                    comentarioCriado,
                ],
            })
        )

        const novaNotificacao = {
            id:
                `comentario-notificacao-${Date.now()}`,
            tipo: "comentario",
            nome:
                usuario?.nome ||
                "Você",
            texto:
                "comentou uma publicação.",
            data: formatarHora(
                new Date()
            ),
            publicacaoId:
                normalizarId(id),
        }

        try {
            const notificacaoCriada =
                await criarNotificacao(
                    novaNotificacao
                )

            setNotificacoes(
                anteriores => [
                    notificacaoCriada,
                    ...anteriores,
                ]
            )
        } catch (error) {
            console.log(
                "Erro ao criar notificação:",
                error
            )
        }

        return comentarioCriado
    }

    async function excluirPublicacao(id) {
        const idString =
            normalizarId(id)

        try {
            await excluirPublicacaoApi(
                idString
            )

            await excluirNotificacoesDaPublicacao(
                idString
            )

            const salvosApi =
                await obterSalvos()

            const salvosDaPublicacao =
                salvosApi.filter(
                    item =>
                        normalizarId(
                            item.publicacaoId
                        ) === idString
                )

            for (
                const salvo of
                salvosDaPublicacao
            ) {
                await excluirSalvo(
                    salvo.id
                )
            }

            const curtidasApi =
                await obterCurtidas()

            const curtidasDaPublicacao =
                curtidasApi.filter(
                    item =>
                        normalizarId(
                            item.publicacaoId
                        ) === idString
                )

            for (
                const curtida of
                curtidasDaPublicacao
            ) {
                await excluirCurtida(
                    curtida.id
                )
            }

            setPublicacoes(
                anteriores =>
                    anteriores.filter(
                        item =>
                            normalizarId(
                                item.id
                            ) !== idString
                    )
            )

            setSalvos(
                anteriores =>
                    anteriores.filter(
                        item =>
                            normalizarId(item) !==
                            idString
                    )
            )

            setCurtidas(
                anteriores => {
                    const novo = {
                        ...anteriores,
                    }

                    delete novo[idString]

                    return novo
                }
            )

            setComentariosPorPublicacao(
                anteriores => {
                    const novo = {
                        ...anteriores,
                    }

                    delete novo[idString]

                    return novo
                }
            )

            setNotificacoes(
                anteriores =>
                    anteriores.filter(
                        notificacao =>
                            normalizarId(
                                notificacao.publicacaoId
                            ) !== idString
                    )
            )

            if (usuario) {
                const publicacoesUsuario =
                    (
                        usuario.publicacoes ||
                        []
                    ).filter(
                        item =>
                            normalizarId(
                                item.id
                            ) !== idString
                    )

                const usuarioAtualizado =
                    await atualizarUsuario({
                        ...usuario,
                        publicacoes:
                            publicacoesUsuario,
                    })

                setUsuario(
                    usuarioAtualizado
                )
            }
        } catch (error) {
            console.log(
                "Erro ao excluir publicação:",
                error
            )

            throw error
        }
    }

    function obterQuantidadeCurtidas(
        item
    ) {
        return (
            Number(
                item?.curtidas || 0
            ) +
            (curtidas[
                normalizarId(item?.id)
            ]
                ? 1
                : 0)
        )
    }

    function obterQuantidadeComentarios(
        item
    ) {
        return (
            Number(
                item?.comentarios || 0
            ) +
            (
                comentariosPorPublicacao[
                    normalizarId(item?.id)
                ]?.length || 0
            )
        )
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                carregando,
                publicacoes,
                notificacoes,
                curtidas,
                salvos,
                comentariosPorPublicacao,
                cadastrar,
                logar,
                sair,
                atualizar,
                publicar,
                editarPublicacao,
                alternarCurtida,
                alternarSalvo,
                adicionarComentario,
                excluirPublicacao,
                obterQuantidadeCurtidas,
                obterQuantidadeComentarios,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export function useUsuario() {
    return useContext(UsuarioContext)
}