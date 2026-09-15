import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./NotificacoesStyle";

export default function Notificacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} allowFontScaling={false}>
        Notificações
      </Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Ionicons
            name="heart-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" curtiu sua publicação"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="chatbubble-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" comentou sua publicação"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="person-add-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" começou a seguir você"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="chatbubble-outline"
            size={26}
            color="#460303"
            style={styles.icone}
          />

          <View style={styles.conteudo}>
            <Text style={styles.texto} allowFontScaling={false}>
              <Text style={styles.negrito} allowFontScaling={false}>
                João Silva
              </Text>
              {" comentou sua publicação"}
            </Text>

            <Text style={styles.horario} allowFontScaling={false}>
              10:30
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}