import { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { cores } from './FeedStyle';

const AVATAR = require('../../../assets/images/img-exemplo.jpg');
const PUBLICACOES = [
  {
    id: '1',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
  {
    id: '2',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
  {
    id: '3',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
  {
    id: '4',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
  {
    id: '5',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
  {
    id: '6',
    nome: 'João Silva',
    data: 'Hoje às 10:30',
    avatar: AVATAR,
    texto: 'Aprendendo react native e Expo Router',
    curtidas: 247,
    comentarios: 4,
  },
];

function Publicacao({ item }) {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopo}>
        <View style={styles.avatar}>
          <Image source={item.avatar} style={styles.avatarImagem} />
        </View>

        <View style={styles.infoUsuario}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.data}>{item.data}</Text>
        </View>

        <Pressable style={styles.botaoOpcoes} hitSlop={10}>
          <Feather name="more-horizontal" size={22} color={cores.vinho} />
        </Pressable>
      </View>

      <Text style={styles.texto}>{item.texto}</Text>

      <View style={styles.acoes}>
        <Pressable style={styles.acao} onPress={() => setCurtido(!curtido)}>
          <Feather
            name="heart"
            size={20}
            color={curtido ? cores.vinhoClaro : cores.vinho}
          />
          <Text style={styles.contador}>
            {curtido ? item.curtidas + 1 : item.curtidas}
          </Text>
        </Pressable>

        <Pressable style={styles.acao}>
          <Feather name="message-circle" size={20} color={cores.vinho} />
          <Text style={styles.contador}>{item.comentarios}</Text>
        </Pressable>

        <View style={styles.espaco} />

        <Pressable hitSlop={10} onPress={() => setSalvo(!salvo)}>
          <Feather
            name="bookmark"
            size={20}
            color={salvo ? cores.vinhoClaro : cores.vinho}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default function Feed() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.fundo} />

      <View style={styles.header}>
        <Text style={styles.logoTexto}>MySpace</Text>

        <Pressable style={styles.botaoSino} hitSlop={10}>
          <Feather name="bell" size={26} color={cores.vinho} />
        </Pressable>
      </View>

      <FlatList
        data={PUBLICACOES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Publicacao item={item} />}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <Pressable style={styles.fab}>
        <Feather name="plus" size={30} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}