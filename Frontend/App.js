import React, { useState } from "react"

import { View } from "react-native"

import { SafeAreaProvider } from "react-native-safe-area-context"

import {
    useFonts,
    BodoniModa_700Bold,
    BodoniModa_400Regular,
} from "@expo-google-fonts/bodoni-moda"

import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter"

import BoasVindas from "./src/pages/BoasVindas/BoasVindas"
import Login from "./src/pages/Login/Login"
import CriarConta from "./src/pages/CriarConta/CriarConta"
import Feed from "./src/pages/Feed/Feed"
import NovaPublicacao from "./src/pages/NovaPublicacao/NovaPublicacao"
import Publicacao from "./src/pages/Publicacao/Publicacao"
import Notificacao from "./src/pages/Notificacoes/Notificacoes"
import Perfil from "./src/pages/Perfil/Perfil"
import EditarPerfil from "./src/pages/EditarPerfil/EditarPerfil"
import Configuracoes from "./src/pages/Configuracoes/Configuracoes"
import Footer from "./src/components/Footer/Footer"

import {
    UsuarioProvider,
    useUsuario,
} from "./src/contexts/UsuarioContext"

function AppInterno() {
    const {
        usuario,
        carregando,
    } = useUsuario()

    const [telaAuth, setTelaAuth] =
        useState("BoasVindas")

    const [aba, setAba] =
        useState("Inicio")

    const [
        publicacaoAberta,
        setPublicacaoAberta,
    ] = useState(null)

    const [
        publicacaoEditando,
        setPublicacaoEditando,
    ] = useState(null)

    const [
        editarPerfil,
        setEditarPerfil,
    ] = useState(false)

    const [
        configuracoes,
        setConfiguracoes,
    ] = useState(false)

    const [
        fontsCarregadas,
    ] = useFonts({
        BodoniModa_700Bold,
        BodoniModa_400Regular,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    })

    if (!fontsCarregadas || carregando) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                }}
            />
        )
    }

    if (!usuario) {
        if (telaAuth === "Login") {
            return (
                <Login
                    navigation={{
                        goBack: () =>
                            setTelaAuth(
                                "BoasVindas"
                            ),
                        navigate: tela => {
                            if (
                                tela ===
                                "CriarConta"
                            ) {
                                setTelaAuth(
                                    "CriarConta"
                                )
                            }

                            if (
                                tela ===
                                "BoasVindas"
                            ) {
                                setTelaAuth(
                                    "BoasVindas"
                                )
                            }
                        },
                    }}
                />
            )
        }

        if (
            telaAuth ===
            "CriarConta"
        ) {
            return (
                <CriarConta
                    navigation={{
                        goBack: () =>
                            setTelaAuth(
                                "BoasVindas"
                            ),
                        navigate: tela => {
                            if (
                                tela ===
                                "Login"
                            ) {
                                setTelaAuth(
                                    "Login"
                                )
                            }

                            if (
                                tela ===
                                "BoasVindas"
                            ) {
                                setTelaAuth(
                                    "BoasVindas"
                                )
                            }
                        },
                    }}
                />
            )
        }

        return (
            <BoasVindas
                navigation={{
                    navigate: tela => {
                        if (
                            tela ===
                            "Login"
                        ) {
                            setTelaAuth(
                                "Login"
                            )
                        }

                        if (
                            tela ===
                            "CriarConta"
                        ) {
                            setTelaAuth(
                                "CriarConta"
                            )
                        }
                    },
                }}
            />
        )
    }

    if (configuracoes) {
        return (
            <Configuracoes
                navigation={{
                    goBack: () =>
                        setConfiguracoes(
                            false
                        ),
                    navigate: tela => {
                        if (
                            tela ===
                            "BoasVindas"
                        ) {
                            setConfiguracoes(
                                false
                            )

                            setAba(
                                "Inicio"
                            )

                            setTelaAuth(
                                "BoasVindas"
                            )
                        }
                    },
                }}
            />
        )
    }

    if (editarPerfil) {
        return (
            <EditarPerfil
                navigation={{
                    goBack: () =>
                        setEditarPerfil(
                            false
                        ),
                }}
            />
        )
    }

    if (publicacaoEditando) {
        return (
            <NovaPublicacao
                publicacaoEditando={
                    publicacaoEditando
                }
                onVoltar={() => {
                    setPublicacaoEditando(
                        null
                    )
                    setAba("Inicio")
                }}
                onPublicacaoSalva={publicacao => {
                    setPublicacaoEditando(
                        null
                    )
                    setPublicacaoAberta(
                        publicacao
                    )
                }}
            />
        )
    }

    if (publicacaoAberta) {
        return (
            <Publicacao
                publicacao={
                    publicacaoAberta
                }
                onVoltar={() => {
                    setPublicacaoAberta(
                        null
                    )
                    setAba("Inicio")
                }}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor:
                    "#FFFFFF",
            }}
        >
            {aba === "Inicio" && (
                <Feed
                    onAbrirPublicacao={
                        publicacao => {
                            setPublicacaoAberta(
                                publicacao
                            )
                        }
                    }
                    onAbrirNotificacoes={() =>
                        setAba(
                            "Notificacoes"
                        )
                    }
                    onAbrirCriar={() => {
                        setPublicacaoEditando(
                            null
                        )
                        setAba("Criar")
                    }}
                    onEditarPublicacao={
                        publicacao => {
                            setPublicacaoEditando(
                                publicacao
                            )
                        }
                    }
                />
            )}

            {aba === "Criar" && (
                <NovaPublicacao
                    onVoltar={() =>
                        setAba("Inicio")
                    }
                    onPublicacaoSalva={
                        publicacao => {
                            setAba("Inicio")
                            setPublicacaoAberta(
                                publicacao
                            )
                        }
                    }
                />
            )}

            {aba === "Notificacoes" && (
                <Notificacao />
            )}

            {aba === "Perfil" && (
                <Perfil
                    navigation={{
                        navigate: (
                            tela,
                            dados
                        ) => {
                            if (
                                tela ===
                                "Inicio"
                            ) {
                                setAba(
                                    "Inicio"
                                )
                            }

                            if (
                                tela ===
                                "Criar"
                            ) {
                                setPublicacaoEditando(
                                    null
                                )

                                setAba(
                                    "Criar"
                                )
                            }

                            if (
                                tela ===
                                "Notificacoes"
                            ) {
                                setAba(
                                    "Notificacoes"
                                )
                            }

                            if (
                                tela ===
                                "EditarPerfil"
                            ) {
                                setEditarPerfil(
                                    true
                                )
                            }

                            if (
                                tela ===
                                "Configuracoes"
                            ) {
                                setConfiguracoes(
                                    true
                                )
                            }

                            if (
                                tela ===
                                "DPublicacao"
                            ) {
                                setPublicacaoAberta(
                                    dados
                                )
                            }

                            if (
                                tela ===
                                "BoasVindas"
                            ) {
                                setAba(
                                    "Inicio"
                                )

                                setTelaAuth(
                                    "BoasVindas"
                                )
                            }
                        },
                    }}
                />
            )}

            <Footer
                ativo={aba}
                onNavegar={novaAba => {
                    if (
                        novaAba ===
                        "Criar"
                    ) {
                        setPublicacaoEditando(
                            null
                        )
                    }

                    setAba(novaAba)
                }}
            />
        </View>
    )
}

export default function App() {
    return (
        <SafeAreaProvider>
            <UsuarioProvider>
                <AppInterno />
            </UsuarioProvider>
        </SafeAreaProvider>
    )
}