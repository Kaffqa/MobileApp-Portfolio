import { useRouter } from "expo-router";
import { 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Animated, 
  Linking, 
  ScrollView,
  Dimensions
} from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; 
import * as Haptics from 'expo-haptics'; // Optional: Jika sudah install expo-haptics
import GridBackground from "../components/GridBackground";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get('window');

// Data Dummy untuk UI
const SKILLS = ["React Native", "TypeScript", "Next.js", "Node.js", "UI/UX Design", "Figma", "MongoDB"];
const STATS = [
  { label: "Projects", value: "12+" },
  { label: "Experience", value: "2 Yr" },
  { label: "Clients", value: "5+" },
];

export default function Home() {
  const router = useRouter();
  
  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = (route: string) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Uncomment jika pakai haptics
    router.push(route as any);
  };

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <GridBackground>
      {/* Menggunakan ScrollView agar konten tidak terpotong di layar kecil */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.mainContent, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* --- 1. HEADER PROFILE --- */}
          <View style={styles.headerRow}>
             <Image 
               source={{ uri: "https://github.com/shadcn.png" }} 
               style={styles.avatar}
             />
             <View>
                <Text style={styles.greeting}>Hello, I'm Kaffqa 👋</Text>
                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Available for work</Text>
                </View>
             </View>
          </View>

          <Text style={styles.title}>Building Digital{"\n"}Experiences.</Text>
          <Text style={styles.subtitle}>
            fullstack Developer | Mobile App Enthusiast  | Ai Explorer
          </Text>

          {/* --- 2. NEW: QUICK STATS --- */}
          <View style={styles.statsContainer}>
            {STATS.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* --- 3. NEW: HORIZONTAL SKILLS SCROLL --- */}
          <View style={styles.skillsSection}>
            <Text style={styles.sectionLabel}>CURRENT STACK</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {SKILLS.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* --- 4. ACTION BUTTONS --- */}
          <View style={styles.buttonGroup}>
            <Pressable
              style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.pressed]}
              onPress={() => handlePress("/Projects")}
            >
              <Text style={styles.btnTextPrimary}>View Projects</Text>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.button, styles.buttonOutline, pressed && styles.pressed]}
              onPress={() => handlePress("/contact")}
            >
              <Text style={styles.btnTextSecondary}>Contact Me</Text>
            </Pressable>
          </View>

          {/* --- 5. SOCIAL LINKS --- */}
          <View style={styles.socialRow}>
             <Pressable onPress={() => openLink("https://github.com")}>
                <Ionicons name="logo-github" size={24} color={COLORS.textSecondary} />
             </Pressable>
             <Pressable onPress={() => openLink("https://linkedin.com")}>
                <Ionicons name="logo-linkedin" size={24} color={COLORS.textSecondary} />
             </Pressable>
             <Pressable onPress={() => openLink("https://instagram.com")}>
                <Ionicons name="logo-instagram" size={24} color={COLORS.textSecondary} />
             </Pressable>
          </View>

        </Animated.View>
      </ScrollView>

      {/* --- 6. NEW: FLOATING ACTION BUTTON (FAB) --- */}
      {/* Tombol melayang untuk Download CV */}
      <Pressable 
        style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
        onPress={() => alert("Download Resume Logic Here")}
      >
        <MaterialCommunityIcons name="file-download-outline" size={26} color="#000" />
      </Pressable>

    </GridBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100, // Space for FAB
  },
  mainContent: {
    flex: 1,
  },
  // Header Profile
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  greeting: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  // Titles
  title: {
    color: COLORS.textPrimary,
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42,
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  // Skills
  skillsSection: {
    marginBottom: 32,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },
  skillChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  // Buttons
  buttonGroup: {
    gap: 16,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 18,
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
    shadowRadius: 10,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.9,
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
  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 10,
  },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 100,
  },
});