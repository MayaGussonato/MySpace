import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%"
  },

  // PERFIL

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  editProfileArea: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  photoPlaceholder: {
  height: 100,
  width: "31.5%",
  aspectRatio: 1,
  borderRadius: 6,
  marginBottom: 10,
  },

  lapizIcon: {
    position: "absolute",
    right: -3,
    bottom: -2,
    width: 23,
    height: 23,
    color: '#650000',
    borderRadius: 12,
    borderColor: "#650000",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    paddingLeft: 15,
    fontSize: 17,
    fontWeight: "700",
    color: "#650000",
  },

  profileArea: {
    alignItems: "center",
    marginTop: 5,
  },

  profileImage: {
    width: 78,
    height: 78,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#650000",
    backgroundColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#650000",
    marginTop: 8,
  },

  username: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
    paddingHorizontal: 25,
  },

  stat: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#650000",
  },

  statLabel: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 5,
  },

  bio: {
    fontSize: 13,
    color: "#333",
    paddingLeft: 30,
    marginHorizontal: 25,
    marginTop: 15,
    lineHeight: 16,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 22,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 8,
  },
});

export default styles;