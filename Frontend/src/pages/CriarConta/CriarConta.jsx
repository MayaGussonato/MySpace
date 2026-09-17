import React from "react"

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform,
    StatusBar,
} from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import Ionicons from "@expo/vector-icons/Ionicons"

import { styles } from "./CriarContaStyle"

import { useCriarConta } from "./useCriarConta"

const VINHO = "#460303"

export default function CriarConta({
    navigation,
}) {
    const insets = useSafeAreaInsets()

    const {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        mostrarSenha,
        alternarSenha,
        criarConta,
        carregando,
    } = useCriarConta(
        () =>
            navigation?.navigate?.(
                "Login"
            )
    )

    function voltar() {
        navigation?.goBack?.()
    }

    function irParaLogin() {
        navigation?.navigate?.(
            "Login"
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
            keyboardVerticalOffset={
                Platform.OS === "ios"
                    ? 0
                    : 20
            }
        >
            <TouchableWithoutFeedback
                onPress={
                    Keyboard.dismiss
                }
            >
                <View
                    style={[
                        styles.container,
                        {
                            paddingTop:
                                insets.top +
                                12,
                        },
                    ]}
                >
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#F7F6F4"
                    />

                    <View
                        style={
                            styles.topo
                        }
                    >
                        <TouchableOpacity
                            style={
                                styles.botaoVoltar
                            }
                            onPress={
                                voltar
                            }
                            activeOpacity={
                                0.7
                            }
                        >
                            <Ionicons
                                name="chevron-back"
                                size={26}
                                color={
                                    VINHO
                                }
                            />
                        </TouchableOpacity>

                        <Text
                            style={
                                styles.titulo
                            }
                        >
                            Criar Conta
                        </Text>

                        <View
                            style={
                                styles.headerSpace
                            }
                        />
                    </View>

                    <ScrollView
                        contentContainerStyle={
                            styles.form
                        }
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={
                            false
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Nome Completo
                        </Text>

                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Digite seu nome"
                            placeholderTextColor="#B7B7B7"
                            value={nome}
                            onChangeText={
                                setNome
                            }
                        />

                        <Text
                            style={
                                styles.label
                            }
                        >
                            E-mail
                        </Text>

                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#B7B7B7"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={
                                setEmail
                            }
                        />

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Senha
                        </Text>

                        <View
                            style={
                                styles.campoSenha
                            }
                        >
                            <TextInput
                                style={
                                    styles.inputSenha
                                }
                                placeholder="Crie uma senha"
                                placeholderTextColor="#B7B7B7"
                                secureTextEntry={
                                    !mostrarSenha
                                }
                                value={senha}
                                onChangeText={
                                    setSenha
                                }
                            />

                            <TouchableOpacity
                                onPress={
                                    alternarSenha
                                }
                            >
                                <Ionicons
                                    name={
                                        mostrarSenha
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={22}
                                    color="#858585"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={
                                styles.botaoCriarConta
                            }
                            onPress={
                                criarConta
                            }
                            activeOpacity={
                                0.85
                            }
                            disabled={
                                carregando
                            }
                        >
                            <Text
                                style={
                                    styles.textoBotaoCriarConta
                                }
                            >
                                {carregando
                                    ? "Criando conta..."
                                    : "Criar conta"}
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={
                                styles.rodapeLogin
                            }
                        >
                            <Text
                                style={
                                    styles.textoRodape
                                }
                            >
                                Já tem uma conta?{" "}
                            </Text>

                            <TouchableOpacity
                                onPress={
                                    irParaLogin
                                }
                                activeOpacity={
                                    0.7
                                }
                            >
                                <Text
                                    style={
                                        styles.linkEntrar
                                    }
                                >
                                    Entrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}