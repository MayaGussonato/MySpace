import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { cores } from './NovaPublicacaoStyle';

const LIMITE_CARACTERES = 255;

export default function NovaPublicacao({ onVoltar = () => {} }) {
  const [texto, setTexto] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.fundo} />

      <View style={styles.header}>
        <Pressable style={styles.botaoVoltar} onPress={onVoltar} hitSlop={10}>
          <Feather name="chevron-left" size={26} color={cores.texto} />
        </Pressable>
        <Text style={styles.titulo}>Nova Publicação</Text>
      </View>

      <View style={styles.caixa}>
        <Text style={styles.pergunta}>O que você está pensando?</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="Escreva algo"
          placeholderTextColor={cores.placeholder}
          value={texto}
          onChangeText={setTexto}
          maxLength={LIMITE_CARACTERES}
          multiline
        />
        <Text style={styles.contador}>
          {texto.length}/{LIMITE_CARACTERES}
        </Text>
      </View>

      <View style={styles.acoes}>
        <Pressable style={styles.acao}>
          <Feather name="image" size={18} color={cores.texto} style={styles.iconeFeather} />
          <Text style={styles.rotuloAcao}>Imagem</Text>
        </Pressable>

        <Pressable style={styles.acao}>
          <Image
            source={require('../../../assets/images/icone-localizacao.png')}
            style={styles.iconeAcao}
          />
          <Text style={styles.rotuloAcao}>Localização</Text>
        </Pressable>

        <Pressable style={styles.acao}>
          <Image
            source={require('../../../assets/images/icone-sentimento.png')}
            style={styles.iconeAcao}
          />
          <Text style={styles.rotuloAcao}>Sentimento</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}