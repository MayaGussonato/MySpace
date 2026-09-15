import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  BodoniModa_700Bold,
  BodoniModa_400Regular,
} from "@expo-google-fonts/bodoni-moda";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import BoasVindas from "./src/pages/BoasVindas/BoasVindas";
import Login from "./src/pages/Login/Login";
import CriarConta from "./src/pages/CriarConta/CriarConta";
import Feed from "./src/pages/Feed/Feed";
import NovaPublicacao from "./src/pages/NovaPublicacao/NovaPublicacao";
import Publicacao from "./src/pages/Publicacao/Publicacao";
import Notificacao from "./src/pages/Notificacoes/Notificacoes";
import Perfil from "./src/pages/Perfil/Perfil";
import EditarPerfil from "./src/pages/EditarPerfil/EditarPerfil";
import Footer from "./src/components/Footer/Footer";

export default function App() {
  const [aba, setAba] = useState("Inicio");
  const [publicacaoAberta, setPublicacaoAberta] = useState(null);
  const [editarPerfil, setEditarPerfil] = useState(false);

  const [fontsCarregadas] = useFonts({
    BodoniModa_400Regular,
    BodoniModa_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsCarregadas) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
        />
      </SafeAreaProvider>
    );
  }

  if (editarPerfil) {
    return (
      <SafeAreaProvider>
        <EditarPerfil
          navigation={{
            goBack: () => setEditarPerfil(false),
          }}
        />
      </SafeAreaProvider>
    );
  }

  if (publicacaoAberta) {
    return (
      <SafeAreaProvider>
        <Publicacao
          publicacao={publicacaoAberta}
          navigation={{
            goBack: () => setPublicacaoAberta(null),
          }}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        {aba === "Inicio" && (
          <Feed
            onAbrirPublicacao={setPublicacaoAberta}
          />
        )}

        {aba === "Criar" && (
          <NovaPublicacao
            onVoltar={() => setAba("Inicio")}
          />
        )}

        {aba === "Notificacoes" && <Notificacao />}

        {aba === "Perfil" && (
          <Perfil
            navigation={{
              navigate: (tela, dados) => {
                if (tela === "Inicio") {
                  setAba("Inicio");
                  return;
                }

                if (tela === "Criar") {
                  setAba("Criar");
                  return;
                }

                if (tela === "Notificacoes") {
                  setAba("Notificacoes");
                  return;
                }

                if (tela === "EditarPerfil") {
                  setEditarPerfil(true);
                  return;
                }

                if (tela === "DPublicacao") {
                  setPublicacaoAberta(
                    dados || {
                      id: "1",
                      nome: "João Silva",
                      data: "Hoje às 10:30",
                      texto: "Lugar lindo!!",
                      curtidas: 24,
                      comentarios: 4,
                    }
                  );
                }
              },
            }}
          />
        )}

        <Footer
          ativo={aba}
          onNavegar={(novaAba) => {
            setAba(novaAba);
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}