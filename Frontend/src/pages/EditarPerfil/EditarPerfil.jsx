import React, { useRef, useState } from "react"
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import styles from "./EditarPerfilStyle"
import { useUsuario } from "../../contexts/UsuarioContext"

export default function EditarPerfil({ navigation }) {
    const { usuario, atualizar } = useUsuario()

    const scrollRef = useRef(null)

    const [nome, setNome] = useState(
        usuario?.nome || ""
    )

    const [nomeUsuario, setNomeUsuario] =
        useState(usuario?.usuario || "")

    const [bio, setBio] = useState(
        usuario?.bio || ""
    )

    const [foto, setFoto] = useState(
        usuario?.avatar || null
    )

    const rolarPara = y => {
        setTimeout(() => {
            scrollRef.current?.scrollTo({
                y,
                animated: true,
            })
        }, 250)
    }

    const abrirOpcoesFoto = () => {
        Alert.alert(
            "Alterar foto de perfil",
            "Escolha uma opção",
            [
                {
                    text: "Usar câmera",
                    onPress: abrirCamera,
                },
                {
                    text: "Escolher da biblioteca",
                    onPress: abrirBiblioteca,
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    const abrirCamera = async () => {
        const permissao =
            await ImagePicker.requestCameraPermissionsAsync()

        if (!permissao.granted) {
            Alert.alert(
                "Permissão necessária",
                "É necessário permitir o acesso à câmera para tirar uma foto."
            )
            return
        }

        const resultado =
            await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.9,
            })

        if (
            !resultado.canceled &&
            resultado.assets?.length > 0
        ) {
            setFoto(resultado.assets[0].uri)
        }
    }

    const abrirBiblioteca = async () => {
        const permissao =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissao.granted) {
            Alert.alert(
                "Permissão necessária",
                "É necessário permitir o acesso às fotos para escolher uma imagem."
            )
            return
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.9,
            })

        if (
            !resultado.canceled &&
            resultado.assets?.length > 0
        ) {
            setFoto(resultado.assets[0].uri)
        }
    }

    const salvarPerfil = async () => {
        await atualizar({
            nome: nome.trim(),
            usuario: nomeUsuario.trim(),
            username: nomeUsuario.trim(),
            bio: bio.trim(),
            avatar: foto || null,
        })

        navigation.goBack()
    }

    const cancelarEdicao = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView
            edges={["top", "bottom"]}
            style={styles.safeArea}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    ref={scrollRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        ...styles.scrollContent,
                        paddingBottom: 180,
                    }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                >
                    <View style={styles.container}>
                        <View style={styles.editHeader}>
                            <TouchableOpacity
                                style={
                                    styles.backButton
                                }
                                onPress={() =>
                                    navigation.goBack()
                                }
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    size={24}
                                    color="#460303"
                                />
                            </TouchableOpacity>

                            <Text
                                style={
                                    styles.editTitle
                                }
                            >
                                Editar Perfil
                            </Text>

                            <View
                                style={
                                    styles.headerSpace
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.editProfileArea
                            }
                        >
                            <TouchableOpacity
                                style={
                                    styles.photoWrapper
                                }
                                onPress={
                                    abrirOpcoesFoto
                                }
                                activeOpacity={0.8}
                            >
                                <View
                                    style={
                                        styles.editPhotoPlaceholder
                                    }
                                >
                                    {foto ? (
                                        <Image
                                            source={{
                                                uri: foto,
                                            }}
                                            style={
                                                styles.photoImage
                                            }
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Ionicons
                                            name="person"
                                            size={52}
                                            color="#999999"
                                        />
                                    )}
                                </View>

                                <View
                                    style={
                                        styles.cameraIcon
                                    }
                                >
                                    <Ionicons
                                        name="camera"
                                        size={20}
                                        color="#460303"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={styles.inputArea}
                        >
                            <Text
                                style={
                                    styles.inputLabel
                                }
                            >
                                Nome
                            </Text>

                            <TextInput
                                style={styles.input}
                                value={nome}
                                onChangeText={setNome}
                                placeholder="Digite seu nome"
                                placeholderTextColor="#999"
                                returnKeyType="next"
                                onFocus={() =>
                                    rolarPara(120)
                                }
                            />
                        </View>

                        <View
                            style={styles.inputArea}
                        >
                            <Text
                                style={
                                    styles.inputLabel
                                }
                            >
                                Usuário
                            </Text>

                            <TextInput
                                style={styles.input}
                                value={nomeUsuario}
                                onChangeText={
                                    setNomeUsuario
                                }
                                placeholder="Digite seu usuário"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onFocus={() =>
                                    rolarPara(190)
                                }
                            />
                        </View>

                        <View
                            style={styles.inputArea}
                        >
                            <Text
                                style={
                                    styles.inputLabel
                                }
                            >
                                Bio
                            </Text>

                            <TextInput
                                style={[
                                    styles.input,
                                    styles.bioInput,
                                ]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Digite sua bio"
                                placeholderTextColor="#999"
                                multiline
                                textAlignVertical="top"
                                onFocus={() =>
                                    rolarPara(270)
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.buttonsArea
                            }
                        >
                            <TouchableOpacity
                                style={
                                    styles.cancelButton
                                }
                                onPress={
                                    cancelarEdicao
                                }
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={
                                        styles.cancelButtonText
                                    }
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    styles.saveButton
                                }
                                onPress={
                                    salvarPerfil
                                }
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={
                                        styles.saveButtonText
                                    }
                                >
                                    Salvar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}