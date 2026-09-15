import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const ACTIVE_COLOR = "#460303"

const CONTENT_PADDING = width * 0.05

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
        fontFamily: "Inter_600SemiBold",
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
        fontFamily: "Inter_600SemiBold",
        color: ACTIVE_COLOR,
    },

    date: {
        fontSize: 13,
        color: "#8A8A8A",
        marginTop: 3,
        fontFamily: "Inter_400Regular",
    },

    caption: {
        width: "100%",
        fontSize: 17,
        color: "#1A1A1A",
        paddingHorizontal: CONTENT_PADDING,
        marginTop: 18,
        fontFamily: "Inter_400Regular",
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
        fontFamily: "Inter_400Regular",
    },

    commentsTitle: {
        width: "90%",
        fontSize: 18,
        fontFamily: "Inter_600SemiBold",
        color: "#161616",
        alignSelf: "center",
        marginTop: 32,
    },

    comment: {
        width: "90%",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 14,
        paddingBottom: 14,
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
        fontFamily: "Inter_600SemiBold",
        color: ACTIVE_COLOR,
    },

    commentDate: {
        fontSize: 12,
        color: "#8A8A8A",
        marginTop: 2,
        fontFamily: "Inter_400Regular",
    },

    commentText: {
        fontSize: 14,
        color: "#1A1A1A",
        marginTop: 6,
        fontFamily: "Inter_400Regular",
    },

    commentDivider: {
        width: "90%",
        height: 1,
        backgroundColor: "#D9D9D9",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 8,
    },

    inputWrapper: {
        width: "100%",
        paddingHorizontal: CONTENT_PADDING,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#F7F7F9",
    },

    inputContainer: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D9D9DC",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
    },

    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 14,
        paddingVertical: 0,
        fontSize: 15,
        color: "#1A1A1A",
        backgroundColor: "#FFFFFF",
        fontFamily: "Inter_400Regular",
    },

    sendButton: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default styles