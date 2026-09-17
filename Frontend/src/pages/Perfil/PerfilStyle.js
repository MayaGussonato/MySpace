import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const GRID_PADDING = 14
const GRID_GAP = 8

const PHOTO_SIZE =
    (width - GRID_PADDING * 2 - GRID_GAP * 2) / 3

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
        paddingBottom: 25,
    },

    header: {
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 22,
    },

    headerEspaco: {
        width: 32,
        height: 32,
    },

    headerTitle: {
        fontSize: 19,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        letterSpacing: 0,
    },

    settingsButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    profileArea: {
        alignItems: "center",
        marginTop: 8,
    },

    profileImageWrapper: {
        position: "relative",
        width: 105,
        height: 105,
        alignItems: "center",
        justifyContent: "center",
    },

    profileImage: {
        width: 105,
        height: 105,
        borderRadius: 53,
        borderWidth: 2,
        borderColor: "#650000",
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    profileImageContent: {
        width: "100%",
        height: "100%",
        borderRadius: 53,
        alignItems: "center",
        justifyContent: "center",
    },

    lapizIcon: {
        position: "absolute",
        right: -2,
        bottom: 2,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#460303",
        alignItems: "center",
        justifyContent: "center",
    },

    name: {
        fontSize: 18,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
        marginTop: 12,
    },

    username: {
        fontSize: 15,
        color: "#AAAAAA",
        marginTop: 3,
        fontFamily: "Inter_400Regular",
    },

    stats: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 22,
        paddingHorizontal: 18,
    },

    stat: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 85,
    },

    statNumber: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        color: "#650000",
    },

    statLabel: {
        fontSize: 12,
        color: "#AAAAAA",
        marginTop: 5,
        fontFamily: "Inter_400Regular",
    },

    descricaoArea: {
        width: "100%",
        paddingHorizontal: 25,
        marginTop: 25,
        marginBottom: 22,
        alignItems: "center",
    },

    bio: {
        fontSize: 13,
        color: "#222222",
        lineHeight: 18,
        fontFamily: "Inter_400Regular",
        textAlign: "center",
    },

    tabs: {
        width: width - GRID_PADDING * 2,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        height: 46,
        marginTop: 4,
    },

    tab: {
        width: "50%",
        height: 46,
        alignItems: "center",
        justifyContent: "center",
    },

    tabLinha: {
        width: width - GRID_PADDING * 2,
        alignSelf: "center",
        flexDirection: "row",
        height: 2,
    },

    tabLinhaParte: {
        width: "50%",
        height: 2,
    },

    tabLinhaAtiva: {
        backgroundColor: "#460303",
    },

    tabLinhaInativa: {
        backgroundColor: "#E0E0E0",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: GRID_PADDING,
        paddingTop: 18,
        gap: GRID_GAP,
    },

    photoPlaceholder: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: "#F1F1F1",
    },

    gridImage: {
        width: "100%",
        height: "100%",
        borderRadius: 6,
    },
})

export default styles