import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const cores = {
    vinho: '#460303',
    preto: '#000000',
    prata: '#B7B7B7',
    branco: '#FFFFFF',
    pessego: '#E0C98F',
    douradoBorda: '#E7C77A',
    douradoBrilho: '#F2C94C',
};
const ANEL_GAP = 10;
const ANEL_ESPESSURA = 3;
const TOPO_DIAMETRO = width * 0.72;
const TOPO_TOP = -width * 0.32;
const TOPO_LEFT = -width * 0.28;
const RODAPE_DIAMETRO = width * 0.34;
const RODAPE_BOTTOM = -width * 0.11;
const RODAPE_LEFT = -width * 0.11;

export const styles = StyleSheet.create({
    // Container
    container: {
        flex: 1,
        backgroundColor: cores.branco,
        justifyContent: 'space-between',
        paddingTop: 60,
        overflow: 'hidden',
    },

    // Componente Vinho
    circuloTopo: {
        position: 'absolute',
        top: TOPO_TOP,
        left: TOPO_LEFT,
        width: TOPO_DIAMETRO,
        height: TOPO_DIAMETRO,
        borderRadius: TOPO_DIAMETRO / 2,
        backgroundColor: cores.vinho,
    },

    // Aro Dourado
    anelTopo: {
        position: 'absolute',
        top: TOPO_TOP - ANEL_GAP,
        left: TOPO_LEFT - ANEL_GAP,
        width: TOPO_DIAMETRO + ANEL_GAP * 2,
        height: TOPO_DIAMETRO + ANEL_GAP * 2,
        borderRadius: (TOPO_DIAMETRO + ANEL_GAP * 2) / 2,
        borderWidth: ANEL_ESPESSURA,
        borderColor: cores.douradoBorda,
    },

    circuloRodape: {
        position: 'absolute',
        bottom: RODAPE_BOTTOM,
        left: RODAPE_LEFT,
        width: RODAPE_DIAMETRO,
        height: RODAPE_DIAMETRO,
        borderRadius: RODAPE_DIAMETRO / 2,
        backgroundColor: cores.vinho,
    },

    anelRodape: {
        position: 'absolute',
        bottom: RODAPE_BOTTOM - ANEL_GAP,
        left: RODAPE_LEFT - ANEL_GAP,
        width: RODAPE_DIAMETRO + ANEL_GAP * 2,
        height: RODAPE_DIAMETRO + ANEL_GAP * 2,
        borderRadius: (RODAPE_DIAMETRO + ANEL_GAP * 2) / 2,
        borderWidth: ANEL_ESPESSURA,
        borderColor: cores.douradoBorda,
    },

    // Estrelas
    brilho1: {
        position: 'absolute',
        top: 90,
        right: 40,
        width: 28,
        height: 28,
        tintColor: cores.douradoBrilho,
        shadowColor: cores.douradoBrilho,
        shadowOpacity: 0.9,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },
    brilho2: {
        position: 'absolute',
        top: 280,
        left: 30,
        width: 22,
        height: 22,
        tintColor: cores.douradoBrilho,
        shadowColor: cores.douradoBrilho,
        shadowOpacity: 0.9,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },
    brilho3: {
        position: 'absolute',
        bottom: 340,
        right: 24,
        width: 24,
        height: 24,
        tintColor: cores.douradoBrilho,
        shadowColor: cores.douradoBrilho,
        shadowOpacity: 0.9,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },

    // Logo e Detalhes
    conteudo: {
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 100,
    },
    logo: {
        width: 172,
        height: 172,
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    titulo: {
        fontSize: 34,
        fontFamily: 'BodoniModa_700Bold',
        color: cores.vinho,
        marginTop: 4,
    },
    linhaTitulo: {
        width: 90,
        height: 2,
        backgroundColor: cores.pessego,
        marginTop: 6,
        marginBottom: 18,
    },
    subtitulo: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: cores.prata,
        textAlign: 'center',
        lineHeight: 22,
    },

    // Botões
    rodape: {
        paddingHorizontal: 28,
        marginBottom: 115,
    },
    botaoEntrar: {
        backgroundColor: cores.vinho,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    textoBotaoEntrar: {
        color: cores.branco,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
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
    botaoCriarConta: {
        borderWidth: 1.5,
        borderColor: cores.vinho,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    textoBotaoCriarConta: {
        color: cores.vinho,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
});