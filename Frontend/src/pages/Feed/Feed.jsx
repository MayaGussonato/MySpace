import { useState } from "react"
import {
    View,
    Text,
    Image,
    FlatList,
    Pressable,
    StatusBar,
    SafeAreaView,
    Alert,
    TextInput,
} from "react-native"

import { Feather, Ionicons } from "@expo/vector-icons"
import styles, { cores } from "./FeedStyle"
import { useUsuario } from "../../contexts/UsuarioContext"
import { PUBLICACOES } from "../../data/publicacoes"

function Publicacao({
    item,
    onPress,
    onEditar,
}) {
    const {
        curtidas,
        salvos,
        alternarCurtida,
        alternarSalvo,
        excluirPublicacao,
        obterQuantidadeCurtidas,
        obterQuantidadeComentarios,
    } = useUsuario()

    function formatarData(data) {
        if (!data) return ""

        const dataPublicacao = new Date(data)

        if (isNaN(dataPublicacao.getTime())) {
            return data
        }

        const horas = String(
            dataPublicacao.getHours()
        ).padStart(2, "0")

        const minutos = String(
            dataPublicacao.getMinutes()
        ).padStart(2, "0")

        return `${horas}:${minutos}`
    }

    function formatarLocalizacao(localizacao) {
        if (!localizacao) return ""

        if (typeof localizacao === "string") {
            return localizacao
        }

        if (typeof localizacao === "object") {
            const partes = []

            if (localizacao.rua) {
                if (localizacao.numero) {
                    partes.push(
                        `${localizacao.rua}, ${localizacao.numero}`
                    )
                } else {
                    partes.push(
                        localizacao.rua
                    )
                }
            }

            if (localizacao.cidade) {
                partes.push(
                    localizacao.cidade
                )
            }

            if (localizacao.estado) {
                partes.push(
                    localizacao.estado
                )
            }

            return partes.join(" - ")
        }

        return ""
    }

    function formatarSentimento(sentimento) {
        if (!sentimento) return ""

        if (typeof sentimento === "string") {
            return sentimento
        }

        if (typeof sentimento === "object") {
            const emoji =
                sentimento.emoji || ""

            const nome =
                sentimento.nome || ""

            return `${emoji} ${nome}`.trim()
        }

        return ""
    }

    function abrirOpcoes() {
        Alert.alert(
            "",
            "O que você deseja fazer?",
            [
                {
                    text: "Editar post",
                    onPress: () =>
                        onEditar(item),
                },
                {
                    text: "Excluir post",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "",
                            "Tem certeza que deseja excluir?",
                            [
                                {
                                    text: "Não",
                                    style: "cancel",
                                },
                                {
                                    text: "Sim",
                                    style: "destructive",
                                    onPress: () =>
                                        excluirPublicacao(
                                            item.id
                                        ),
                                },
                            ]
                        )
                    },
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ]
        )
    }

    const curtido =
        !!curtidas[item.id]

    const salvo =
        salvos.includes(item.id)

    const quantidadeCurtidas =
        obterQuantidadeCurtidas(item)

    const quantidadeComentarios =
        obterQuantidadeComentarios(item)

    const localizacao =
        formatarLocalizacao(
            item.localizacao
        )

    const sentimento =
        formatarSentimento(
            item.sentimento
        )

    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
        >
            <View style={styles.cardTopo}>
                <View style={styles.avatar}>
                    {item.avatar ? (
                        <Image
                            source={
                                typeof item.avatar ===
                                    "string"
                                    ? {
                                        uri: item.avatar,
                                    }
                                    : item.avatar
                            }
                            style={
                                styles.avatarImagem
                            }
                            resizeMode="cover"
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                backgroundColor:
                                    "#E0C98F",
                            }}
                        >
                            <Feather
                                name="user"
                                size={22}
                                color={
                                    cores.vinho
                                }
                            />
                        </View>
                    )}
                </View>

                <View
                    style={
                        styles.infoUsuario
                    }
                >
                    <Text
                        style={
                            styles.nome
                        }
                    >
                        {item.nome ||
                            "Usuário"}
                    </Text>

                    <Text
                        style={
                            styles.data
                        }
                    >
                        {formatarData(
                            item.data
                        )}
                    </Text>
                </View>

                <Pressable
                    style={
                        styles.botaoOpcoes
                    }
                    onPress={event => {
                        event.stopPropagation()
                        abrirOpcoes()
                    }}
                >
                    <Feather
                        name="more-horizontal"
                        size={22}
                        color={
                            cores.vinho
                        }
                    />
                </Pressable>
            </View>

            {item.texto ? (
                <Text style={styles.texto}>
                    {item.texto}
                </Text>
            ) : null}

            {item.imagem ? (
                <Image
                    source={
                        typeof item.imagem ===
                            "string"
                            ? {
                                uri: item.imagem,
                            }
                            : item.imagem
                    }
                    style={{
                        width: "100%",
                        height: 280,
                        borderRadius: 12,
                        marginBottom: 12,
                    }}
                    resizeMode="cover"
                />
            ) : null}

            {localizacao ? (
                <View
                    style={{
                        flexDirection:
                            "row",
                        alignItems:
                            "center",
                        marginBottom: 8,
                    }}
                >
                    <Feather
                        name="map-pin"
                        size={14}
                        color={
                            cores.vinho
                        }
                    />

                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 12,
                            color:
                                cores.cinza,
                            fontFamily:
                                "Inter_400Regular",
                        }}
                    >
                        {localizacao}
                    </Text>
                </View>
            ) : null}

            {sentimento ? (
                <View
                    style={{
                        flexDirection:
                            "row",
                        alignItems:
                            "center",
                        marginBottom: 8,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            color:
                                cores.cinza,
                            fontFamily:
                                "Inter_400Regular",
                        }}
                    >
                        {sentimento}
                    </Text>
                </View>
            ) : null}

            <View style={styles.acoes}>
                <Pressable
                    style={styles.acao}
                    onPress={event => {
                        event.stopPropagation()
                        alternarCurtida(
                            item.id
                        )
                    }}
                >
                    <Ionicons
                        name={
                            curtido
                                ? "heart"
                                : "heart-outline"
                        }
                        size={23}
                        color={
                            cores.vinho
                        }
                    />

                    <Text
                        style={
                            styles.contador
                        }
                    >
                        {quantidadeCurtidas}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.acao}
                    onPress={event => {
                        event.stopPropagation()
                        onPress()
                    }}
                >
                    <Ionicons
                        name="chatbubble-outline"
                        size={21}
                        color={
                            cores.vinho
                        }
                    />

                    <Text
                        style={
                            styles.contador
                        }
                    >
                        {
                            quantidadeComentarios
                        }
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.acao}
                    onPress={event => {
                        event.stopPropagation()
                        alternarSalvo(
                            item.id
                        )
                    }}
                >
                    <Ionicons
                        name={
                            salvo
                                ? "bookmark"
                                : "bookmark-outline"
                        }
                        size={22}
                        color={
                            cores.vinho
                        }
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}

