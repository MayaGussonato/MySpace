import { StyleSheet, Dimensions, Platform } from "react-native"

const { width } = Dimensions.get("window")

const LATERAL = Math.max(20, width * 0.055)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    header: {
        height: Platform.OS === "ios" ? 70 : 64,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },

    titulo: {
        fontSize: 19,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        letterSpacing: 0,
    },

    scroll: {
        flex: 1,
    },

    lista: {
        paddingHorizontal: LATERAL,
        paddingTop: 8,
        paddingBottom: 100,
    },

    card: {
        width: "100%",
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },

    icone: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    conteudo: {
        flex: 1,
        justifyContent: "center",
    },

    texto: {
        fontSize: 13,
        lineHeight: 18,
        color: "#222222",
        fontFamily: "Inter_400Regular",
    },

    nome: {
        fontFamily: "Inter_600SemiBold",
        color: "#460303",
    },

    data: {
        marginTop: 5,
        fontSize: 11,
        color: "#999999",
        fontFamily: "Inter_400Regular",
    },
})

export default styles