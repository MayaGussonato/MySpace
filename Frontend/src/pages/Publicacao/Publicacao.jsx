import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import styles, { ACTIVE_COLOR } from "./dpublicacaoStyle";

// FOOTER
import Footer from "../../../src/components/footer/footer";

// Ícones
const likeIcon = require("../../../assets/Like.png");
const commentIcon = require("../../../assets/Comentario.png");
const bookmarkIcon = require("../../../assets/Favorito.png");

// Imagens
const profileUri = "https://i.pravatar.cc/150?img=15";
const commentUserUri = "https://i.pravatar.cc/150?img=32";

const postUri =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800";

export default function DPublicacao({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation?.goBack?.()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#1a1a1a"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Publicação
            </Text>

            <View style={styles.headerSpace} />
          </View>

          {/* USUÁRIO */}
          <View style={styles.userContainer}>
            <Image
              source={{ uri: profileUri }}
              style={styles.profileImage}
            />

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                João Silva
              </Text>

              <Text style={styles.date}>
                Hoje às 10:30
              </Text>
            </View>
          </View>

          {/* LEGENDA */}
          <Text style={styles.caption}>
            Lugar lindo!!
          </Text>

          {/* IMAGEM DA PUBLICAÇÃO */}
          <Image
            source={{ uri: postUri }}
            style={styles.postImage}
          />

          {/* AÇÕES */}
          <View style={styles.actions}>

            <View style={styles.actionLeft}>

              {/* CURTIR */}
              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.6}
              >
                <Image
                  source={likeIcon}
                  style={styles.actionIcon}
                />

                <Text style={styles.actionText}>
                  24
                </Text>
              </TouchableOpacity>

              {/* COMENTAR */}
              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.6}
              >
                <Image
                  source={commentIcon}
                  style={styles.actionIcon}
                />

                <Text style={styles.actionText}>
                  4
                </Text>
              </TouchableOpacity>

            </View>

            {/* FAVORITO */}
            <TouchableOpacity activeOpacity={0.6}>
              <Image
                source={bookmarkIcon}
                style={styles.actionIconBookmark}
              />
            </TouchableOpacity>

          </View>

          {/* COMENTÁRIOS */}
          <Text style={styles.commentsTitle}>
            Comentários
          </Text>

          <View style={styles.comment}>

            <Image
              source={{ uri: commentUserUri }}
              style={styles.commentImage}
            />

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

        {/* INPUT DE COMENTÁRIO */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#9a9a9a"
          />
        </View>

        {/* FOOTER */}
        <Footer />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}