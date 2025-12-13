import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Animated } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GridBackground from "../../components/GridBackground";
import { COLORS } from "../../constants/colors";

// Data Layanan
const SERVICES = [
  {
    id: 1,
    title: "Mobile Development",
    description: "Building high-performance iOS & Android apps using React Native and Expo. Focus on smooth animations and native feel.",
    icon: "phone-portrait-outline"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning interfaces with Figma. I prioritize user experience and accessibility.",
    icon: "color-palette-outline"
  },
  {
    id: 3,
    title: "Web Development",
    description: "Developing responsive modern websites using Next.js and Tailwind CSS. SEO optimized and fast performance.",
    icon: "laptop-outline"
  },
  {
    id: 4,
    title: "Backend & API",
    description: "Designing robust RESTful APIs and database schemas with Node.js, Express, and MongoDB or SQL.",
    icon: "server-outline"
  }
];

export default function Services() {
  const router = useRouter();
  
  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <GridBackground>
      {/* Config Header agar transparan & ada tombol back */}
      <Stack.Screen 
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: COLORS.textPrimary,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </Pressable>
          ),
        }} 
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          
          {/* Header Text */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>What I Do.</Text>
            <Text style={styles.subtitle}>
              High quality services to solve your technical challenges.
            </Text>
          </View>

          {/* Service Cards */}
          <View style={styles.grid}>
            {SERVICES.map((item, index) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.iconContainer}>
                   <Ionicons name={item.icon as any} size={28} color="#000" />
                </View>
                
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                
                {/* Decorative Accent Line */}
                <View style={styles.accentLine} />
              </View>
            ))}
          </View>

          {/* CTA Bottom */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>Have a specific project?</Text>
            <Pressable onPress={() => router.push("/contact" as any)}>
                <Text style={styles.ctaLink}>Let's Talk <Ionicons name="arrow-forward" size={14} /></Text>
            </Pressable>
          </View>

        </Animated.View>
      </ScrollView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: 100, paddingBottom: 40 },
  backBtn: { marginLeft: 0, padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },
  
  // Header
  headerSection: { marginBottom: 32 },
  title: { fontSize: 36, fontWeight: "800", color: COLORS.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, lineHeight: 24 },

  // Grid Layout
  grid: { gap: 16 },
  
  // Card Style
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: 'relative',
    overflow: 'hidden'
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22
  },
  accentLine: {
    position: 'absolute',
    right: 0,
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: COLORS.accent,
    opacity: 0.3,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },

  // CTA
  ctaContainer: { marginTop: 40, alignItems: 'center', gap: 8 },
  ctaText: { color: COLORS.textSecondary, fontSize: 14 },
  ctaLink: { color: COLORS.accent, fontWeight: "700", fontSize: 16 }
});