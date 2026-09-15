import { StyleSheet } from 'react-native';
const cores = {
    vinho: '#460303',
    preto: '#000000',
    prata: '#B7B7B7',
    branco: '#FFFFFF',
    pessego: '#E0C98F',
    douradoBorda: '#E7C77A',
    douradoBrilho: '#F2C94C',
    fundo: '#F7F6F4',
    bordaInput: '#E2E2E2',
};

export const styles = StyleSheet.create({
    // Container
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
        paddingHorizontal: 24,
        paddingTop: 60,
    },

    // Topo
    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    botaoVoltar: {
        width: 26,
        height: 26,
    },
    iconeVoltar: {
        width: 22,
        height: 22,
    },
    titulo: {
        fontSize: 20,
        fontFamily: 'Inter_400SemiBold',
        color: cores.vinho,
    },

    // Estrelas
    grupoBrilhos: {
        width: 48,
        height: 48,
        marginTop: 14,
    },

    // Formulário
    form: {
        marginTop: 70,
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
        marginBottom: 24,
    },
    campoSenha: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    inputSenha: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: cores.preto,
    },
    iconeOlho: {
        width: 20,
        height: 20,
        tintColor: cores.prata,
    },

    linkEsqueceuSenha: {
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: cores.vinho,
        marginBottom: 40,
    },

    // Botão Entrar
    botaoEntrar: {
        backgroundColor: cores.vinho,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 45,
    },
    textoBotaoEntrar: {
        color: cores.branco,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },

    // Divisor
    divisor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
    },
    linhaDivisor: {
        flex: 1,
        height: 1,
        backgroundColor: cores.prata,
        opacity: 0.4,
    },
    textoOu: {
        marginHorizontal: 12,
        color: cores.prata,
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
    },

    // Botão Entrar com Conta
    botaoGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.bordaInput,
        borderRadius: 14,
        paddingVertical: 14,
    },
    iconeGoogle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    textoBotaoGoogle: {
        color: cores.preto,
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
    },

    // Rodapé
    rodapeCadastro: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    textoRodape: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: cores.preto,
    },
    linkCriarConta: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        color: cores.vinho,
    },
});