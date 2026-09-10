import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { styles } from './BoasVindasStyle';

export default function BoasVindas() {
    function irParaLogin() {
        console.log('ir para login');
    }

    function irParaCadastro() {
        console.log('ir para cadastro');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.circuloTopo} />
            <View style={styles.anelTopo} />

            <View style={styles.circuloRodape} />
            <View style={styles.anelRodape} />

            <Image source={require('../../../assets/images/brilho.png')} style={styles.brilho1} />
            <Image source={require('../../../assets/images/brilho.png')} style={styles.brilho2} />
            <Image source={require('../../../assets/images/brilho.png')} style={styles.brilho3} />

            <View style={styles.conteudo}>
                <Image
                    source={require('../../../assets/images/logo-myspace.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.titulo}>MySpace</Text>
                <View style={styles.linhaTitulo} />

                <Text style={styles.subtitulo}>
                    Conecte-se com pessoas{'\n'}e compartilhe momentos.
                </Text>
            </View>

            <View style={styles.rodape}>
                <TouchableOpacity style={styles.botaoEntrar} onPress={irParaLogin} activeOpacity={0.85}>
                    <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.divisor}>
                    <View style={styles.linhaDivisor} />
                    <Text style={styles.textoOu}>ou</Text>
                    <View style={styles.linhaDivisor} />
                </View>

                <TouchableOpacity style={styles.botaoCriarConta} onPress={irParaCadastro} activeOpacity={0.85}>
                    <Text style={styles.textoBotaoCriarConta}>Crie uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}