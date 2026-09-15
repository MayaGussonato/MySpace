import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CONTENT_PADDING = width * 0.06;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  editHeader: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CONTENT_PADDING,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  editTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#650000",
    fontFamily: "Inter_600SemiBold",
  },

  headerSpace: {
    width: 40,
  },

  editProfileArea: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 28,
  },

  photoWrapper: {
    position: "relative",
  },

  editPhotoPlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: "#650000",
    backgroundColor: "#EEEEEE",
  },

  cameraIcon: {
    position: "absolute",
    right: -2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#650000",
    alignItems: "center",
    justifyContent: "center",
  },

  inputArea: {
    marginHorizontal: CONTENT_PADDING,
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#650000",
    marginBottom: 7,
    fontFamily: "Inter_600SemiBold",
  },

  input: {
    width: "100%",
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222222",
    fontFamily: "Inter_400Regular",
  },

  bioInput: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },

  buttonsArea: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: CONTENT_PADDING,
    marginTop: 8,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    borderColor: "#460303",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#460303",
    fontFamily: "Inter_600SemiBold",
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    borderColor: "#460303",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#460303",
  },

  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Inter_600SemiBold",
  },
});

export default styles;