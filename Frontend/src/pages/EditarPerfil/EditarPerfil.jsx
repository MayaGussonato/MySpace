import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import styles from "./EditarPerfilStyle";

const PROFILE_IMAGE = require("../../../assets/images/img-exemplo.jpg");

export default function EditarPerfil({ navigation }) {
  const [nome, setNome] = useState("Késsia Milena");
  const [usuario, setUsuario] = useState("kessia.milena");
  const [bio, setBio] = useState(
    "Desenvolvedora e entusiasta de tecnologia.\nApaixonada por compartilhar conhecimento! 💙"
  );
  const [foto, setFoto] = useState(PROFILE_IMAGE);

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
    );
  };

  const abrirCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir o acesso à câmera para tirar uma foto."
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!resultado.canceled && resultado.assets?.length > 0) {
      setFoto({ uri: resultado.assets[0].uri });
    }
  };

  const abrirBiblioteca = async () => {
    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir o acesso às fotos para escolher uma imagem."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!resultado.canceled && resultado.assets?.length > 0) {
      setFoto({ uri: resultado.assets[0].uri });
    }
  };

  const salvarPerfil = () => {
    navigation.goBack();
  };

  const cancelarEdicao = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={styles.safeArea}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.editHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={26}
                color="#460303"
              />
            </TouchableOpacity>

            <Text style={styles.editTitle}>
              Editar Perfil
            </Text>

            <View style={styles.headerSpace} />
          </View>

          <View style={styles.editProfileArea}>
            <TouchableOpacity
              style={styles.photoWrapper}
              onPress={abrirOpcoesFoto}
              activeOpacity={0.8}
            >
              <Image
                source={foto}
                style={styles.editPhotoPlaceholder}
                resizeMode="cover"
              />

              <View style={styles.cameraIcon}>
                <Ionicons
                  name="camera"
                  size={20}
                  color="#460303"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.inputLabel}>
              Nome
            </Text>

            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.inputLabel}>
              Usuário
            </Text>

            <TextInput
              style={styles.input}
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Digite seu usuário"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.inputLabel}>
              Bio
            </Text>

            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Digite sua bio"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonsArea}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelarEdicao}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={salvarPerfil}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}