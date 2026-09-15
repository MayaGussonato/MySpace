import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";
import Footer from "../footer/Footer";

export default function EditarPerfil({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Cabeçalho */}
        <View style={styles.editHeader}>

          <Ionicons
            name="arrow-back"
            size={26}
            color="#222"
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.editTitle}>
            Editar Perfil
          </Text>

          <View style={{ width: 26 }} />

        </View>

        {/* Foto */}
        <View style={styles.editProfileArea}>

          <View style={styles.editPhotoPlaceholder}>
            {/* Sua foto entra aqui depois */}

            <View style={styles.cameraIcon}>
              <Ionicons
                name="camera"
                size={14}
                color="#fff"
              />
            </View>

          </View>

        </View>

        {/* Nome */}
        <View style={styles.inputArea}>

          <Text style={styles.inputLabel}>
            Nome
          </Text>

          <TextInput
            style={styles.input}
            value="Késsia Milena"
          />

        </View>

        {/* Usuário */}
        <View style={styles.inputArea}>

          <Text style={styles.inputLabel}>
            Usuário
          </Text>

          <TextInput
            style={styles.input}
            value="kessia.milena"
          />

        </View>

        {/* Bio */}
        <View style={styles.inputArea}>

          <Text style={styles.inputLabel}>
            Bio
          </Text>

          <TextInput
            style={[styles.input, styles.bioInput]}
            value={
              "Desenvolvedora e entusiasta de tecnologia.\nApaixonada por compartilhar conhecimento! 💙"
            }
            multiline
          />

        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
