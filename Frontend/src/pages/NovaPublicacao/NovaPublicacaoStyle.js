import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const cores = {
  fundo: "#FFFFFF",
  primaria: "#460303",
  texto: "#222222",
  placeholder: "#999999",
  caixa: "#F2F2F2",
};

const LATERAL = Math.max(20, width * 0.055);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: LATERAL,
    paddingTop: Platform.OS === "ios" ? 12 : 18,
  },

  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  botaoVoltar: {
    width: 36,
    height: 36,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  espacoHeader: {
    width: 36,
  },

  titulo: {
    fontSize: 19,
    fontWeight: "700",
    color: cores.primaria,
    fontFamily: "Inter_600SemiBold",
  },

  pergunta: {
    fontSize: 16,
    fontWeight: "600",
    color: cores.texto,
    marginTop: 20,
    marginBottom: 12,
    fontFamily: "Inter_600SemiBold",
  },

  caixaPrincipal: {
    width: "100%",
    backgroundColor: cores.caixa,
    borderRadius: 12,
    padding: 12,
  },

  caixa: {
    width: "100%",
    minHeight: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },

  campoTexto: {
    flex: 1,
    minHeight: 120,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 32,
    fontSize: 15,
    color: cores.texto,
    fontFamily: "Inter_400Regular",
  },

  contador: {
    position: "absolute",
    right: 12,
    bottom: 9,
    fontSize: 11,
    color: "#999999",
    fontFamily: "Inter_400Regular",
  },

acoes: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 14,
  paddingHorizontal: 0,
},

acao: {
  width: "32%",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 42,
},

iconeAcao: {
  marginBottom: 4,
},

rotuloAcao: {
  fontSize: 12,
  color: cores.primaria,
  fontFamily: "Inter_500Medium",
  textAlign: "center",
},

  botaoPublicar: {
    width: "100%",
    height: 48,
    backgroundColor: cores.primaria,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },

  textoPublicar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold",
  },
});

export default styles;