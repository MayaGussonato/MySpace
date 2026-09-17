import {
    StyleSheet,
    Dimensions,
    Platform,
} from "react-native"

const { width } =
    Dimensions.get("window")

export const cores = {
    fundo: "#FFFFFF",
    primaria: "#460303",
    texto: "#222222",
    placeholder: "#999999",
    caixa: "#F2F2F2",
}

const LATERAL = Math.max(
    20,
    width * 0.055
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            cores.fundo,
    },

    conteudo: {
        flex: 1,
        paddingHorizontal:
            LATERAL,
        paddingTop:
            Platform.OS === "ios"
                ? 12
                : 18,
    },

    header: {
        height: 70,
        alignItems: "center",
        justifyContent:
            "center",
        position: "relative",
    },

    botaoVoltar: {
        width: 36,
        height: 36,
        alignItems:
            "flex-start",
        justifyContent:
            "center",
        position: "absolute",
        left: LATERAL,
    },

    espacoHeader: {
        width: 36,
        height: 36,
    },

    titulo: {
        fontSize: 19,
        fontFamily:
            "Inter_600SemiBold",
        color: "#650000",
        letterSpacing: 0,
    },

    pergunta: {
        fontSize: 16,
        fontFamily:
            "Inter_600SemiBold",
        color: cores.texto,
        marginTop: 20,
        marginBottom: 12,
        marginHorizontal:
            LATERAL,
    },

    caixaPrincipal: {
        width: "100%",
        backgroundColor:
            cores.caixa,
        borderRadius: 12,
        padding: 12,
    },

    caixa: {
        width:
            width -
            LATERAL * 2,
        minHeight: 250,
        backgroundColor:
            "#FFFFFF",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        overflow: "hidden",
        marginHorizontal:
            LATERAL,
    },

    campoTexto: {
        flex: 1,
        minHeight: 120,
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 32,
        fontSize: 15,
        color: cores.texto,
        fontFamily:
            "Inter_400Regular",
        textAlignVertical:
            "top",
    },

    contador: {
        position: "absolute",
        right: 12,
        bottom: 9,
        fontSize: 11,
        color: "#999999",
        fontFamily:
            "Inter_400Regular",
    },

    caixa_localizacao: {
        width:
            width -
            LATERAL * 2,
        marginHorizontal:
            LATERAL,
        marginTop: 12,
        padding: 12,
        backgroundColor:
            "#F8F8F8",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    campoTexto_Localizacao: {
        fontSize: 13,
        color: cores.placeholder,
        fontFamily:
            "Inter_400Regular",
    },

    verCoordenadas: {
        marginTop: 8,
        color: cores.primaria,
        fontSize: 12,
        fontFamily:
            "Inter_600SemiBold",
    },

    coordenadas: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor:
            "#E5E5E5",
    },

    previewContainer: {
        width:
            width -
            LATERAL * 2,
        marginHorizontal:
            LATERAL,
        marginTop: 12,
        borderRadius: 10,
        overflow: "hidden",
    },

    previewImagem: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },

    acoes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "space-between",
        width:
            width -
            LATERAL * 2,
        marginHorizontal:
            LATERAL,
        marginTop: 14,
    },

    acao: {
        width: "32%",
        alignItems: "center",
        justifyContent:
            "center",
        minHeight: 42,
    },

    iconeAcao: {
        marginBottom: 4,
    },

    rotuloAcao: {
        fontSize: 12,
        color: cores.primaria,
        fontFamily:
            "Inter_500Medium",
        textAlign: "center",
    },

    emojiBotao: {
        fontSize: 18,
        marginBottom: 4,
    },

    caixaSentimentos: {
        width:
            width -
            LATERAL * 2,
        marginHorizontal:
            LATERAL,
        marginTop: 10,
        padding: 10,
        backgroundColor:
            "#F8F8F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    opcaoSentimento: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },

    sentimentoSelecionado: {
        backgroundColor:
            "#EFE1E1",
    },

    emojiSentimento: {
        fontSize: 20,
        width: 35,
    },

    nomeSentimento: {
        fontSize: 14,
        color: cores.texto,
        fontFamily:
            "Inter_400Regular",
    },

    publishButton: {
        width:
            width -
            LATERAL * 2,
        height: 48,
        borderRadius: 9,
        alignItems: "center",
        justifyContent:
            "center",
        marginHorizontal:
            LATERAL,
        marginTop: 35,
        marginBottom: 30,
        backgroundColor:
            "#460303",
    },

    publishButtonDisabled: {
        backgroundColor:
            "#8A5A5A",
    },

    publishButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily:
            "Inter_600SemiBold",
    },

    botaoPublicar: {
        width: "100%",
        height: 48,
        borderRadius: 9,
        alignItems: "center",
        justifyContent:
            "center",
        marginTop: 35,
    },

    botaoPublicarInativo: {
        backgroundColor:
            "#8A5A5A",
    },

    botaoPublicarAtivo: {
        backgroundColor:
            "#460303",
    },

    textoPublicar: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily:
            "Inter_600SemiBold",
    },

    botoesEdicao: {
        width:
            width -
            LATERAL * 2,
        marginHorizontal:
            LATERAL,
        marginTop: 35,
        marginBottom: 30,
        gap: 14,
    },

    botaoSalvarEdicao: {
        width: "100%",
        height: 48,
        borderRadius: 9,
        alignItems: "center",
        justifyContent:
            "center",
        backgroundColor:
            "#460303",
    },

    botaoCancelarEdicao: {
        width: "100%",
        height: 56,
        borderRadius: 16,
        borderWidth: 3,
        borderColor:
            "#460303",
        backgroundColor:
            "#FFFFFF",
        alignItems: "center",
        justifyContent:
            "center",
    },

    textoCancelarEdicao: {
        color: "#460303",
        fontSize: 17,
        fontFamily:
            "Inter_600SemiBold",
    },
})

export default styles