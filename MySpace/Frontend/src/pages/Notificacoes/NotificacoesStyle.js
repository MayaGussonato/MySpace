import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },

  titulo: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#5d0808",
    marginTop: 20,
    marginBottom: 20,
  },

  lista: {
    paddingHorizontal: 28,
    paddingBottom: 20,
  },

  card: {
    width: "100%",
    minHeight: 66,
    borderWidth: 1.5,
    borderColor: "#c7c7c7",
    borderRadius: 7,
    marginBottom: 15,
    paddingHorizontal: 9,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  icone: {
    width: 35,
    marginRight: 1,
  },

  conteudo: {
    flex: 1,
    justifyContent: "center",
  },

  texto: {
    fontSize: 11.5,
    color: "#222",
    lineHeight: 14,
  },

  negrito: {
    fontWeight: "bold",
  },

  horario: {
    fontSize: 11,
    color: "#666",
    marginTop: 5,
  },
});

export default styles;