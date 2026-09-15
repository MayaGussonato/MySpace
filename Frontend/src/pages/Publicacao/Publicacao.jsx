import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles, { ACTIVE_COLOR } from "./PublicacaoStyle";

const ICON_COLOR = "#460303";

const profileImg = require("../../../assets/images/img-exemplo.jpg");
const commentUserImg = require("../../../assets/images/img-exemplo2.jpg");

const postUri =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800";

export default function Publicacao({ navigation, publicacao }) {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const nome = publicacao?.nome || "João Silva";
  const data = publicacao?.data || "Hoje às 10:30";
  const texto = publicacao?.texto || "Lugar lindo!!";
  const curtidas = publicacao?.curtidas ?? 24;
  const comentarios = publicacao?.comentarios ?? 4;
  const avatar = publicacao?.avatar || profileImg;

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation?.goBack?.()}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color="#1A1A1A"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Publicação</Text>

            <View style={styles.headerSpace} />
          </View>

          <View style={styles.userContainer}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={avatar}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{nome}</Text>
              <Text style={styles.date}>{data}</Text>
            </View>
          </View>

          <Text style={styles.caption}>{texto}</Text>

          <Image
            source={{ uri: postUri }}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={styles.actions}>
            <View style={styles.actionLeft}>
              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.6}
                onPress={() => setCurtido(!curtido)}
              >
                <Feather
                  name="heart"
                  size={24}
                  color={curtido ? ACTIVE_COLOR : ICON_COLOR}
                />

                <Text style={styles.actionText}>
                  {curtido ? curtidas + 1 : curtidas}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.6}
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color={ICON_COLOR}
                />

                <Text style={styles.actionText}>
                  {comentarios}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setSalvo(!salvo)}
            >
              <Feather
                name="bookmark"
                size={24}
                color={salvo ? ACTIVE_COLOR : ICON_COLOR}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.commentsTitle}>
            Comentários
          </Text>

          <View style={styles.comment}>
            <View style={styles.commentImageWrapper}>
              <Image
                source={commentUserImg}
                style={styles.commentImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.commentContent}>
              <Text style={styles.commentName}>
                Maria Oliveira
              </Text>

              <Text style={styles.commentDate}>
                Hoje às 10:30
              </Text>

              <Text style={styles.commentText}>
                Onde fica isso?
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#9A9A9A"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}