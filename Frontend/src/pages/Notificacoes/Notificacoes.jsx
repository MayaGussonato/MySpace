    import { useEffect } from "react"

    import {
        View,
        Text,
        ScrollView,
        SafeAreaView,
    } from "react-native"

    import { Ionicons } from "@expo/vector-icons"

    import styles from "./NotificacoesStyle"

    import { useUsuario } from "../../contexts/UsuarioContext"

    const ICONES = {
        seguir: "person-add-outline",
        curtida: "heart-outline",
        comentario: "chatbubble-outline",
        salvo: "bookmark-outline",
        publicacao: "paper-plane",
    }

    export default function Notificacoes() {
        const { notificacoes, carregarNotificacoes } = useUsuario()

        useEffect(() => {
            carregarNotificacoes()
        }, [])

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        Notificações
                    </Text>
                </View>

                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.lista}
                >
                    {notificacoes.length === 0 && (
                        <Text style={styles.data}>
                            Você ainda não tem notificações.
                        </Text>
                    )}

                    {notificacoes.map(notificacao => (
                        <View
                            key={notificacao.id}
                            style={styles.card}
                        >
                            <View style={styles.icone}>
                                <Ionicons
                                    name={
                                        ICONES[notificacao.tipo] ||
                                        "notifications-outline"
                                    }
                                    size={40}
                                    color="#460303"
                                />
                            </View>

                            <View style={styles.conteudo}>
                                <Text style={styles.texto}>
                                    <Text style={styles.nome}>
                                        {notificacao.nome}
                                    </Text>{" "}
                                    {notificacao.texto}
                                </Text>

                                <Text style={styles.data}>
                                    {notificacao.data}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        )
    }