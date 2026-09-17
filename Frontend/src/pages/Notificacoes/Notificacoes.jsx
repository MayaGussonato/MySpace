import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from "react-native"

import { Ionicons } from "@expo/vector-icons"

import styles from "./NotificacoesStyle"

import { useUsuario } from "../../contexts/UsuarioContext"

export default function Notificacoes() {
    const { notificacoes } = useUsuario()

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
                contentContainerStyle={
                    styles.lista
                }
            >
                {notificacoes.map(
                    notificacao => {
                        let icone =
                            "person-add-outline"

                        if (
                            notificacao.tipo ===
                            "curtida"
                        ) {
                            icone =
                                "heart-outline"
                        }

                        if (
                            notificacao.tipo ===
                            "comentario"
                        ) {
                            icone =
                                "chatbubble-outline"
                        }

                        if (
                            notificacao.tipo ===
                            "publicacao"
                        ) {
                            icone =
                                "paper-plane"
                        }

                        return (
                            <View
                                key={
                                    notificacao.id
                                }
                                style={
                                    styles.card
                                }
                            >
                                <View
                                    style={
                                        styles.icone
                                    }
                                >
                                    <Ionicons
                                        name={
                                            icone
                                        }
                                        size={40}
                                        color="#460303"
                                    />
                                </View>

                                <View
                                    style={
                                        styles.conteudo
                                    }
                                >
                                    <Text
                                        style={
                                            styles.texto
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.nome
                                            }
                                        >
                                            {
                                                notificacao.nome
                                            }
                                        </Text>{" "}
                                        {
                                            notificacao.texto
                                        }
                                    </Text>

                                    <Text
                                        style={
                                            styles.data
                                        }
                                    >
                                        {
                                            notificacao.data
                                        }
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                )}
            </ScrollView>
        </SafeAreaView>
    )
}