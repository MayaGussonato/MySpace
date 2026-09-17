import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './LoginStyle';
import { useUsuario } from '../../contexts/UsuarioContext'; // ajuste o caminho conforme a pasta real de Login.js

export default function Login({ navigation }) {
    const insets = useSafeAreaInsets();
    const { logar } = useUsuario();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    function voltar() {
        navigation?.goBack?.();
    }

    async function entrar() {
        setErro('');

        if (!email.trim() || !senha) {
            setErro('Preencha e-mail e senha');
            return;
        }

        setCarregando(true);
        try {
            await logar({ email: email.trim(), senha });
            // Não precisa navegar: assim que "logar" atualiza o usuario no contexto,
            // o App.js detecta (usuario !== null) e troca sozinho para o app principal
        } catch (error) {
            setErro(error.message || 'E-mail ou senha incorretos');
        } finally {
            setCarregando(false);
        }
    }

    function entrarComGoogle() {
        console.log('entrar com google');
    }

    function irParaCadastro() {
        navigation?.navigate?.('CriarConta');
    }

    function irParaEsqueceuSenha() {
        console.log('ir para esqueceu senha');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
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

                    <ScrollView
                        contentContainerStyle={styles.form}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
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

                        {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

                        <TouchableOpacity onPress={irParaEsqueceuSenha} activeOpacity={0.7}>
                            <Text style={styles.linkEsqueceuSenha}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoEntrar}
                            onPress={entrar}
                            activeOpacity={0.85}
                            disabled={carregando}
                        >
                            {carregando ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                            )}
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
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}