import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CONTENT_PADDING = width * 0.05;

export const ACTIVE_COLOR = "#460303";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f7f7f9",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 12,
    paddingBottom: 8,
  },

 headerButton: {
  width: 32,
  height: 32,
  alignItems: "flex-start",
  justifyContent: "center",
  transform: [{ translateY: 3 }],
},

  headerSpace: {
    width: 32,
  },

  title: {
  fontSize: 18,
  fontWeight: "700",
  color: ACTIVE_COLOR,
  transform: [{ translateY: 3 }],
},

  // =========================
  // USUÁRIO
  // =========================

  userContainer: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: CONTENT_PADDING,
  marginTop: 30,
},  

  profileImage: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.14) / 2,
  },

  userInfo: {
    marginLeft: 12,
  },

  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#161616",
  },

  date: {
    fontSize: 12,
    color: "#8a8a8a",
    marginTop: 2,
  },

  // =========================
  // PUBLICAÇÃO
  // =========================

  caption: {
    fontSize: 15,
    color: "#1a1a1a",
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 14,
  },

  postImage: {
    width: width * 0.9,
    aspectRatio: 16 / 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 16,
  },

  // =========================
  // AÇÕES
  // =========================

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 10,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  actionIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  actionIconBookmark: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  actionText: {
    fontSize: 13,
    color: "#1a1a1a",
    marginLeft: 4,
  },

  // =========================
  // COMENTÁRIOS
  // =========================

  commentsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#161616",
    alignSelf: "center",
    width: width * 0.9,
    marginTop: 32,

    // SOBE APENAS O TÍTULO
    transform: [{ translateY: -4 }],
  },

  comment: {
    flexDirection: "row",
    alignSelf: "center",
    width: width * 0.9,
    marginTop: 10,
  },

  commentImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
  },

  commentContent: {
    marginLeft: 14,
    flexShrink: 1,
  },

  commentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#161616",
  },

  commentDate: {
    fontSize: 11,
    color: "#8a8a8a",
    marginTop: 1,
  },

  commentText: {
    fontSize: 13,
    color: "#1a1a1a",
    marginTop: 6,
  },

  // =========================
  // INPUT
  // =========================

  inputWrapper: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f7f7f9",
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#d9d9dc",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    backgroundColor: "#fff",
  },

});

export default styles;