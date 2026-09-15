import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './LoginStyle';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    function voltar() {
        navigation?.goBack?.();
    }

    function entrar() {
        console.log('entrar', { email, senha });
    }

    function entrarComGoogle() {
        console.log('entrar com google');
    }

    function irParaCadastro() {
        console.log('ir para cadastro');
    }

    function irParaEsqueceuSenha() {
        console.log('ir para esqueceu senha');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F7F6F4" />

            <View style={styles.topo}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={voltar} activeOpacity={0.7}>
                    <Image
                        source={require('../../../assets/images/icone-voltar.png')}
                        style={styles.iconeVoltar}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.titulo}>Login</Text>

                <Image
                    source={require('../../../assets/images/estrelas.png')}
                    style={styles.grupoBrilhos}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#B7B7B7"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Senha</Text>
                <View style={styles.campoSenha}>
                    <TextInput
                        style={styles.inputSenha}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#B7B7B7"
                        secureTextEntry={!mostrarSenha}
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                        <Ionicons
                            name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                            size={25}
                            color="#858585"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={irParaEsqueceuSenha} activeOpacity={0.7}>
                    <Text style={styles.linkEsqueceuSenha}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoEntrar} onPress={entrar} activeOpacity={0.85}>
                    <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.divisor}>
                    <View style={styles.linhaDivisor} />
                    <Text style={styles.textoOu}>ou</Text>
                    <View style={styles.linhaDivisor} />
                </View>

                <TouchableOpacity style={styles.botaoGoogle} onPress={entrarComGoogle} activeOpacity={0.85}>
                    <Image
                        source={require('../../../assets/images/logo-google.png')}
                        style={styles.iconeGoogle}
                        resizeMode="contain"
                    />
                    <Text style={styles.textoBotaoGoogle}>Entrar com Google</Text>
                </TouchableOpacity>

                <View style={styles.rodapeCadastro}>
                    <Text style={styles.textoRodape}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={irParaCadastro} activeOpacity={0.7}>
                        <Text style={styles.linkCriarConta}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}