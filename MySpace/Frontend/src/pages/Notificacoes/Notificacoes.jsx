import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./NotificacaoStyle";
import Footer from "../../components/Footer/Footer";

export default function Notificacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Notificações</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>
          <Ionicons
            name="heart-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" curtiu sua publicação"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="chatbubble-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" comentou sua publicação"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

        {/* Notificação 5 */}
        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>

        {/* Notificação 6 */}
        <View style={styles.card}>
          <Ionicons
            name="chatbubble-outline"
            size={25}
            color="#7A1F2B"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto}>
              <Text style={styles.negrito}>João Silva</Text>
              {" comentou sua publicação"}
            </Text>

            <Text style={styles.horario}>10:30</Text>
          </View>
        </View>
      </ScrollView>
      <Footer initialTab="notificacoes" />

    </View>
  );
}