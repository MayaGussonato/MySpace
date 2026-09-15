import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const GRID_PADDING = 22
const GRID_GAP = 8
const PHOTO_SIZE =
  (width - GRID_PADDING * 2 - GRID_GAP * 2) / 3

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingBottom: 10,
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
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#650000",
    fontFamily: "Inter_600SemiBold",
  },

  settingsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  profileArea: {
    alignItems: "center",
    marginTop: 2,
  },

  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#650000",
    overflow: "visible",
    backgroundColor: "#eee",
  },

  profileImageContent: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
  },

  lapizIcon: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#650000",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#650000",
    marginTop: 10,
    fontFamily: "Inter_600SemiBold",
  },

  username: {
    fontSize: 15,
    color: "#aaa",
    marginTop: 2,
    fontFamily: "Inter_400Regular",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  stat: {
    alignItems: "center",
    minWidth: 80,
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#650000",
    fontFamily: "Inter_600SemiBold",
  },

  statLabel: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
    fontFamily: "Inter_400Regular",
  },

  bio: {
    fontSize: 13,
    color: "#222",
    marginHorizontal: 25,
    marginTop: 16,
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
  },

  tabs: {
    width: width - GRID_PADDING * 2,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    marginTop: 20,
  },

  tab: {
    width: "50%",
    height: 42,
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
    backgroundColor: "#e0e0e0",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: GRID_PADDING,
    paddingTop: 10,
    gap: GRID_GAP,
  },

  photoPlaceholder: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 6,
  },
})

export default styles;