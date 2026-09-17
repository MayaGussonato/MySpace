import { useState } from "react"
import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./PublicacaoStyle"
import { useUsuario } from "../../contexts/UsuarioContext"

export default function Publicacao({
    publicacao,
    onVoltar = () => {},
}) {
    const {
        curtidas,
        salvos,
        alternarCurtida,
        alternarSalvo,
        adicionarComentario,
        obterQuantidadeCurtidas,
        obterQuantidadeComentarios,
    } = useUsuario()

    const [comentario, setComentario] = useState("")

    if (!publicacao) {
        return null
    }

    const curtido = !!curtidas[publicacao.id]
    const salvo = salvos.includes(publicacao.id)

    const quantidadeCurtidas =
        obterQuantidadeCurtidas(publicacao)

    const quantidadeComentarios =
        obterQuantidadeComentarios(publicacao)

    const comentariosCadastrados =
        publicacao.comentariosCadastrados || []

    const formatarHora = data => {
        if (!data) {
            return ""
        }

        const dataPublicacao = new Date(data)

        if (isNaN(dataPublicacao.getTime())) {
            if (
                typeof data === "string" &&
                data.includes(":")
            ) {
                return data.substring(0, 5)
            }

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

    const formatarLocalizacao = localizacao => {
        if (!localizacao) {
            return ""
        }

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
                    partes.push(localizacao.rua)
                }
            }

            if (localizacao.cidade) {
                partes.push(localizacao.cidade)
            }

            if (localizacao.estado) {
                partes.push(localizacao.estado)
            }

            if (localizacao.pais) {
                partes.push(localizacao.pais)
            }

            return partes.join(" - ")
        }

        return ""
    }

    const formatarSentimento = sentimento => {
        if (!sentimento) {
            return ""
        }

        if (typeof sentimento === "string") {
            return sentimento
        }

        if (typeof sentimento === "object") {
            const emoji = sentimento.emoji || ""
            const nome = sentimento.nome || ""

            return `${emoji} ${nome}`.trim()
        }

        return ""
    }

    const enviarComentario = () => {
        const textoComentario = comentario.trim()

        if (!textoComentario) {
            return
        }

        adicionarComentario(
            publicacao.id,
            textoComentario
        )

        setComentario("")
    }

    const localizacao = formatarLocalizacao(
        publicacao.localizacao
    )

    const sentimento = formatarSentimento(
        publicacao.sentimento
    )

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.teclado}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <View style={styles.header}>
                    <Pressable
                        style={styles.botaoVoltar}
                        onPress={onVoltar}
                        hitSlop={10}
                    >
                        <Feather
                            name="chevron-left"
                            size={26}
                            color="#460303"
                        />
                    </Pressable>

                    <Text style={styles.titulo}>
                        Publicação
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.conteudo}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        <View style={styles.cardTopo}>
                            <View style={styles.avatarContainer}>
                                {publicacao.avatar ? (
                                    <Image
                                        source={
                                            typeof publicacao.avatar ===
                                            "string"
                                                ? {
                                                      uri: publicacao.avatar,
                                                  }
                                                : publicacao.avatar
                                        }
                                        style={styles.avatarImagem}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View
                                        style={
                                            styles.avatarSemImagem
                                        }
                                    >
                                        <Feather
                                            name="user"
                                            size={22}
                                            color="#999999"
                                        />
                                    </View>
                                )}
                            </View>

                            <View style={styles.infoUsuario}>
                                <Text style={styles.nome}>
                                    {publicacao.nome ||
                                        "Usuário"}
                                </Text>

                                <Text style={styles.data}>
                                    {formatarHora(
                                        publicacao.data
                                    )}
                                </Text>
                            </View>
                        </View>

                        {publicacao.texto ? (
                            <Text style={styles.texto}>
                                {publicacao.texto}
                            </Text>
                        ) : null}

                        {publicacao.imagem ? (
                            <Image
                                source={
                                    typeof publicacao.imagem ===
                                    "string"
                                        ? {
                                              uri: publicacao.imagem,
                                          }
                                        : publicacao.imagem
                                }
                                style={styles.imagem}
                                resizeMode="cover"
                            />
                        ) : null}

                        {localizacao ? (
                            <View style={styles.localizacao}>
                                <Ionicons
                                    name="location-outline"
                                    size={17}
                                    color="#460303"
                                />

                                <Text
                                    style={
                                        styles.textoLocalizacao
                                    }
                                >
                                    {localizacao}
                                </Text>
                            </View>
                        ) : null}

                        {sentimento ? (
                            <View style={styles.sentimento}>
                                <Text
                                    style={
                                        styles.textoSentimento
                                    }
                                >
                                    {sentimento}
                                </Text>
                            </View>
                        ) : null}

                        <View style={styles.acoes}>
                            <Pressable
                                style={styles.acao}
                                onPress={() =>
                                    alternarCurtida(
                                        publicacao.id
                                    )
                                }
                            >
                                <Ionicons
                                    name={
                                        curtido
                                            ? "heart"
                                            : "heart-outline"
                                    }
                                    size={23}
                                    color="#460303"
                                />

                                <Text style={styles.contador}>
                                    {quantidadeCurtidas}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.acao}
                            >
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={21}
                                    color="#460303"
                                />

                                <Text style={styles.contador}>
                                    {quantidadeComentarios}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.acaoSalvar}
                                onPress={() =>
                                    alternarSalvo(
                                        publicacao.id
                                    )
                                }
                            >
                                <Ionicons
                                    name={
                                        salvo
                                            ? "bookmark"
                                            : "bookmark-outline"
                                    }
                                    size={22}
                                    color="#460303"
                                />
                            </Pressable>
                        </View>

                        <Text style={styles.tituloComentarios}>
                            Comentários
                        </Text>

                        <View style={styles.comentarios}>
                            {comentariosCadastrados.map(
                                (item, index) => (
                                    <View
                                        key={
                                            item.id ||
                                            index
                                        }
                                        style={
                                            styles.comentario
                                        }
                                    >
                                        <View
                                            style={
                                                styles.avatarComentario
                                            }
                                        >
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
                                                        styles.imagemAvatarComentario
                                                    }
                                                />
                                            ) : (
                                                <Feather
                                                    name="user"
                                                    size={15}
                                                    color="#999999"
                                                />
                                            )}
                                        </View>

                                        <View
                                            style={
                                                styles.conteudoComentario
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.nomeComentario
                                                }
                                            >
                                                {item.nome ||
                                                    "Usuário"}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.dataComentario
                                                }
                                            >
                                                {formatarHora(
                                                    item.data
                                                )}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.textoComentario
                                                }
                                            >
                                                {item.texto}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            )}
                        </View>

                        <View style={styles.espacoFinal} />
                    </View>
                </ScrollView>

                <View style={styles.containerComentario}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.inputComentario}
                            placeholder="Adicione um comentário..."
                            placeholderTextColor="#999999"
                            value={comentario}
                            onChangeText={setComentario}
                            returnKeyType="send"
                            onSubmitEditing={
                                enviarComentario
                            }
                        />

                        <Pressable
                            style={styles.botaoEnviar}
                            onPress={enviarComentario}
                            hitSlop={8}
                        >
                            <Ionicons
                                name="paper-plane"
                                size={21}
                                color="#460303"
                            />
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}