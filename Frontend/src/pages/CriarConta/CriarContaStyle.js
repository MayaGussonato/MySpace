import { StyleSheet } from 'react-native';
const cores = {
    vinho: '#460303',
    preto: '#000000',
    prata: '#B7B7B7',
    branco: '#FFFFFF',
    pessego: '#E0C98F',
    douradoBorda: '#E7C77A',
    fundo: '#F7F6F4',
    bordaInput: '#E2E2E2',
};

export const styles = StyleSheet.create({
    // Topo
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
        paddingHorizontal: 24,
        paddingTop: 60,
    },

    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    botaoVoltar: {
        width: 26,
        height: 26,
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 20,
        fontFamily: 'Inter_400SemiBold',
        color: cores.vinho,
    },

    headerSpace: {
        width: 26,
    },

    // Formulário
    form: {
        marginTop: 100,
    },

    label: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: cores.preto,
        marginBottom: 8,
    },

    input: {
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: cores.preto,
        marginBottom: 30,
    },

    campoSenha: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 30,
    },

    inputSenha: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: cores.preto,
    },

    // Botão
    botaoCriarConta: {
        backgroundColor: cores.vinho,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 60,
    },

    textoBotaoCriarConta: {
        color: cores.branco,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },

    // Rodapé
    rodapeLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
    },

    textoRodape: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: cores.preto,
    },

    linkEntrar: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        color: cores.vinho,
    },
});
