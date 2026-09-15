import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./PerfilStyle"

const PROFILE_IMAGE = require("../../../assets/images/img-exemplo.jpg")

export default function Perfil({ navigation }) {
  const [abaSelecionada, setAbaSelecionada] = useState("fotos")

  const abrirPublicacao = () => {
    navigation.navigate("DPublicacao", {
      id: "1",
      nome: "João Silva",
      data: "Hoje às 10:30",
      avatar: PROFILE_IMAGE,
      texto: "Lugar lindo!!",
      curtidas: 24,
      comentarios: 4,
    })
  }

  const publicacoes = [
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
    PROFILE_IMAGE,
  ]

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.headerEspaco} />

            <Text style={styles.headerTitle}>
              Perfil
            </Text>

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate("EditarPerfil")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="settings-outline"
                size={28}
                color="#650000"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.profileArea}>
            <View style={styles.profileImage}>
  <Image
    source={PROFILE_IMAGE}
    style={styles.profileImageContent}
    resizeMode="cover"
  />

  <TouchableOpacity
    style={styles.lapizIcon}
    onPress={() => navigation.navigate("EditarPerfil")}
    activeOpacity={0.7}
  >
    <Ionicons
      name="pencil"
      size={20}
      color="#650000"
    />
  </TouchableOpacity>
</View>

            <Text style={styles.name}>
              Késsia Milena
            </Text>

            <Text style={styles.username}>
              @kessia.milena
            </Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                12
              </Text>

              <Text style={styles.statLabel}>
                Publicações
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                150
              </Text>

              <Text style={styles.statLabel}>
                Seguidores
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                80
              </Text>

              <Text style={styles.statLabel}>
                Seguindo
              </Text>
            </View>
          </View>

          <Text style={styles.bio}>
            Desenvolvedora e entusiasta de tecnologia.{"\n"}
            Apaixonada por compartilhar conhecimento! 💙
          </Text>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setAbaSelecionada("fotos")}
              activeOpacity={0.7}
            >
              <Ionicons
                name={
                  abaSelecionada === "fotos"
                    ? "grid"
                    : "grid-outline"
                }
                size={22}
                color={
                  abaSelecionada === "fotos"
                    ? "#460303"
                    : "#650000"
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => setAbaSelecionada("salvos")}
              activeOpacity={0.7}
            >
              <Ionicons
                name={
                  abaSelecionada === "salvos"
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={23}
                color={
                  abaSelecionada === "salvos"
                    ? "#460303"
                    : "#650000"
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tabLinha}>
            <View
              style={[
                styles.tabLinhaParte,
                abaSelecionada === "fotos"
                  ? styles.tabLinhaAtiva
                  : styles.tabLinhaInativa,
              ]}
            />

            <View
              style={[
                styles.tabLinhaParte,
                abaSelecionada === "salvos"
                  ? styles.tabLinhaAtiva
                  : styles.tabLinhaInativa,
              ]}
            />
          </View>

          <View style={styles.grid}>
            {publicacoes.map((imagem, index) => (
              <TouchableOpacity
                key={index}
                onPress={abrirPublicacao}
                activeOpacity={0.8}
              >
                <Image
                  style={styles.photoPlaceholder}
                  source={imagem}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}