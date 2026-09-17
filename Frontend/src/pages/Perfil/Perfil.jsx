import { useState } from "react"

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

import styles from "./PerfilStyle"

import { useUsuario } from "../../contexts/UsuarioContext"

export default function Perfil({ navigation }) {
    const {
        usuario,
        publicacoes,
        salvos,
    } = useUsuario()

    const [abaSelecionada, setAbaSelecionada] = useState("fotos")

    const minhasPublicacoes = usuario?.publicacoes || []

    const publicacoesSalvas = (publicacoes || []).filter(
        item => salvos.includes(item.id)
    )

    const publicacoesExibidas =
        abaSelecionada === "fotos"
            ? minhasPublicacoes
            : publicacoesSalvas

    const abrirPublicacao = item => {
        navigation.navigate("DPublicacao", {
            id: item.id,
            usuarioId:
                item.usuarioId ||
                usuario?.id ||
                usuario?.email ||
                null,
            nome: item.nome || usuario?.nome || "",
            data: item.data || "",
            avatar:
                item.avatar ||
                usuario?.avatar ||
                null,
            texto: item.texto || "",
            imagem: item.imagem || null,
            curtidas: item.curtidas || 0,
            comentarios: item.comentarios || 0,
            localizacao: item.localizacao || "",
            sentimento: item.sentimento || null,
            comentariosCadastrados:
                item.comentariosCadastrados || [],
        })
    }

    const abrirEditarPerfil = () => {
        navigation.navigate("EditarPerfil")
    }

    const abrirConfiguracoes = () => {
        navigation.navigate("Configuracoes")
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.headerEspaco} />

                    <Text style={styles.headerTitle}>
                        Perfil
                    </Text>

                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={abrirConfiguracoes}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="settings-outline"
                            size={23}
                            color="#460303"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileArea}>
                    <TouchableOpacity
                        style={styles.profileImageWrapper}
                        onPress={abrirEditarPerfil}
                        activeOpacity={0.8}
                    >
                        <View style={styles.profileImage}>
                            {usuario?.avatar ? (
                                <Image
                                    source={{
                                        uri: usuario.avatar,
                                    }}
                                    style={
                                        styles.profileImageContent
                                    }
                                    resizeMode="cover"
                                />
                            ) : (
                                <View
                                    style={
                                        styles.profileImageContent
                                    }
                                >
                                    <Ionicons
                                        name="person"
                                        size={44}
                                        color="#999999"
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.lapizIcon}>
                            <Ionicons
                                name="pencil"
                                size={15}
                                color="#460303"
                            />
                        </View>
                    </TouchableOpacity>

                    {usuario?.nome ? (
                        <Text style={styles.name}>
                            {usuario.nome}
                        </Text>
                    ) : null}

                    {usuario?.usuario ? (
                        <Text style={styles.username}>
                            @{usuario.usuario}
                        </Text>
                    ) : null}
                </View>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            {minhasPublicacoes.length}
                        </Text>

                        <Text style={styles.statLabel}>
                            publicações
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            845
                        </Text>

                        <Text style={styles.statLabel}>
                            seguidores
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>
                            299
                        </Text>

                        <Text style={styles.statLabel}>
                            seguindo
                        </Text>
                    </View>
                </View>

                {usuario?.bio ? (
                    <View style={styles.descricaoArea}>
                        <Text style={styles.bio}>
                            {usuario.bio}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.descricaoArea} />
                )}

                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() =>
                            setAbaSelecionada("fotos")
                        }
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="grid-outline"
                            size={21}
                            color={
                                abaSelecionada === "fotos"
                                    ? "#460303"
                                    : "#AAAAAA"
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() =>
                            setAbaSelecionada("salvos")
                        }
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="bookmark-outline"
                            size={21}
                            color={
                                abaSelecionada === "salvos"
                                    ? "#460303"
                                    : "#AAAAAA"
                            }
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabLinha}>
                    <View
                        style={[
                            styles.tabLinhaParte,
                            abaSelecionada === "fotos"
                                ? styles.tabLinhaAtiva
                                : styles.tabLinhaInativa,
                        ]}
                    />

                    <View
                        style={[
                            styles.tabLinhaParte,
                            abaSelecionada === "salvos"
                                ? styles.tabLinhaAtiva
                                : styles.tabLinhaInativa,
                        ]}
                    />
                </View>

                <View style={styles.grid}>
                    {publicacoesExibidas.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.photoPlaceholder}
                            onPress={() =>
                                abrirPublicacao(item)
                            }
                            activeOpacity={0.85}
                        >
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