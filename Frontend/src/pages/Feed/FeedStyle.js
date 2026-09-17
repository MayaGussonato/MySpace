import { StyleSheet, Platform } from "react-native"

export const cores = {
    fundo: "#F4F1F6",
    branco: "#FFFFFF",
    vinho: "#460303",
    texto: "#1E1E1E",
    cinza: "#8E8E93",
}

const AVATAR_TAM = 46

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 16 : 8,
        paddingBottom: 14,
        backgroundColor: cores.fundo,
    },

    logoTexto: {
        fontSize: 30,
        color: cores.vinho,
        fontFamily: "BodoniModa_700Bold",
    },

    botaoSino: {
        padding: 4,
    },

    lista: {
        paddingHorizontal: 14,
        paddingBottom: 24,
    },

    card: {
        backgroundColor: cores.branco,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },

    cardTopo: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: AVATAR_TAM,
        height: AVATAR_TAM,
        borderRadius: AVATAR_TAM / 2,
        backgroundColor: "#DDD",
        overflow: "hidden",
    },

    avatarImagem: {
        width: AVATAR_TAM,
        height: AVATAR_TAM,
    },

    infoUsuario: {
        flex: 1,
        marginLeft: 12,
    },

    nome: {
        fontSize: 16,
        color: cores.vinho,
        fontFamily: "Inter_600SemiBold",
    },

    data: {
        fontSize: 12,
        color: cores.cinza,
        marginTop: 2,
        fontFamily: "Inter_400Regular",
    },

    botaoOpcoes: {
        paddingHorizontal: 4,
        paddingVertical: 8,
    },

    texto: {
        fontSize: 15,
        lineHeight: 21,
        color: cores.texto,
        marginTop: 14,
        marginBottom: 12,
        fontFamily: "Inter_400Regular",
    },

    acoes: {
        flexDirection: "row",
        alignItems: "center",
    },

    acao: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 22,
        paddingVertical: 4,
    },

    contador: {
        marginLeft: 6,
        fontSize: 13,
        color: cores.texto,
        fontFamily: "Inter_400Regular",
    },

    espaco: {
        flex: 1,
    },

    fab: {
        position: "absolute",
        right: 18,
        bottom: 18,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: cores.vinho,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 6,
    },
})