import { useEffect, useState } from "react"

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "./PerfilUsuarioStyle"

import { useUsuario } from "../../contexts/UsuarioContext"
import { obterUsuarioPorIdentificador } from "../../services/api"

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

export default function PerfilUsuario({ navigation, route }) {
    const {
        usuario,
        publicacoes,
        alternarSeguir,
        estaSeguindo,
        obterQuantidadeSeguidores,
        obterQuantidadeSeguindo,
    } = useUsuario()

    const params = route?.params || {}

    const [usuarioApi, setUsuarioApi] = useState(null)
    const [processando, setProcessando] = useState(false)

    useEffect(() => {
        let ativo = true

        async function carregar() {
            try {
                const encontrado = extrairUsuario(
                    await obterUsuarioPorIdentificador(
                        params.usuarioId
                    )
                )

                if (ativo && encontrado) {
                    setUsuarioApi(encontrado)
                }
            } catch (erro) {
                return
            }
        }

        carregar()

        return () => {
            ativo = false
        }
    }, [params.usuarioId])

    const nome = usuarioApi?.nome || params.nome || "Usuário"

    const avatar = usuarioApi?.avatar || params.avatar || null

    const nomeUsuario = (
        usuarioApi?.username ||
        usuarioApi?.usuario ||
        ""
    ).replace(/^@/, "")

    const bio = usuarioApi?.bio || ""

    const ehMeuPerfil =
        !!usuario &&
        !!params.usuarioId &&
        (normalizarId(params.usuarioId) ===
            normalizarId(usuario.id) ||
            normalizarId(params.usuarioId) ===
                normalizarId(usuario.email))

    const alvo = {
        usuarioId: params.usuarioId,
        nome,
    }

    const seguindoEsteUsuario = estaSeguindo(alvo)

    const quantidadeSeguidores = obterQuantidadeSeguidores(alvo)

    const quantidadeSeguindo = obterQuantidadeSeguindo(alvo)

    const publicacoesDoUsuario = (publicacoes || []).filter(item => {
        if (params.usuarioId) {
            return (
                normalizarId(item.usuarioId) ===
                normalizarId(params.usuarioId)
            )
        }

        return item.nome === nome
    })

    const aoSeguir = async () => {
        if (processando) {
            return
        }

        setProcessando(true)

        try {
            const alvoAtualizado = await alternarSeguir(alvo)

            if (alvoAtualizado) {
                setUsuarioApi(alvoAtualizado)
            }
        } catch (erro) {
            console.log("Erro ao seguir:", erro)
        } finally {
            setProcessando(false)
        }
    }

    const abrirPublicacao = item => {
        navigation.navigate("DPublicacao", {
            id: item.id,
            usuarioId: item.usuarioId || params.usuarioId || null,
            nome: item.nome || nome,
            data: item.data || "",
            avatar: item.avatar || avatar,
            texto: item.texto || "",
            imagem: item.imagem || null,
            curtidas: item.curtidas || 0,
            comentarios: item.comentarios || 0,
            localizacao: item.localizacao || "",
            sentimento: item.sentimento || null,
            comentariosCadastrados: item.comentariosCadastrados || [],
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.botaoVoltar}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color="#460303"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Perfil</Text>

                    <View style={styles.headerEspaco} />
                </View>

                <View style={styles.profileArea}>
                    <View style={styles.profileImageWrapper}>
                        <View style={styles.profileImage}>
                            {avatar ? (
                                <Image
                                    source={
                                        typeof avatar === "string"
                                            ? { uri: avatar }
                                            : avatar
                                    }
                                    style={styles.profileImageContent}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={styles.profileImageContent}>
                                    <Ionicons
                                        name="person"
                                        size={44}
                                        color="#999999"
                                    />
                                </View>
                            )}
                        </View>
                    </View>

                    <Text style={styles.name}>{nome}</Text>

                    {nomeUsuario ? (
                        <Text style={styles.username}>@{nomeUsuario}</Text>
                    ) : null}
                </View>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            {publicacoesDoUsuario.length}
                        </Text>

                        <Text style={styles.statLabel}>publicações</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            {quantidadeSeguidores}
                        </Text>

                        <Text style={styles.statLabel}>seguidores</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            {quantidadeSeguindo}
                        </Text>

                        <Text style={styles.statLabel}>seguindo</Text>
                    </View>
                </View>

                {!ehMeuPerfil ? (
                    <TouchableOpacity
                        style={[
                            styles.botaoSeguir,
                            seguindoEsteUsuario && styles.botaoSeguindo,
                        ]}
                        onPress={aoSeguir}
                        activeOpacity={0.85}
                        disabled={processando}
                    >
                        <Text
                            style={[
                                styles.textoBotaoSeguir,
                                seguindoEsteUsuario &&
                                    styles.textoBotaoSeguindo,
                            ]}
                        >
                            {seguindoEsteUsuario ? "Seguindo" : "Seguir"}
                        </Text>
                    </TouchableOpacity>
                ) : null}

                {bio ? (
                    <View style={styles.descricaoArea}>
                        <Text style={styles.bio}>{bio}</Text>
                    </View>
                ) : (
                    <View style={styles.descricaoArea} />
                )}

                <View style={styles.tabs}>
                    <View style={styles.tab}>
                        <Ionicons
                            name="grid-outline"
                            size={21}
                            color="#460303"
                        />
                    </View>
                </View>

                <View style={styles.tabLinha}>
                    <View style={styles.tabLinhaParte} />
                </View>

                <View style={styles.grid}>
                    {publicacoesDoUsuario.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.photoPlaceholder}
                            onPress={() => abrirPublicacao(item)}
                            activeOpacity={0.85}
                        >
                            {item.imagem ? (
                                <Image
                                    source={
                                        typeof item.imagem === "string"
                                            ? { uri: item.imagem }
                                            : item.imagem
                                    }
                                    style={styles.gridImage}
                                    resizeMode="cover"
                                />
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}