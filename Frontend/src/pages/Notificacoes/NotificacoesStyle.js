import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  titulo: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold",
    color: "#460303",
    marginBottom: 22,
  },

  scroll: {
    flex: 1,
  },

  lista: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  card: {
    width: "100%",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#B7B7B7",
    borderRadius: 18,
    marginBottom: 18,
    paddingHorizontal: 22,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  icone: {
    width: 38,
    marginRight: 18,
  },

  conteudo: {
    flex: 1,
    justifyContent: "center",
  },

  texto: {
    fontSize: 18,
    color: "#1a1a1a",
    lineHeight: 27,
    fontFamily: "Inter_400Regular",
  },

  negrito: {
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold",
  },

  horario: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    fontFamily: "Inter_400Regular",
  },
});

export default styles;