import { useState } from "react"
import {
    View,
    Text,
    Image,
    FlatList,
    Pressable,
    StatusBar,
    SafeAreaView,
} from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import styles, { cores } from "./FeedStyle"

const AVATAR = require("../../../assets/images/img-exemplo.jpg")

const PUBLICACOES = [
    {
        id: "1",
        nome: "Mariana Costa",
        data: "Hoje às 08:42",
        avatar: require("../../../assets/images/img-exemplo4.jpg"),
        imagem: require("../../../assets/images/img-exemplo4.jpg"),
        texto: "Começando o dia com um café e uma vista dessas ☕✨",
        curtidas: 184,
        comentarios: 23,
    },
    {
        id: "2",
        nome: "Lucas Mendes",
        data: "Hoje às 07:15",
        avatar: require("../../../assets/images/img-exemplo.jpg"),
        imagem: require("../../../assets/images/img-exemplo.jpg"),
        texto: "Depois de muito tempo, finalmente consegui conhecer esse lugar. Experiência incrível!",
        curtidas: 326,
        comentarios: 41,
    },
    {
        id: "3",
        nome: "Beatriz Oliveira",
        data: "Ontem às 21:38",
        avatar: require("../../../assets/images/img-exemplo2.jpg"),
        imagem: require("../../../assets/images/img-exemplo2.jpg"),
        texto: "Um jantar simples, uma boa companhia e uma noite perfeita ❤️",
        curtidas: 512,
        comentarios: 67,
    },
    {
        id: "4",
        nome: "Rafael Almeida",
        data: "Ontem às 18:24",
        avatar: require("../../../assets/images/img-exemplo3.jpg"),
        imagem: require("../../../assets/images/img-exemplo3.jpg"),
        texto: "Explorando novos lugares e aproveitando cada momento dessa viagem 📸",
        curtidas: 278,
        comentarios: 32,
    },
    {
        id: "5",
        nome: "Ana Clara Santos",
        data: "Ontem às 15:07",
        avatar: require("../../../assets/images/img-exemplo5.jpg"),
        imagem: require("../../../assets/images/img-exemplo5.jpg"),
        texto: "Finalmente terminei esse projeto! Foram dias de muito trabalho, mas valeu a pena.",
        curtidas: 439,
        comentarios: 54,
    },
    {
        id: "6",
        nome: "Gabriel Souza",
        data: "12 de setembro às 19:52",
        avatar: require("../../../assets/images/img-exemplo6.jpg"),
        imagem: require("../../../assets/images/img-exemplo6.jpg"),
        texto: "Fim de tarde perfeito para esquecer um pouco da rotina 🌅",
        curtidas: 691,
        comentarios: 89,
    },
]

function Publicacao({ item, onPress }) {
    const [curtido, setCurtido] = useState(false)
    const [salvo, setSalvo] = useState(false)

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.cardTopo}>
                <View style={styles.avatar}>
                    <Image
                        source={item.avatar}
                        style={styles.avatarImagem}
                    />
                </View>

                <View style={styles.infoUsuario}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.data}>{item.data}</Text>
                </View>

                <Pressable
                    style={styles.botaoOpcoes}
                    hitSlop={10}
                >
                    <Feather
                        name="more-horizontal"
                        size={22}
                        color={cores.vinho}
                    />
                </Pressable>
            </View>

            <Text style={styles.texto}>{item.texto}</Text>

            <View style={styles.acoes}>
                <Pressable
                    style={styles.acao}
                    onPress={(event) => {
                        event.stopPropagation()
                        setCurtido(!curtido)
                    }}
                >
                    <Ionicons
                        name={curtido ? "heart" : "heart-outline"}
                        size={22}
                        color={cores.vinho}
                    />

                    <Text style={styles.contador}>
                        {curtido
                            ? item.curtidas + 1
                            : item.curtidas}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.acao}
                    onPress={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <Ionicons
                        name="chatbubble-outline"
                        size={21}
                        color={cores.vinho}
                    />

                    <Text style={styles.contador}>
                        {item.comentarios}
                    </Text>
                </Pressable>

                <View style={styles.espaco} />

                <Pressable
                    hitSlop={10}
                    onPress={(event) => {
                        event.stopPropagation()
                        setSalvo(!salvo)
                    }}
                >
                    <Ionicons
                        name={salvo ? "bookmark" : "bookmark-outline"}
                        size={22}
                        color={cores.vinho}
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}

export default function Feed({ onAbrirPublicacao }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={cores.fundo}
            />

            <View style={styles.header}>
                <Text style={styles.logoTexto}>MySpace</Text>

                <Pressable
                    style={styles.botaoSino}
                    hitSlop={10}
                >
                    <Feather
                        name="bell"
                        size={26}
                        color={cores.vinho}
                    />
                </Pressable>
            </View>

            <FlatList
                data={PUBLICACOES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Publicacao
                        item={item}
                        onPress={() => onAbrirPublicacao(item)}
                    />
                )}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
            />

            <Pressable style={styles.fab}>
                <Feather
                    name="plus"
                    size={30}
                    color="#FFFFFF"
                />
            </Pressable>
        </SafeAreaView>
    )
}