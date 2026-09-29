import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    cadastrarUsuario,
    logarUsuario,
    obterUsuarioLogado,
    obterUsuarioPorIdentificador,
    atualizarSeguidoresUsuario,
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
    criarNotificacaoDe,
    excluirNotificacaoPorAcao,
    excluirNotificacoesDaPublicacao,
    obterSalvos,
    salvarPublicacao,
    excluirSalvo,
    obterCurtidas,
    criarCurtida,
    excluirCurtida,
    obterUsuarios,
} from "../services/api"

import { PUBLICACOES } from "../data/publicacoes"

const UsuarioContext = createContext(null)

function normalizarId(valor) {
    return valor === undefined || valor === null
        ? ""
        : valor.toString()
}

function extrairUsuario(resposta) {
    if (Array.isArray(resposta)) {
        return resposta[0] || null
    }

    return resposta || null
}

const IDS_EXEMPLO = new Set(
    (PUBLICACOES || []).map(item =>
        normalizarId(item.id)
    )
)

function formatarHora(data) {
    const dataObj = new Date(data)

    if (isNaN(dataObj.getTime())) {
        return data
    }

    return dataObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

function gerarChaveUsuario(alvo) {
    const id = normalizarId(alvo?.usuarioId)

    if (id) {
        return id
    }

    return `nome:${alvo?.nome || ""}`
}

function mesmaLista(a, b) {
    const listaA = Array.isArray(a) ? a.map(normalizarId) : []
    const listaB = Array.isArray(b) ? b.map(normalizarId) : []

    if (listaA.length !== listaB.length) {
        return false
    }

    return listaA.every((item, indice) => item === listaB[indice])
}

export function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    const [usuarios, setUsuarios] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [publicacoes, setPublicacoes] = useState(
        PUBLICACOES || []
    )
    const [notificacoes, setNotificacoes] = useState([])
    const [curtidas, setCurtidas] = useState({})
    const [contagemCurtidas, setContagemCurtidas] = useState({})
    const [salvos, setSalvos] = useState([])
    const [
        comentariosPorPublicacao,
        setComentariosPorPublicacao,
    ] = useState({})

    const idUsuarioAtual = normalizarId(
        usuario?.id || usuario?.email
    )

    const carregarUsuarios = useCallback(async () => {
        try {
            const lista = await obterUsuarios()

            const listaSemSenha = (lista || []).map(item => {
                const { senha, ...semSenha } = item

                return semSenha
            })

            setUsuarios(listaSemSenha)

            setUsuario(atual => {
                if (!atual) {
                    return atual
                }

                const fresco = listaSemSenha.find(
                    item =>
                        normalizarId(item.id) ===
                        normalizarId(atual.id)
                )

                if (!fresco) {
                    return atual
                }

                const seguidoresFrescos = Array.isArray(
                    fresco.seguidores
                )
                    ? fresco.seguidores
                    : []

                if (mesmaLista(atual.seguidores, seguidoresFrescos)) {
                    return atual
                }

                return {
                    ...atual,
                    seguidores: seguidoresFrescos,
                }
            })

            return listaSemSenha
        } catch (error) {
            console.log("Erro ao carregar usuários:", error)

            return []
        }
    }, [])

    const carregarCurtidas = useCallback(async () => {
        try {
            const curtidasApi = (await obterCurtidas()) || []

            const contagem = {}
            const minhas = {}

            curtidasApi.forEach(item => {
                const idPublicacao = normalizarId(item.publicacaoId)

                contagem[idPublicacao] =
                    (contagem[idPublicacao] || 0) + 1

                if (
                    idUsuarioAtual &&
                    normalizarId(item.usuarioId) === idUsuarioAtual
                ) {
                    minhas[idPublicacao] = true
                }
            })

            setContagemCurtidas(contagem)
            setCurtidas(minhas)
        } catch (error) {
            console.log("Erro ao carregar curtidas:", error)
        }
    }, [idUsuarioAtual])

    const carregarNotificacoes = useCallback(async () => {
        if (!usuario?.id) {
            setNotificacoes([])
            return
        }

        try {
            const lista = await obterNotificacoes(
                usuario.id
            )

            setNotificacoes(lista)
        } catch (error) {
            return
        }
    }, [usuario?.id])

    useEffect(() => {
        carregarUsuarios()
    }, [carregarUsuarios])

    useEffect(() => {
        async function carregarDados() {
            try {
                const usuarioSalvo =
                    await obterUsuarioLogado()

                const publicacoesApi =
                    await obterPublicacoes()

                if (usuarioSalvo) {
                    setUsuario({
                        ...usuarioSalvo,
                        avatar: usuarioSalvo.avatar || null,
                        publicacoes:
                            usuarioSalvo.publicacoes || [],
                    })
                }

                if (
                    publicacoesApi &&
                    publicacoesApi.length > 0
                ) {
                    setPublicacoes(anteriores => {
                        const ids = new Set(
                            anteriores.map(item =>
                                normalizarId(item.id)
                            )
                        )

                        const novas = publicacoesApi.filter(
                            item =>
                                !ids.has(normalizarId(item.id))
                        )

                        return [...novas, ...anteriores]
                    })
                }

                const todasPublicacoes = [
                    ...(publicacoesApi || []),
                    ...(PUBLICACOES || []),
                ]

                const idsConsultados = new Set()
                const comentariosApi = []

                for (const publicacao of todasPublicacoes) {
                    const idPublicacao = normalizarId(
                        publicacao.id
                    )

                    if (idsConsultados.has(idPublicacao)) {
                        continue
                    }

                    idsConsultados.add(idPublicacao)

                    const comentarios =
                        await obterComentarios(publicacao.id)

                    comentariosApi.push(
                        ...(comentarios || [])
                    )
                }

                const mapaComentarios = {}

                comentariosApi.forEach(comentario => {
                    const id = normalizarId(
                        comentario.publicacaoId
                    )

                    if (!mapaComentarios[id]) {
                        mapaComentarios[id] = []
                    }

                    mapaComentarios[id].push(comentario)
                })

                setComentariosPorPublicacao(mapaComentarios)
            } catch (error) {
                console.log("Erro ao carregar dados:", error)
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [])

    useEffect(() => {
        async function carregarInteracoes() {
            await carregarCurtidas()

            if (!idUsuarioAtual) {
                setSalvos([])
                return
            }

            try {
                const salvosApi = await obterSalvos()

                setSalvos(
                    (salvosApi || [])
                        .filter(
                            item =>
                                normalizarId(item.usuarioId) ===
                                idUsuarioAtual
                        )
                        .map(item =>
                            normalizarId(item.publicacaoId)
                        )
                )
            } catch (error) {
                console.log("Erro ao carregar salvos:", error)
            }
        }

        carregarInteracoes()
    }, [idUsuarioAtual, carregarCurtidas])

    useEffect(() => {
        carregarNotificacoes()

        if (!usuario?.id) {
            return undefined
        }

        const intervalo = setInterval(
            carregarNotificacoes,
            5000
        )

        return () => clearInterval(intervalo)
    }, [carregarNotificacoes, usuario?.id])

    useEffect(() => {
        const intervalo = setInterval(() => {
            carregarCurtidas()
            carregarUsuarios()
        }, 5000)

        return () => clearInterval(intervalo)
    }, [carregarCurtidas, carregarUsuarios])

    async function mesclarSeguidoresAtuais(base) {
        if (!base?.id) {
            return base
        }

        try {
            const fresco = extrairUsuario(
                await obterUsuarioPorIdentificador(
                    normalizarId(base.id)
                )
            )

            if (fresco && Array.isArray(fresco.seguidores)) {
                return {
                    ...base,
                    seguidores: fresco.seguidores,
                }
            }
        } catch (error) {
            return base
        }

        return base
    }

    function obterDonoParaNotificar(id) {
        const idString = normalizarId(id)

        if (IDS_EXEMPLO.has(idString)) {
            return null
        }

        const publicacao = publicacoes.find(
            item => normalizarId(item.id) === idString
        )

        const dono = normalizarId(publicacao?.usuarioId)

        return dono || null
    }

    async function cadastrar(dados) {
        const novoUsuario = await cadastrarUsuario(dados)

        carregarUsuarios()

        return {
            ...novoUsuario,
            avatar: null,
            publicacoes: [],
        }
    }

    async function logar(dados) {
        const usuarioLogado = await logarUsuario(dados)

        const usuarioNormalizado = {
            ...usuarioLogado,
            avatar: usuarioLogado?.avatar || null,
            publicacoes: usuarioLogado?.publicacoes || [],
        }

        setUsuario(usuarioNormalizado)

        const publicacoesApi = await obterPublicacoes()

        setPublicacoes([
            ...(publicacoesApi || []),
            ...PUBLICACOES,
        ])

        carregarUsuarios()

        return usuarioNormalizado
    }

    async function sair() {
        await deslogarUsuario()
        setUsuario(null)
    }

    async function atualizar(dadosAtualizados) {
        const usuarioAtual = await mesclarSeguidoresAtuais(
            usuario || {}
        )

        const usuarioMesclado = {
            ...usuarioAtual,
            ...dadosAtualizados,
        }

        const usuarioAtualizado = await atualizarUsuario(
            usuarioMesclado
        )

        const usuarioNormalizado = {
            ...usuarioAtualizado,
            ...dadosAtualizados,
            avatar:
                dadosAtualizados.avatar !== undefined
                    ? dadosAtualizados.avatar || null
                    : usuarioAtual.avatar || null,
            publicacoes:
                dadosAtualizados.publicacoes !== undefined
                    ? dadosAtualizados.publicacoes
                    : usuarioAtual.publicacoes || [],
        }

        setUsuario(usuarioNormalizado)

        setPublicacoes(anteriores =>
            anteriores.map(item => {
                const pertence =
                    normalizarId(item.usuarioId) ===
                        normalizarId(usuarioAtual.id) ||
                    normalizarId(item.usuarioId) ===
                        normalizarId(usuarioAtual.email)

                if (!pertence) {
                    return item
                }

                return {
                    ...item,
                    nome: usuarioNormalizado.nome,
                    username:
                        usuarioNormalizado.username ||
                        usuarioNormalizado.usuario ||
                        "",
                    avatar: usuarioNormalizado.avatar || null,
                }
            })
        )

        carregarUsuarios()

        return usuarioNormalizado
    }

    function estaSeguindo(alvo) {
        const chave = gerarChaveUsuario(alvo)

        const lista = Array.isArray(usuario?.seguindo)
            ? usuario.seguindo
            : []

        return lista.some(
            item => normalizarId(item) === chave
        )
    }

    function montarListaUsuarios() {
        const lista = (usuarios || []).map(item =>
            usuario &&
            normalizarId(item.id) === normalizarId(usuario.id)
                ? { ...item, ...usuario }
                : item
        )

        const jaTem =
            !usuario ||
            lista.some(
                item =>
                    normalizarId(item.id) ===
                    normalizarId(usuario.id)
            )

        return jaTem ? lista : [...lista, usuario]
    }

    function encontrarRegistro(lista, idAlvo) {
        if (!idAlvo) {
            return null
        }

        return (
            lista.find(
                item =>
                    normalizarId(item.id) === idAlvo ||
                    normalizarId(item.email) === idAlvo
            ) || null
        )
    }

    function obterQuantidadeSeguidores(alvo) {
        const idAlvo = normalizarId(alvo?.usuarioId || alvo?.id)
        const lista = montarListaUsuarios()
        const registro = encontrarRegistro(lista, idAlvo)

        const chaves = new Set()

        if (idAlvo) {
            chaves.add(idAlvo)
        }

        if (registro) {
            chaves.add(normalizarId(registro.id))

            if (registro.email) {
                chaves.add(normalizarId(registro.email))
            }
        }

        if (!idAlvo && alvo?.nome) {
            chaves.add(`nome:${alvo.nome}`)
        }

        chaves.delete("")

        const seguidores = new Set()

        if (registro && Array.isArray(registro.seguidores)) {
            registro.seguidores.forEach(item =>
                seguidores.add(normalizarId(item))
            )
        }

        lista.forEach(item => {
            if (
                registro &&
                normalizarId(item.id) === normalizarId(registro.id)
            ) {
                return
            }

            const seguindo = Array.isArray(item.seguindo)
                ? item.seguindo
                : []

            if (seguindo.some(chave => chaves.has(normalizarId(chave)))) {
                seguidores.add(normalizarId(item.id))
            }
        })

        return seguidores.size
    }

    function obterQuantidadeSeguindo(alvo) {
        const idAlvo = normalizarId(alvo?.usuarioId || alvo?.id)
        const registro = encontrarRegistro(
            montarListaUsuarios(),
            idAlvo
        )

        return Array.isArray(registro?.seguindo)
            ? registro.seguindo.length
            : 0
    }

    async function alternarSeguir(alvo) {
        if (!usuario) {
            return null
        }

        const chave = gerarChaveUsuario(alvo)

        const usuarioBase = await mesclarSeguidoresAtuais(usuario)

        const listaAtual = Array.isArray(usuarioBase.seguindo)
            ? usuarioBase.seguindo
            : []

        const jaSegue = listaAtual.some(
            item => normalizarId(item) === chave
        )

        const novaLista = jaSegue
            ? listaAtual.filter(
                  item => normalizarId(item) !== chave
              )
            : [...listaAtual, chave]

        const usuarioAtualizado = await atualizarUsuario({
            ...usuarioBase,
            seguindo: novaLista,
        })

        setUsuario({
            ...usuarioAtualizado,
            avatar: usuarioAtualizado.avatar || null,
            publicacoes: usuarioAtualizado.publicacoes || [],
        })

        const idAlvo = normalizarId(alvo?.usuarioId)
        const meuId = normalizarId(usuario.id)

        if (!idAlvo || idAlvo === meuId) {
            return null
        }

        try {
            let alvoApi = null

            try {
                alvoApi = extrairUsuario(
                    await obterUsuarioPorIdentificador(idAlvo)
                )
            } catch (error) {
                alvoApi = null
            }

            if (!alvoApi || alvoApi.id === undefined) {
                alvoApi =
                    usuarios.find(
                        item =>
                            normalizarId(item.id) === idAlvo ||
                            normalizarId(item.email) === idAlvo
                    ) || null
            }

            if (
                !alvoApi ||
                alvoApi.id === undefined ||
                normalizarId(alvoApi.id) === meuId
            ) {
                return null
            }

            const seguidoresAtuais = Array.isArray(
                alvoApi.seguidores
            )
                ? alvoApi.seguidores
                : []

            const semEu = seguidoresAtuais.filter(
                item => normalizarId(item) !== meuId
            )

            const novosSeguidores = jaSegue
                ? semEu
                : [...semEu, meuId]

            await atualizarSeguidoresUsuario(
                alvoApi.id,
                novosSeguidores
            )

            if (jaSegue) {
                await excluirNotificacaoPorAcao({
                    paraId: alvoApi.id,
                    deId: usuario.id,
                    tipo: "seguir",
                })
            } else {
                await criarNotificacaoDe({
                    paraId: alvoApi.id,
                    de: usuario,
                    tipo: "seguir",
                })
            }

            const listaAtualizada = await carregarUsuarios()

            const alvoAtualizado = listaAtualizada.find(
                item =>
                    normalizarId(item.id) ===
                    normalizarId(alvoApi.id)
            )

            return (
                alvoAtualizado || {
                    ...alvoApi,
                    seguidores: novosSeguidores,
                }
            )
        } catch (error) {
            console.log(
                "Erro ao atualizar seguidores:",
                error
            )

            return null
        }
    }

    async function publicar({
        texto,
        imagem = null,
        localizacao = null,
        sentimento = null,
    }) {
        const agora = new Date()

        const idUsuario = usuario?.id || usuario?.email || null

        const dadosPublicacao = {
            id: Date.now().toString(),
            texto: texto || "",
            imagem: imagem || null,
            localizacao: localizacao || null,
            sentimento: sentimento || null,
            data: agora.toISOString(),
            curtidas: 0,
            comentarios: 0,
            nome: usuario?.nome || "Usuário",
            username: usuario?.username || usuario?.usuario || "",
            avatar: usuario?.avatar || null,
            usuarioId: idUsuario,
        }

        const novaPublicacao = await criarPublicacao(
            dadosPublicacao
        )

        setPublicacoes(anteriores => [
            novaPublicacao,
            ...anteriores,
        ])

        const novaNotificacao = {
            id: `publicacao-${novaPublicacao.id}`,
            paraId: usuario?.id,
            deId: usuario?.id,
            tipo: "publicacao",
            nome: "Sua publicação",
            texto: "foi publicada com sucesso.",
            data: formatarHora(agora),
            criadaEm: agora.toISOString(),
            publicacaoId: novaPublicacao.id,
        }

        try {
            const notificacaoCriada = await criarNotificacao(
                novaNotificacao
            )

            setNotificacoes(anteriores => [
                notificacaoCriada,
                ...anteriores,
            ])
        } catch (error) {
            console.log("Erro ao criar notificação:", error)
        }

        return novaPublicacao
    }

    async function editarPublicacao(id, dadosAtualizados) {
        const publicacao = await atualizarPublicacao(
            id,
            dadosAtualizados
        )

        setPublicacoes(anteriores =>
            anteriores.map(item =>
                normalizarId(item.id) === normalizarId(id)
                    ? { ...item, ...publicacao }
                    : item
            )
        )

        return publicacao
    }

    async function alternarCurtida(id) {
        if (!usuario) {
            return
        }

        const idString = normalizarId(id)
        const donoId = obterDonoParaNotificar(idString)

        if (curtidas[idString]) {
            const registros = await obterCurtidas()

            const registro = registros.find(
                item =>
                    normalizarId(item.publicacaoId) ===
                        idString &&
                    normalizarId(item.usuarioId) ===
                        idUsuarioAtual
            )

            if (registro) {
                await excluirCurtida(registro.id)
            }

            setCurtidas(anteriores => {
                const novo = { ...anteriores }

                delete novo[idString]

                return novo
            })

            setContagemCurtidas(anteriores => ({
                ...anteriores,
                [idString]: Math.max(
                    (anteriores[idString] || 0) - 1,
                    0
                ),
            }))

            if (donoId) {
                await excluirNotificacaoPorAcao({
                    paraId: donoId,
                    deId: usuario.id,
                    tipo: "curtida",
                    publicacaoId: idString,
                })
            }

            return
        }

        await criarCurtida({
            id: `curtida-${Date.now()}`,
            publicacaoId: idString,
            usuarioId: idUsuarioAtual,
        })

        setCurtidas(anteriores => ({
            ...anteriores,
            [idString]: true,
        }))

        setContagemCurtidas(anteriores => ({
            ...anteriores,
            [idString]: (anteriores[idString] || 0) + 1,
        }))

        if (donoId) {
            await criarNotificacaoDe({
                paraId: donoId,
                de: usuario,
                tipo: "curtida",
                publicacaoId: idString,
            })
        }
    }

    async function alternarSalvo(id) {
        if (!usuario) {
            return
        }

        const idString = normalizarId(id)
        const donoId = obterDonoParaNotificar(idString)

        if (
            salvos.some(
                item => normalizarId(item) === idString
            )
        ) {
            const registros = await obterSalvos()

            const registro = registros.find(
                item =>
                    normalizarId(item.publicacaoId) ===
                        idString &&
                    normalizarId(item.usuarioId) ===
                        idUsuarioAtual
            )

            if (registro) {
                await excluirSalvo(registro.id)
            }

            setSalvos(anteriores =>
                anteriores.filter(
                    item => normalizarId(item) !== idString
                )
            )

            if (donoId) {
                await excluirNotificacaoPorAcao({
                    paraId: donoId,
                    deId: usuario.id,
                    tipo: "salvo",
                    publicacaoId: idString,
                })
            }

            return
        }

        await salvarPublicacao({
            id: `salvo-${Date.now()}`,
            publicacaoId: idString,
            usuarioId: idUsuarioAtual,
        })

        setSalvos(anteriores => [...anteriores, idString])

        if (donoId) {
            await criarNotificacaoDe({
                paraId: donoId,
                de: usuario,
                tipo: "salvo",
                publicacaoId: idString,
            })
        }
    }

    async function adicionarComentario(id, texto) {
        const textoLimpo = texto.trim()

        if (!textoLimpo) {
            return
        }

        const idString = normalizarId(id)

        const novoComentario = {
            id: `comentario-${Date.now()}`,
            publicacaoId: idString,
            nome: usuario?.nome || "Você",
            texto: textoLimpo,
            avatar: usuario?.avatar || null,
            data: new Date().toISOString(),
        }

        const comentarioCriado = await criarComentario(
            novoComentario
        )

        setComentariosPorPublicacao(anteriores => ({
            ...anteriores,
            [idString]: [
                ...(anteriores[idString] || []),
                comentarioCriado,
            ],
        }))

        const donoId = obterDonoParaNotificar(idString)

        if (donoId && usuario) {
            await criarNotificacaoDe({
                paraId: donoId,
                de: usuario,
                tipo: "comentario",
                publicacaoId: idString,
            })
        }

        return comentarioCriado
    }

    async function excluirPublicacao(id) {
        const idString = normalizarId(id)

        try {
            await excluirPublicacaoApi(idString)

            await excluirNotificacoesDaPublicacao(idString)

            const salvosApi = await obterSalvos()

            const salvosDaPublicacao = salvosApi.filter(
                item =>
                    normalizarId(item.publicacaoId) ===
                    idString
            )

            for (const salvo of salvosDaPublicacao) {
                await excluirSalvo(salvo.id)
            }

            const curtidasApi = await obterCurtidas()

            const curtidasDaPublicacao = curtidasApi.filter(
                item =>
                    normalizarId(item.publicacaoId) ===
                    idString
            )

            for (const curtida of curtidasDaPublicacao) {
                await excluirCurtida(curtida.id)
            }

            setPublicacoes(anteriores =>
                anteriores.filter(
                    item => normalizarId(item.id) !== idString
                )
            )

            setSalvos(anteriores =>
                anteriores.filter(
                    item => normalizarId(item) !== idString
                )
            )

            setCurtidas(anteriores => {
                const novo = { ...anteriores }

                delete novo[idString]

                return novo
            })

            setContagemCurtidas(anteriores => {
                const novo = { ...anteriores }

                delete novo[idString]

                return novo
            })

            setComentariosPorPublicacao(anteriores => {
                const novo = { ...anteriores }

                delete novo[idString]

                return novo
            })

            setNotificacoes(anteriores =>
                anteriores.filter(
                    notificacao =>
                        normalizarId(notificacao.publicacaoId) !==
                        idString
                )
            )

            if (usuario) {
                const usuarioBase = await mesclarSeguidoresAtuais(
                    usuario
                )

                const publicacoesUsuario = (
                    usuarioBase.publicacoes || []
                ).filter(
                    item => normalizarId(item.id) !== idString
                )

                const usuarioAtualizado =
                    await atualizarUsuario({
                        ...usuarioBase,
                        publicacoes: publicacoesUsuario,
                    })

                setUsuario(usuarioAtualizado)
            }
        } catch (error) {
            console.log("Erro ao excluir publicação:", error)

            throw error
        }
    }

    function obterQuantidadeCurtidas(item) {
        return (
            Number(item?.curtidas || 0) +
            (contagemCurtidas[normalizarId(item?.id)] || 0)
        )
    }

    function obterQuantidadeComentarios(item) {
        return (
            comentariosPorPublicacao[normalizarId(item?.id)]
                ?.length || 0
        )
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                usuarios,
                carregando,
                publicacoes,
                notificacoes,
                curtidas,
                contagemCurtidas,
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
                alternarSeguir,
                estaSeguindo,
                obterQuantidadeSeguidores,
                obterQuantidadeSeguindo,
                adicionarComentario,
                excluirPublicacao,
                obterQuantidadeCurtidas,
                obterQuantidadeComentarios,
                carregarNotificacoes,
                carregarUsuarios,
                carregarCurtidas,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export function useUsuario() {
    return useContext(UsuarioContext)
}