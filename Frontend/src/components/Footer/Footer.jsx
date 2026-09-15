import { Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { coresFooter } from "./FooterStyle";

const ABAS = [
  {
    chave: "Inicio",
    rotulo: "Inicio",
    icone: "home",
  },
  {
    chave: "Criar",
    rotulo: "Criar",
    icone: "plus-circle",
  },
  {
    chave: "Notificacoes",
    rotulo: "Notificações",
    icone: "bell",
  },
  {
    chave: "Perfil",
    rotulo: "Perfil",
    icone: "user",
  },
];

export default function Footer({
  ativo = "Inicio",
  onNavegar = () => {},
}) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {ABAS.map((aba) => {
        const selecionada = aba.chave === ativo;

        return (
          <Pressable
            key={aba.chave}
            style={styles.item}
            onPress={() => onNavegar(aba.chave)}
          >
            <Feather
              name={aba.icone}
              size={24}
              color={
                selecionada
                  ? coresFooter.ativo
                  : coresFooter.inativo
              }
            />

            <Text
              allowFontScaling={false}
              style={[
                styles.rotulo,
                selecionada && styles.rotuloAtivo,
              ]}
            >
              {aba.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
}