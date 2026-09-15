import { StyleSheet, Platform } from "react-native";

export const coresFooter = {
  branco: "#FFFFFF",
  linha: "#B01C2E",
  ativo: "#7B1B27",
  inativo: "#B3B0B8",
};

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    backgroundColor: coresFooter.branco,
    borderTopWidth: 2,
    borderTopColor: coresFooter.linha,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  rotulo: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
    color: coresFooter.inativo,
  },
  rotuloAtivo: {
    color: coresFooter.ativo,
    fontWeight: "700",
  },
});