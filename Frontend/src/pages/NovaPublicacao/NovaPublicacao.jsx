import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styles, { cores } from "./NovaPublicacaoStyle";

const LIMITE_CARACTERES = 255;

export default function NovaPublicacao({ onVoltar = () => {} }) {
  const [texto, setTexto] = useState("");

  const podePublicar = texto.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={cores.fundo}
      />

      <View style={styles.conteudo}>
        <View style={styles.header}>
          <Pressable
            style={styles.botaoVoltar}
            onPress={onVoltar}
            hitSlop={10}
          >
            <Feather
              name="chevron-left"
              size={26}
              color={cores.primaria}
            />
          </Pressable>

          <Text style={styles.titulo}>
            Nova Publicação
          </Text>

          <View style={styles.espacoHeader} />
        </View>

        <Text style={styles.pergunta}>
          O que você está pensando?
        </Text>

        <View style={styles.caixaPrincipal}>
          <View style={styles.caixa}>
            <TextInput
              style={styles.campoTexto}
              placeholder="Escreva algo"
              placeholderTextColor={cores.placeholder}
              value={texto}
              onChangeText={setTexto}
              maxLength={LIMITE_CARACTERES}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.contador}>
              {texto.length}/{LIMITE_CARACTERES}
            </Text>
          </View>

          <View style={styles.acoes}>
            <Pressable style={styles.acao}>
              <Feather
                name="image"
                size={20}
                color={cores.primaria}
                style={styles.iconeAcao}
              />

              <Text style={styles.rotuloAcao}>
                Imagem
              </Text>
            </Pressable>

            <Pressable style={styles.acao}>
              <Feather
                name="map-pin"
                size={20}
                color={cores.primaria}
                style={styles.iconeAcao}
              />

              <Text style={styles.rotuloAcao}>
                Localização
              </Text>
            </Pressable>

            <Pressable style={styles.acao}>
              <Feather
                name="smile"
                size={20}
                color={cores.primaria}
                style={styles.iconeAcao}
              />

              <Text style={styles.rotuloAcao}>
                Sentimento
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[
            styles.botaoPublicar,
            podePublicar
              ? styles.botaoPublicarAtivo
              : styles.botaoPublicarInativo,
          ]}
        >
          <Text style={styles.textoPublicar}>
            Publicar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}