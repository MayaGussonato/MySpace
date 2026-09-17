import { useState } from "react"

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native"

import { Ionicons } from "@expo/vector-icons"

import { SafeAreaView } from "react-native-safe-area-context"

import styles from "./ConfiguracoesStyle"

import { useUsuario } from "../../contexts/UsuarioContext"

export default function Configuracoes({ navigation }) {
    const { usuario, sair } = useUsuario()

    const [senhaVisivel, setSenhaVisivel] = useState(false)

    const voltar = () => {
        navigation.goBack()
    }

    const sairDaConta = () => {
        Alert.alert(
            "",
            "Deseja sair da conta?",
            [
                {
                    text: "Não",
                    style: "cancel",
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        await sair()

                        navigation.navigate(
                            "BoasVindas"
                        )
                    },
                },
            ]
        )
    }

    const formatarData = data => {
        if (!data) {
            return "Não informado"
        }

        const dataConvertida = new Date(data)

        if (isNaN(dataConvertida.getTime())) {
            return data
        }

        return dataConvertida.toLocaleDateString(
            "pt-BR"
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.botaoVoltar}
                        onPress={voltar}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#460303"
                        />
                    </TouchableOpacity>

                    <Text style={styles.titulo}>
                        Configurações
                    </Text>

                    <View
                        style={styles.espacoHeader}
                    />
                </View>

                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>
                        Informações da conta
                    </Text>

                    <View style={styles.item}>
                        <View style={styles.icone}>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="#460303"
                            />
                        </View>

                        <View
                            style={styles.informacao}
                        >
                            <Text style={styles.rotulo}>
                                Nome
                            </Text>

                            <Text style={styles.valor}>
                                {usuario?.nome ||
                                    "Não informado"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.linha} />

                    <View style={styles.item}>
                        <View style={styles.icone}>
                            <Ionicons
                                name="at-outline"
                                size={22}
                                color="#460303"
                            />
                        </View>

                        <View
                            style={styles.informacao}
                        >
                            <Text style={styles.rotulo}>
                                Nome de usuário
                            </Text>

                            <Text style={styles.valor}>
                                {usuario?.usuario
                                    ? `@${usuario.usuario}`
                                    : "Não informado"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.linha} />

                    <View style={styles.item}>
                        <View style={styles.icone}>
                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color="#460303"
                            />
                        </View>

                        <View
                            style={styles.informacao}
                        >
                            <Text style={styles.rotulo}>
                                E-mail
                            </Text>

                            <Text style={styles.valor}>
                                {usuario?.email ||
                                    "Não informado"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.linha} />

                    <View style={styles.item}>
                        <View style={styles.icone}>
                            <Ionicons
                                name="calendar-outline"
                                size={22}
                                color="#460303"
                            />
                        </View>

                        <View
                            style={styles.informacao}
                        >
                            <Text style={styles.rotulo}>
                                Conta criada em
                            </Text>

                            <Text style={styles.valor}>
                                {formatarData(
                                    usuario?.criadaEm ||
                                        usuario?.dataCriacao ||
                                        usuario?.createdAt
                                )}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>
                        Segurança
                    </Text>

                    <View style={styles.item}>
                        <View style={styles.icone}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color="#460303"
                            />
                        </View>

                        <View
                            style={styles.informacao}
                        >
                            <Text style={styles.rotulo}>
                                Senha
                            </Text>

                            <Text style={styles.valor}>
                                {senhaVisivel
                                    ? usuario?.senha ||
                                      "Não informado"
                                    : "••••••••"}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.botaoOlho}
                            onPress={() =>
                                setSenhaVisivel(
                                    !senhaVisivel
                                )
                            }
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={
                                    senhaVisivel
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={22}
                                color="#460303"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.botaoSair}
                    onPress={sairDaConta}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color="#FFFFFF"
                    />

                    <Text style={styles.textoSair}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}