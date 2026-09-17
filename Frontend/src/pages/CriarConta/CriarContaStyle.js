import { StyleSheet } from "react-native"

const cores = {
    vinho: "#460303",
    preto: "#000000",
    prata: "#B7B7B7",
    branco: "#FFFFFF",
    pessego: "#E0C98F",
    fundo: "#F7F6F4",
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
        paddingHorizontal: 24,
    },

    topo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    botaoVoltar: {
        width: 40,
        height: 40,
        justifyContent: "center",
    },

    headerSpace: {
        width: 40,
    },

    titulo: {
        flex: 1,
        textAlign: "center",
        fontSize: 22,
        fontFamily: "Inter_600SemiBold",
        color: cores.vinho,
    },

    form: {
        flex: 1,
        marginTop: 70,
    },

    label: {
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
        color: cores.vinho,
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: cores.prata,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: "Inter_400Regular",
        color: cores.preto,
        backgroundColor: cores.branco,
        marginBottom: 24,
    },

    campoSenha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: cores.prata,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: cores.branco,
        marginBottom: 24,
    },

    inputSenha: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: "Inter_400Regular",
        color: cores.preto,
    },

    botaoCriarConta: {
        backgroundColor: cores.vinho,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
    },

    textoBotaoCriarConta: {
        color: cores.branco,
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
    },

    rodapeLogin: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 24,
    },

    textoRodape: {
        color: cores.prata,
        fontSize: 14,
        fontFamily: "Inter_400Regular",
    },

    linkEntrar: {
        color: cores.vinho,
        fontSize: 14,
        fontFamily: "Inter_600SemiBold",
    },
})