function ItemUsuario({
    usuario,
    onPress,
}) {
    const arroba = (
        usuario.username ||
        usuario.usuario ||
        ""
    ).replace(/^@/, "")

    return (
        <Pressable
            style={styles.itemUsuario}
            onPress={onPress}
        >
            <View
                style={
                    styles.avatarUsuario
                }
            >
                {usuario.avatar ? (
                    <Image
                        source={
                            typeof usuario.avatar ===
                                "string"
                                ? {
                                    uri: usuario.avatar,
                                }
                                : usuario.avatar
                        }
                        style={
                            styles.avatarImagem
                        }
                        resizeMode="cover"
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            backgroundColor:
                                "#E0C98F",
                        }}
                    >
                        <Feather
                            name="user"
                            size={22}
                            color={
                                cores.vinho
                            }
                        />
                    </View>
                )}
            </View>

            <View
                style={
                    styles.infoBuscaUsuario
                }
            >
                <Text
                    style={
                        styles.nomeUsuarioBusca
                    }
                >
                    {usuario.nome ||
                        "Usuário"}
                </Text>

                {arroba ? (
                    <Text
                        style={
                            styles.arrobaUsuarioBusca
                        }
                    >
                        @{arroba}
                    </Text>
                ) : null}
            </View>

            <Feather
                name="chevron-right"
                size={20}
                color={cores.vinho}
            />
        </Pressable>
    )
}

function normalizar(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
}

