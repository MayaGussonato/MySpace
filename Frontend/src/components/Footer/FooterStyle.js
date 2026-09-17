import { StyleSheet } from "react-native";

export const coresFooter = {
  branco: "#FFFFFF",
  linha: "#460303",
  ativo: "#7B1B27",
  inativo: "#B3B0B8",
};

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: coresFooter.branco,
    borderTopWidth: 2,
    borderTopColor: coresFooter.linha,
    paddingTop: 8,
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