import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  editHeader: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  editTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#650000",
  },

  editProfileArea: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  editPhotoPlaceholder: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: "#eee",
    position: "relative",
  },

  cameraIcon: {
    position: "absolute",
    right: -3,
    bottom: -2,
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: "#650000",
    alignItems: "center",
    justifyContent: "center",
  },

  inputArea: {
    marginHorizontal: 22,
    marginBottom: 28,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  input: {
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#333",
  },

  bioInput: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 10,
  },

});

export default styles;