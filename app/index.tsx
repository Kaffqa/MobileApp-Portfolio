import { useRouter } from "expo-router";
import { 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Animated, 
  Linking 
} from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons"; // Icon bawaan Expo
import GridBackground from "../components/GridBackground";
import { COLORS } from "../constants/colors";

export default function Home() {
  const router = useRouter();
  
  // Animasi Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Fungsi helper untuk membuka link sosial
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <GridBackground>
      <View style={styles.container}>
        
        {/* Bagian Konten Utama dengan Animasi */}
        <Animated.View 
          style={[
            styles.contentContainer, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Avatar / Foto Profil */}
          <View style={styles.avatarContainer}>
             <Image 
               source={{ uri: "https://github.com/shadcn.png" }} // Ganti dengan URL foto Anda
               style={styles.avatar}
             />
             <View style={styles.statusBadge} />
          </View>

          <Text style={styles.greeting}>Hello, I'm Kaffqa 👋</Text>
          <Text style={styles.title}>Creative Tech{"\n"}Portfolio.</Text>
          <Text style={styles.subtitle}>
            Mobile Developer | UI Engineer | Tech Enthusiast
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            {/* Primary Button */}
            <Pressable
              style={({ pressed }) => [
                styles.button, 
                styles.buttonPrimary,
                pressed && styles.buttonPressed
              ]}
              onPress={() => router.push("/Projects" as any)}
            >
              <Text style={styles.btnTextPrimary}>View Projects</Text>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </Pressable>

            {/* Secondary Button (Outline) */}
            <Pressable
              style={({ pressed }) => [
                styles.button, 
                styles.buttonOutline,
                pressed && styles.buttonPressed
              ]}
              onPress={() => router.push("/contact" as any)}
            >
              <Text style={styles.btnTextSecondary}>Contact Me</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Footer Social Links */}
        <Animated.View style={[styles.socialContainer, { opacity: fadeAnim }]}>
          <Pressable onPress={() => openLink("https://github.com")}>
            <Ionicons name="logo-github" size={24} color={COLORS.textSecondary} />
          </Pressable>
          <Pressable onPress={() => openLink("https://linkedin.com")}>
            <Ionicons name="logo-linkedin" size={24} color={COLORS.textSecondary} />
          </Pressable>
          <Pressable onPress={() => openLink("mailto:email@example.com")}>
            <Ionicons name="mail" size={24} color={COLORS.textSecondary} />
          </Pressable>
        </Animated.View>

      </View>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Memisahkan konten utama dan footer
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  // Avatar Styles
  avatarContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: '#10B981', // Green for "Available for work"
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000', // Sesuaikan dengan background color app Anda
  },
  // Typography
  greeting: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: '90%',
  },
  // Buttons
  buttonGroup: {
    width: '100%',
    gap: 16, // Jarak antar button
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  btnTextPrimary: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  btnTextSecondary: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 16,
  },
  // Footer
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
});