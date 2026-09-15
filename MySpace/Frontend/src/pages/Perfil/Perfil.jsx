import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";
import { SafeAreaView } from "react-native-web";
import Footer from "../footer/Footer";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil({ navigation }) {
  return (
    <View style={styles.container}>
        <ScrollView>

                {/* Cabeçalho */}
                <TouchableOpacity style={styles.header} onPress={() => navigation.navigate("EditarPerfil")}>
                    <Image/>
                    <Text style={styles.headerTitle}>Perfil</Text>

                    <Image
                        source={require("../../assets/fluent_settings-32-regular.png")}
                    />
                </TouchableOpacity>

                {/* Foto de perfil */}
                <View style={styles.profileArea}>

                    <TouchableOpacity style={styles.profileImage} onPress={() => navigation.navigate("EditarPerfil")}>
                        <Image
                            source={require("../../assets/Rectangle 146.png")}
                            style={{ width: "100%", height: "100%" }}
                        />
                        <View style={styles.lapizIcon}>
                            <Ionicons
                                name="pencil"
                                size={14}
                                color="#650000"
                            />
                        </View>
                        
                    </TouchableOpacity>

                    <Text style={styles.name}>Késsia Milena</Text>
                    <Text style={styles.username}>@kessia.milena</Text>

                </View>

                {/* Estatísticas */}
                <View style={styles.stats}>

                    <View style={styles.stat}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Publicações</Text>
                    </View>

                    <View style={styles.stat}>
                    <Text style={styles.statNumber}>150</Text>
                    <Text style={styles.statLabel}>Seguidores</Text>
                    </View>

                    <View style={styles.stat}>
                    <Text style={styles.statNumber}>80</Text>
                    <Text style={styles.statLabel}>Seguindo</Text>
                    </View>

                </View>

                {/* Bio */}
                <Text style={styles.bio}>
                    Desenvolvedora e entusiasta de tecnologia.{"\n"}
                    Apaixonada por compartilhar conhecimento! 💙
                </Text>

                {/* Abas */}
                <View style={styles.tabs}>
                    <Image source={require('../../assets/healthicons_ui-menu-grid.png')}/>
                    <Image source={require('../../assets/boxicons_bookmark.png')}/>
                </View>

                {/* Grade das publicações */}
                <View style={styles.grid}>

                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 155.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />
                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 156.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />
                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 157.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />
                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 159.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />
                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 160.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />
                    <Image style={styles.photoPlaceholder}
                        source={require('../../assets/Rectangle 161.png')}
                        onPress={() => navigation.navigate("DPublicacao")}
                        resizeMode="cover"
                    />

                </View>

        </ScrollView>
        <Footer />
    </View>
  );
}
