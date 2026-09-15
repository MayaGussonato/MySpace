import React, { useState } from 'react';
import { View } from 'react-native';
import {
  useFonts,
  BodoniModa_700Bold,
  BodoniModa_400Regular,
} from '@expo-google-fonts/bodoni-moda';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import BoasVindas from './src/pages/BoasVindas/BoasVindas';
import Login from './src/pages/Login/Login';
import CriarConta from './src/pages/CriarConta/CriarConta';
import Feed from './src/pages/Feed/Feed';
import NovaPublicacao from './src/pages/NovaPublicacao/NovaPublicacao';
import Footer from './src/components/Footer/Footer';

export default function App() {
  const [aba, setAba] = useState('Inicio');

  const [fontsCarregadas] = useFonts({
    BodoniModa_400Regular,
    BodoniModa_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsCarregadas) {
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {aba === 'Inicio' && <Feed />}
      {aba === 'Criar' && (
        <NovaPublicacao onVoltar={() => setAba('Inicio')} />
      )}
      <Footer ativo={aba} onNavegar={setAba} />
    </View>
  );
}