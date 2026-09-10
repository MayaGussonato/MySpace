import React from 'react';
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

export default function App() {
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

  return <BoasVindas />;
  //return <Login />;
  //return <CriarConta />;
}