export default function Feed({
    onAbrirPublicacao,
    onAbrirNotificacoes,
    onAbrirCriar,
    onEditarPublicacao,
    onAbrirPerfil,
}) {
    const {
        publicacoes: novasPublicacoes,
        usuarios,
        usuario: usuarioLogado,
        carregarUsuarios,
    } = useUsuario()

    const [pesquisaAberta, setPesquisaAberta] =
        useState(false)

    const [termo, setTermo] =
        useState("")

    const publicacoesIniciais =
        PUBLICACOES || []

    const novas =
        novasPublicacoes || []

    const idsIniciais =
        new Set(
            publicacoesIniciais.map(
                item =>
                    item.id.toString()
            )
        )

    const publicacoesDoUsuario =
        novas.filter(
            item =>
                !idsIniciais.has(
                    item.id.toString()
                )
        )

    const todasPublicacoes = [
        ...publicacoesDoUsuario,
        ...publicacoesIniciais,
    ]

    const termoNormalizado =
        normalizar(termo)

    const resultados =
        termoNormalizado
            ? (usuarios || []).filter(usuario => {
                const ehVoce =
                    usuarioLogado &&
                    String(usuario.id) ===
                    String(usuarioLogado.id)

                if (ehVoce) return false

                return (
                    normalizar(
                        usuario.nome
                    ).includes(
                        termoNormalizado
                    ) ||
                    normalizar(
                        usuario.username ||
                        usuario.usuario
                    ).includes(
                        termoNormalizado
                    )
                )
            })
            : []

    function alternarPesquisa() {
        if (pesquisaAberta) {
            setTermo("")
        } else {
            carregarUsuarios()
        }

        setPesquisaAberta(
            !pesquisaAberta
        )
    }

    function abrirPerfil(usuario) {
        setTermo("")
        setPesquisaAberta(false)

        if (onAbrirPerfil) {
            onAbrirPerfil({
                ...usuario,
                usuarioId: usuario.id,
            })
        }
    }

    const mostrandoBusca =
        pesquisaAberta &&
        termoNormalizado.length > 0

    return (
        <SafeAreaView
            style={styles.container}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={
                    cores.fundo
                }
            />

            <View style={styles.header}>
                <Text
                    style={
                        styles.logoTexto
                    }
                >
                    MySpace
                </Text>

                <View
                    style={
                        styles.acoesHeader
                    }
                >
                    <Pressable
                        style={
                            styles.botaoSino
                        }
                        onPress={
                            alternarPesquisa
                        }
                    >
                        <Ionicons
                            name={
                                pesquisaAberta
                                    ? "close-outline"
                                    : "search-outline"
                            }
                            size={25}
                            color={
                                cores.vinho
                            }
                        />
                    </Pressable>

                    <Pressable
                        style={
                            styles.botaoSino
                        }
                        onPress={
                            onAbrirNotificacoes
                        }
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={25}
                            color={
                                cores.vinho
                            }
                        />
                    </Pressable>
                </View>
            </View>

            {pesquisaAberta ? (
                <View
                    style={
                        styles.caixaPesquisa
                    }
                >
                    <Feather
                        name="search"
                        size={18}
                        color={
                            cores.vinho
                        }
                    />

                    <TextInput
                        style={
                            styles.inputPesquisa
                        }
                        placeholder="Pesquisar perfis"
                        placeholderTextColor={
                            cores.cinza
                        }
                        value={termo}
                        onChangeText={
                            setTermo
                        }
                        autoFocus
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="search"
                    />

                    {termo.length > 0 ? (
                        <Pressable
                            onPress={() =>
                                setTermo("")
                            }
                        >
                            <Feather
                                name="x-circle"
                                size={18}
                                color={
                                    cores.cinza
                                }
                            />
                        </Pressable>
                    ) : null}
                </View>
            ) : null}

            {mostrandoBusca ? (
                <FlatList
                    data={resultados}
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    renderItem={({
                        item,
                    }) => (
                        <ItemUsuario
                            usuario={item}
                            onPress={() =>
                                abrirPerfil(
                                    item
                                )
                            }
                        />
                    )}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.listaBusca
                    }
                    ListEmptyComponent={
                        <Text
                            style={
                                styles.buscaVazia
                            }
                        >
                            Nenhum perfil encontrado
                        </Text>
                    }
                />
            ) : (
                <FlatList
                    data={
                        todasPublicacoes
                    }
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    renderItem={({
                        item,
                    }) => (
                        <Publicacao
                            item={item}
                            onPress={() =>
                                onAbrirPublicacao(
                                    item
                                )
                            }
                            onEditar={
                                onEditarPublicacao
                            }
                        />
                    )}
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.lista
                    }
                />
            )}

            <Pressable
                style={styles.fab}
                onPress={
                    onAbrirCriar
                }
            >
                <Feather
                    name="plus"
                    size={27}
                    color={
                        cores.branco
                    }
                />
            </Pressable>
        </SafeAreaView>
    )
}