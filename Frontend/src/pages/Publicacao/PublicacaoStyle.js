import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const ACTIVE_COLOR = "#460303";

const CONTENT_PADDING = width * 0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    paddingBottom: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 12,
    paddingBottom: 12,
  },

  headerButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerSpace: {
    width: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: ACTIVE_COLOR,
  },

  userContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 24,
  },

  profileImageWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
  },

  userInfo: {
    marginLeft: 14,
    flex: 1,
  },

  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#161616",
  },

  date: {
    fontSize: 13,
    color: "#8A8A8A",
    marginTop: 3,
  },

  caption: {
    width: "100%",
    fontSize: 17,
    color: "#1A1A1A",
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 18,
  },

  postImage: {
    width: width * 0.9,
    aspectRatio: 16 / 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 16,
  },

  actions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 12,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },

  actionText: {
    fontSize: 15,
    color: "#1A1A1A",
    marginLeft: 7,
  },

  commentsTitle: {
    width: "90%",
    fontSize: 18,
    fontWeight: "700",
    color: "#161616",
    alignSelf: "center",
    marginTop: 32,
  },

  comment: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 14,
  },

  commentImageWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },

  commentImage: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },

  commentContent: {
    flex: 1,
    marginLeft: 14,
  },

  commentName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#161616",
  },

  commentDate: {
    fontSize: 12,
    color: "#8A8A8A",
    marginTop: 2,
  },

  commentText: {
    fontSize: 14,
    color: "#1A1A1A",
    marginTop: 6,
  },

  inputWrapper: {
    width: "100%",
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F7F7F9",
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#D9D9DC",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
  },
});

export default styles;