import { StyleSheet, Platform, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const ESPACAMENTO_LATERAL = Math.max(
    24,
    Math.min(30, width * 0.075)
)

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    teclado: {
        flex: 1,
    },

    header: {
        height: Platform.OS === "ios" ? 70 : 64,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        position: "relative",
    },

    botaoVoltar: {
        position: "absolute",
        left: ESPACAMENTO_LATERAL,
        width: 36,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    titulo: {
        fontSize: 19,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        textAlign: "center",
        letterSpacing: 0,
    },

    headerEspaco: {
        width: 36,
        height: 40,
    },

    conteudo: {
        paddingHorizontal: ESPACAMENTO_LATERAL,
        paddingTop: 8,
        paddingBottom: 18,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
    },

    cardTopo: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },

    usuario: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#EEEEEE",
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    avatarImagem: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    avatarSemImagem: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
    },

    infoUsuario: {
        flex: 1,
        marginLeft: 10,
    },

    nome: {
        fontSize: 14,
        color: "#1E1E1E",
        fontFamily: "Inter_600SemiBold",
    },

    data: {
        marginTop: 2,
        fontSize: 11,
        color: "#777777",
        fontFamily: "Inter_400Regular",
    },

    texto: {
        marginTop: 12,
        marginBottom: 10,
        fontSize: 14,
        lineHeight: 20,
        color: "#1E1E1E",
        fontFamily: "Inter_400Regular",
    },

    imagem: {
        width: "100%",
        height: 280,
        borderRadius: 12,
        marginTop: 0,
    },

    informacao: {
        width: "100%",
        marginTop: 7,
    },

    informacaoTexto: {
        fontSize: 12,
        color: "#555555",
        fontFamily: "Inter_400Regular",
    },

    localizacao: {
        width: "100%",
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    textoLocalizacao: {
        flex: 1,
        marginLeft: 7,
        fontSize: 12,
        lineHeight: 17,
        color: "#555555",
        fontFamily: "Inter_400Regular",
    },

    sentimento: {
        width: "100%",
        marginTop: 7,
    },

    textoSentimento: {
        fontSize: 12,
        color: "#555555",
        fontFamily: "Inter_400Regular",
    },

    acoes: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
        paddingBottom: 12,
    },

    acao: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 22,
        paddingVertical: 4,
    },

    acaoSalvar: {
        marginLeft: "auto",
        paddingVertical: 4,
    },

    contador: {
        marginLeft: 6,
        fontSize: 13,
        color: "#1E1E1E",
        fontFamily: "Inter_400Regular",
    },

    tituloComentarios: {
        marginTop: 2,
        marginBottom: 12,
        fontSize: 14,
        color: "#1E1E1E",
        fontFamily: "Inter_600SemiBold",
    },

    comentarios: {
        width: "100%",
    },

    comentario: {
        flexDirection: "row",
        marginBottom: 15,
    },

    avatarComentario: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#EEEEEE",
    },

    imagemAvatarComentario: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    conteudoComentario: {
        flex: 1,
        marginLeft: 8,
    },

    nomeComentario: {
        fontSize: 13,
        color: "#1E1E1E",
        fontFamily: "Inter_600SemiBold",
    },

    dataComentario: {
        marginTop: 1,
        fontSize: 10,
        color: "#888888",
        fontFamily: "Inter_400Regular",
    },

    textoComentario: {
        marginTop: 7,
        fontSize: 12,
        lineHeight: 18,
        color: "#1E1E1E",
        fontFamily: "Inter_400Regular",
    },

    espacoFinal: {
        height: 10,
    },

    containerComentario: {
        width: "100%",
        paddingHorizontal: ESPACAMENTO_LATERAL,
        paddingTop: 9,
        paddingBottom: Platform.OS === "ios" ? 12 : 10,
        backgroundColor: "#FFFFFF",
    },

    inputWrapper: {
        width: "100%",
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D5D5D5",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        position: "relative",
    },

    inputComentario: {
        flex: 1,
        height: 42,
        paddingHorizontal: 13,
        paddingVertical: 9,
        paddingRight: 44,
        fontSize: 13,
        color: "#1E1E1E",
        fontFamily: "Inter_400Regular",
    },

    botaoEnviar: {
        position: "absolute",
        right: 5,
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
    },
})