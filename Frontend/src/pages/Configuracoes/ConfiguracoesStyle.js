import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scrollContent: {
        paddingBottom: 35,
    },

    header: {
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 22,
    },

    botaoVoltar: {
        width: 32,
        height: 32,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    espacoHeader: {
        width: 32,
        height: 32,
    },

    titulo: {
        fontSize: 19,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        letterSpacing: 0,
    },

    secao: {
        marginTop: 24,
        marginHorizontal: 22,
    },

    tituloSecao: {
        fontSize: 15,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        marginBottom: 8,
    },

    item: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },

    icone: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F3EAEA",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    informacao: {
        flex: 1,
    },

    rotulo: {
        fontSize: 12,
        color: "#999999",
        fontFamily: "Inter_400Regular",
        marginBottom: 5,
    },

    valor: {
        fontSize: 15,
        color: "#222222",
        fontFamily: "Inter_500Medium",
    },

    linha: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginLeft: 58,
    },

    botaoSair: {
        height: 50,
        marginHorizontal: 22,
        marginTop: 45,
        borderRadius: 9,
        backgroundColor: "#460303",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    textoSair: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: "Inter_600SemiBold",
    },
})

export default styles