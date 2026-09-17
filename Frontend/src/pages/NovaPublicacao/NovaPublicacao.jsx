import { useEffect, useState } from "react"

import {
    View,
    Text,
    TextInput,
    Pressable,
    StatusBar,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native"

import { Feather } from "@expo/vector-icons"
import * as Location from "expo-location"
import * as ImagePicker from "expo-image-picker"

import styles, { cores } from "./NovaPublicacaoStyle"

import { useUsuario } from "../../contexts/UsuarioContext"

const LIMITE_CARACTERES = 255

export default function NovaPublicacao({
    onVoltar = () => {},
    publicacaoEditando = null,
    onPublicacaoSalva = () => {},
}) {
    const {
        publicar,
        editarPublicacao,
    } = useUsuario()

    const [texto, setTexto] =
        useState("")

    const [publicando, setPublicando] =
        useState(false)

    const [
        carregandoLocalizacao,
        setCarregandoLocalizacao,
    ] = useState(false)

    const [
        localizacao,
        setLocalizacao,
    ] = useState(null)

    const [imagem, setImagem] =
        useState(null)

    const [
        mostrarCoordenadas,
        setMostrarCoordenadas,
    ] = useState(false)

    const [
        mostrarSentimentos,
        setMostrarSentimentos,
    ] = useState(false)

    const [
        sentimento,
        setSentimento,
    ] = useState(null)

    const editando =
        !!publicacaoEditando

    const sentimentos = [
        {
            emoji: "😊",
            nome: "Feliz",
        },
        {
            emoji: "😌",
            nome: "Tranquilo",
        },
        {
            emoji: "😢",
            nome: "Triste",
        },
        {
            emoji: "😡",
            nome: "Bravo",
        },
    ]

    useEffect(() => {
        if (!publicacaoEditando) {
            setTexto("")
            setImagem(null)
            setLocalizacao(null)
            setSentimento(null)
            setMostrarCoordenadas(false)
            setMostrarSentimentos(false)
            return
        }

        setTexto(
            publicacaoEditando.texto || ""
        )

        setImagem(
            publicacaoEditando.imagem ||
                null
        )

        setLocalizacao(
            publicacaoEditando.localizacao ||
                null
        )

        setSentimento(
            publicacaoEditando.sentimento ||
                null
        )

        setMostrarCoordenadas(false)
        setMostrarSentimentos(false)
    }, [publicacaoEditando])

    const handlePublicar = async () => {
        if (!texto.trim() || publicando) {
            return
        }

        setPublicando(true)

        try {
            if (editando) {
                const resultado =
                    await editarPublicacao(
                        publicacaoEditando.id,
                        {
                            texto:
                                texto.trim(),
                            imagem:
                                imagem || null,
                            localizacao:
                                localizacao ||
                                null,
                            sentimento:
                                sentimento ||
                                null,
                        }
                    )

                const publicacaoAtualizada =
                    resultado?.publicacao || {
                        ...publicacaoEditando,
                        texto:
                            texto.trim(),
                        imagem:
                            imagem || null,
                        localizacao:
                            localizacao ||
                            null,
                        sentimento:
                            sentimento ||
                            null,
                    }

                onPublicacaoSalva(
                    publicacaoAtualizada
                )
            } else {
                const resultado =
                    await publicar({
                        texto:
                            texto.trim(),
                        imagem,
                        localizacao,
                        sentimento,
                    })

                onVoltar()

                return resultado
            }

            setTexto("")
            setImagem(null)
            setLocalizacao(null)
            setSentimento(null)
            setMostrarCoordenadas(false)
            setMostrarSentimentos(false)
        } catch (error) {
            console.log(
                "Erro ao salvar publicação:",
                error
            )

            Alert.alert(
                "Erro",
                editando
                    ? "Não foi possível salvar as alterações. Tente novamente."
                    : "Não foi possível publicar. Tente novamente."
            )
        } finally {
            setPublicando(false)
        }
    }

    const cancelarEdicao = () => {
        setTexto("")
        setImagem(null)
        setLocalizacao(null)
        setSentimento(null)
        setMostrarCoordenadas(false)
        setMostrarSentimentos(false)

        onVoltar()
    }

    const pegarLocalizacao = async () => {
        try {
            setCarregandoLocalizacao(true)

            const permissao =
                await Location.requestForegroundPermissionsAsync()

            if (
                permissao.status !==
                "granted"
            ) {
                Alert.alert(
                    "Permissão necessária",
                    "Precisamos da sua permissão para acessar sua localização."
                )
                return
            }

            const location =
                await Location.getCurrentPositionAsync(
                    {
                        accuracy:
                            Location.Accuracy.High,
                    }
                )

            const {
                latitude,
                longitude,
            } = location.coords

            const endereco =
                await Location.reverseGeocodeAsync(
                    {
                        latitude,
                        longitude,
                    }
                )

            if (
                endereco &&
                endereco.length > 0
            ) {
                const local =
                    endereco[0]

                setLocalizacao({
                    latitude,
                    longitude,
                    rua:
                        local.street ||
                        "",
                    numero:
                        local.streetNumber ||
                        "",
                    cidade:
                        local.city ||
                        local.subregion ||
                        local.district ||
                        "",
                    estado:
                        local.region ||
                        "",
                    pais:
                        local.country ||
                        "",
                })
            } else {
                setLocalizacao({
                    latitude,
                    longitude,
                    rua: "",
                    numero: "",
                    cidade: "",
                    estado: "",
                    pais: "",
                })
            }
        } catch (error) {
            console.log(
                "Erro ao atualizar localização:",
                error
            )

            Alert.alert(
                "Erro",
                "Não foi possível atualizar sua localização."
            )
        } finally {
            setCarregandoLocalizacao(
                false
            )
        }
    }

    const escolherImagem =
        async () => {
            try {
                const permissao =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()

                if (!permissao.granted) {
                    Alert.alert(
                        "Permissão necessária",
                        "Precisamos da sua permissão para acessar suas fotos."
                    )
                    return
                }

                const resultado =
                    await ImagePicker.launchImageLibraryAsync(
                        {
                            mediaTypes: [
                                "images",
                            ],
                            allowsEditing:
                                true,
                            quality: 1,
                        }
                    )

                if (
                    resultado &&
                    !resultado.canceled &&
                    resultado.assets &&
                    resultado.assets
                        .length > 0
                ) {
                    setImagem(
                        resultado
                            .assets[0]
                            .uri
                    )
                }
            } catch (error) {
                console.log(
                    "Erro ao escolher imagem:",
                    error
                )

                Alert.alert(
                    "Erro",
                    "Não foi possível selecionar a imagem."
                )
            }
        }

    const tirarFoto = async () => {
        try {
            const permissao =
                await ImagePicker.requestCameraPermissionsAsync()

            if (!permissao.granted) {
                Alert.alert(
                    "Permissão necessária",
                    "Precisamos da permissão da câmera para tirar uma foto."
                )
                return
            }

            const resultado =
                await ImagePicker.launchCameraAsync(
                    {
                        mediaTypes: [
                            "images",
                        ],
                        allowsEditing:
                            true,
                        quality: 1,
                        cameraType:
                            ImagePicker
                                .CameraType
                                .back,
                    }
                )

            if (
                resultado &&
                !resultado.canceled &&
                resultado.assets &&
                resultado.assets
                    .length > 0
            ) {
                const foto =
                    resultado.assets[0]

                if (foto.uri) {
                    setImagem(
                        foto.uri
                    )
                }
            }
        } catch (error) {
            console.log(
                "Erro ao abrir câmera:",
                error
            )

            Alert.alert(
                "Erro",
                "Não foi possível utilizar a câmera. Verifique as permissões do aplicativo."
            )
        }
    }

    const selecionarImagem =
        () => {
            Alert.alert(
                "Adicionar imagem",
                "De onde você quer pegar a imagem?",
                [
                    {
                        text: "Galeria",
                        onPress:
                            escolherImagem,
                    },
                    {
                        text: "Tirar foto",
                        onPress:
                            tirarFoto,
                    },
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                ]
            )
        }

    const selecionarSentimento =
        item => {
            setSentimento(item)
            setMostrarSentimentos(
                false
            )
        }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={
                    cores.fundo
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            >
                <View style={styles.header}>
                    <Pressable
                        style={
                            styles.botaoVoltar
                        }
                        onPress={
                            editando
                                ? cancelarEdicao
                                : onVoltar
                        }
                        hitSlop={10}
                    >
                        <Feather
                            name="chevron-left"
                            size={26}
                            color={
                                cores.primaria
                            }
                        />
                    </Pressable>

                    <Text
                        style={
                            styles.titulo
                        }
                    >
                        {editando
                            ? "Editar Publicação"
                            : "Nova Publicação"}
                    </Text>
                </View>

                <Text
                    style={
                        styles.pergunta
                    }
                >
                    O que você está pensando?
                </Text>

                <View
                    style={
                        styles.caixa
                    }
                >
                    <TextInput
                        style={
                            styles.campoTexto
                        }
                        placeholder="Escreva algo"
                        placeholderTextColor={
                            cores.placeholder
                        }
                        value={texto}
                        onChangeText={
                            setTexto
                        }
                        maxLength={
                            LIMITE_CARACTERES
                        }
                        multiline
                        textAlignVertical="top"
                    />

                    <Text
                        style={
                            styles.contador
                        }
                    >
                        {texto.length}/
                        {
                            LIMITE_CARACTERES
                        }
                    </Text>
                </View>

                <View
                    style={
                        styles.caixa_localizacao
                    }
                >
                    {localizacao && (
                        <View>
                            <Text>
                                {localizacao.cidade ||
                                    "Localização atual"}

                                {localizacao.estado
                                    ? ` - ${localizacao.estado}`
                                    : ""}

                                {localizacao.pais
                                    ? ` - ${localizacao.pais}`
                                    : ""}
                            </Text>

                            <Text>
                                {localizacao.rua ||
                                    "Localização atual"}

                                {localizacao.numero
                                    ? `, ${localizacao.numero}`
                                    : ""}
                            </Text>

                            <Pressable
                                onPress={() =>
                                    setMostrarCoordenadas(
                                        !mostrarCoordenadas
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.verCoordenadas
                                    }
                                >
                                    {mostrarCoordenadas
                                        ? "Ocultar coordenadas ▲"
                                        : "Ver coordenadas ▼"}
                                </Text>
                            </Pressable>

                            {mostrarCoordenadas && (
                                <View
                                    style={
                                        styles.coordenadas
                                    }
                                >
                                    <Text>
                                        Latitude:{" "}
                                        {
                                            localizacao.latitude
                                        }
                                    </Text>

                                    <Text>
                                        Longitude:{" "}
                                        {
                                            localizacao.longitude
                                        }
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    {!localizacao && (
                        <Text
                            style={
                                styles.campoTexto_Localizacao
                            }
                        >
                            Nenhuma localização selecionada.
                        </Text>
                    )}
                </View>

                {imagem && (
                    <View
                        style={
                            styles.previewContainer
                        }
                    >
                        <Image
                            source={
                                typeof imagem ===
                                "string"
                                    ? {
                                          uri: imagem,
                                      }
                                    : imagem
                            }
                            style={
                                styles.previewImagem
                            }
                        />
                    </View>
                )}

                <View
                    style={
                        styles.acoes
                    }
                >
                    <Pressable
                        style={
                            styles.acao
                        }
                        onPress={
                            selecionarImagem
                        }
                    >
                        <Feather
                            name="image"
                            size={20}
                            color={
                                cores.primaria
                            }
                            style={
                                styles.iconeAcao
                            }
                        />

                        <Text
                            style={
                                styles.rotuloAcao
                            }
                        >
                            {imagem
                                ? "Imagem ✓"
                                : "Imagem"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={
                            styles.acao
                        }
                        onPress={
                            pegarLocalizacao
                        }
                        disabled={
                            carregandoLocalizacao
                        }
                    >
                        {carregandoLocalizacao ? (
                            <ActivityIndicator
                                size="small"
                                color={
                                    cores.primaria
                                }
                                style={
                                    styles.iconeAcao
                                }
                            />
                        ) : (
                            <Feather
                                name="map-pin"
                                size={20}
                                color={
                                    cores.primaria
                                }
                                style={
                                    styles.iconeAcao
                                }
                            />
                        )}

                        <Text
                            style={
                                styles.rotuloAcao
                            }
                        >
                            {carregandoLocalizacao
                                ? "Atualizando..."
                                : localizacao
                                ? "Atualizar localização"
                                : "Localização"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={
                            styles.acao
                        }
                        onPress={() =>
                            setMostrarSentimentos(
                                !mostrarSentimentos
                            )
                        }
                    >
                        {sentimento ? (
                            <Text
                                style={
                                    styles.emojiBotao
                                }
                            >
                                {
                                    sentimento.emoji
                                }
                            </Text>
                        ) : (
                            <Feather
                                name="smile"
                                size={20}
                                color={
                                    cores.primaria
                                }
                                style={
                                    styles.iconeAcao
                                }
                            />
                        )}

                        <Text
                            style={
                                styles.rotuloAcao
                            }
                        >
                            {sentimento
                                ? sentimento.nome
                                : "Sentimento"}
                        </Text>
                    </Pressable>
                </View>

                {mostrarSentimentos && (
                    <View
                        style={
                            styles.caixaSentimentos
                        }
                    >
                        {sentimentos.map(
                            item => (
                                <Pressable
                                    key={
                                        item.nome
                                    }
                                    style={[
                                        styles.opcaoSentimento,
                                        sentimento?.nome ===
                                        item.nome
                                            ? styles.sentimentoSelecionado
                                            : null,
                                    ]}
                                    onPress={() =>
                                        selecionarSentimento(
                                            item
                                        )
                                    }
                                >
                                    <Text
                                        style={
                                            styles.emojiSentimento
                                        }
                                    >
                                        {
                                            item.emoji
                                        }
                                    </Text>

                                    <Text
                                        style={[
                                            styles.nomeSentimento,
                                            sentimento?.nome ===
                                            item.nome
                                                ? {
                                                      color:
                                                          cores.primaria,
                                                      fontWeight:
                                                          "bold",
                                                  }
                                                : null,
                                        ]}
                                    >
                                        {
                                            item.nome
                                        }
                                    </Text>
                                </Pressable>
                            )
                        )}
                    </View>
                )}

                {editando ? (
                    <View
                        style={
                            styles.botoesEdicao
                        }
                    >
                        <TouchableOpacity
                            style={[
                                styles.botaoSalvarEdicao,
                                !texto.trim() ||
                                publicando
                                    ? styles.publishButtonDisabled
                                    : null,
                            ]}
                            onPress={
                                handlePublicar
                            }
                            disabled={
                                !texto.trim() ||
                                publicando
                            }
                        >
                            {publicando ? (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                />
                            ) : (
                                <Text
                                    style={
                                        styles.publishButtonText
                                    }
                                >
                                    Salvar
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                styles.botaoCancelarEdicao
                            }
                            onPress={
                                cancelarEdicao
                            }
                            disabled={
                                publicando
                            }
                        >
                            <Text
                                style={
                                    styles.textoCancelarEdicao
                                }
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.publishButton,
                            !texto.trim() ||
                            publicando
                                ? styles.publishButtonDisabled
                                : null,
                        ]}
                        onPress={
                            handlePublicar
                        }
                        disabled={
                            !texto.trim() ||
                            publicando
                        }
                    >
                        {publicando ? (
                            <ActivityIndicator
                                color="#FFFFFF"
                            />
                        ) : (
                            <Text
                                style={
                                    styles.publishButtonText
                                }
                            >
                                Publicar
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}