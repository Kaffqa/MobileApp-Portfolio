import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, Image, Animated, Linking, ScrollView } from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; 
import GridBackground from "../components/GridBackground";
import { COLORS } from "../constants/colors";

// --- DATA ---
const SKILLS = ["React Native", "TypeScript", "Next.js", "Node.js", "UI/UX", "Figma", "MongoDB"];
const STATS = [
  { label: "Projects", value: "12+" },
  { label: "Experience", value: "2 Yr" },
  { label: "Clients", value: "5+" },
];
const SOCIALS = [
  { icon: "logo-github", url: "https://github.com" },
  { icon: "logo-linkedin", url: "https://linkedin.com" },
  { icon: "logo-instagram", url: "https://instagram.com" },
];

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const Button = ({ title, onPress, primary = false, icon = null, style = {} }: any) => (
    <Pressable 
      style={({ pressed }) => [styles.btn, primary ? styles.btnPrimary : styles.btnOutline, style, pressed && styles.pressed]} 
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={20} color={primary ? "#000" : COLORS.textPrimary} />}
      <Text style={primary ? styles.txtPrimary : styles.txtSecondary}>{title}</Text>
    </Pressable>
  );

  return (
    <GridBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.main, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          
          {/* HEADER */}
          <View style={styles.header}>
             <Image source={{ uri: "https://github.com/shadcn.png" }} style={styles.avatar} />
             <View>
                <Text style={styles.greeting}>Hello, I'm Kaffqa 👋</Text>
                <View style={styles.badge}><View style={styles.dot}/><Text style={styles.badgeTxt}>Available for work</Text></View>
             </View>
          </View>

          <Text style={styles.h1}>Building Digital{"\n"}Experiences.</Text>
          <Text style={styles.subtitle}>Fullstack Developer | Mobile App Enthusiast | AI Explorer</Text>

          {/* STATS */}
          <View style={styles.statsCard}>
            {STATS.map((s, i) => (
              <View key={i} style={styles.center}>
                <Text style={styles.statVal}>{s.value}</Text>
                <Text style={styles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* SKILLS */}
          <View style={styles.mb32}>
            <Text style={styles.label}>CURRENT STACK</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
              {SKILLS.map((skill, i) => (
                <View key={i} style={styles.chip}><Text style={styles.chipTxt}>{skill}</Text></View>
              ))}
            </ScrollView>
          </View>

          {/* BUTTONS */}
          <View style={styles.btnGroup}>
            <View style={styles.row}>
                <Button title="Projects" primary onPress={() => router.push("/Projects" as any)} style={{ flex: 1 }} />
                <Button title="Contact" onPress={() => router.push("/contact" as any)} style={{ flex: 1 }} />
                <Button 
        title="Services" 
        onPress={() => router.push("/Services" as any)} 
        style={{ flex: 1 }} 
      />
            </View>
            <Button title="View My Journey" icon="time-outline" onPress={() => router.push("/journey" as any)} style={styles.btnGhost} />
          </View>

          {/* SOCIALS */}
          <View style={styles.socialRow}>
             {SOCIALS.map((s, i) => (
               <Pressable key={i} onPress={() => Linking.openURL(s.url)}>
                 <Ionicons name={s.icon as any} size={24} color={COLORS.textSecondary} />
               </Pressable>
             ))}
          </View>

        </Animated.View>
      </ScrollView>

      {/* FAB */}
      <Pressable style={({ pressed }) => [styles.fab, pressed && styles.pressed]} onPress={() => alert("Download Logic")}>
        <MaterialCommunityIcons name="file-download-outline" size={26} color="#000" />
      </Pressable>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: 60, paddingBottom: 100 },
  main: { flex: 1 },
  // Header
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: COLORS.accent },
  greeting: { color: COLORS.textPrimary, fontSize: 18, fontWeight: "700" },
  badge: { flexDirection: 'row', alignItems: 'center', marginTop: 4, backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 6 },
  badgeTxt: { color: '#10B981', fontSize: 12, fontWeight: '600' },
  // Text
  h1: { color: COLORS.textPrimary, fontSize: 36, fontWeight: "800", lineHeight: 42, marginBottom: 12 },
  subtitle: { color: COLORS.textSecondary, fontSize: 16, lineHeight: 24, marginBottom: 32 },
  label: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 12 },
  // Stats
  statsCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, marginBottom: 32, borderWidth: 1, borderColor: COLORS.cardBorder },
  center: { alignItems: 'center' },
  statVal: { color: COLORS.accent, fontSize: 24, fontWeight: "800" },
  statLbl: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  // Chips
  mb32: { marginBottom: 32 },
  chip: { backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 30, marginRight: 10, borderWidth: 1, borderColor: COLORS.cardBorder },
  chipTxt: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "500" },
  // Buttons
  btnGroup: { gap: 12, marginBottom: 40 },
  row: { flexDirection: 'row', gap: 12 },
  btn: { paddingVertical: 18, borderRadius: 16, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 8 },
  btnPrimary: { backgroundColor: COLORS.accent, shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
  btnOutline: { borderWidth: 1, borderColor: COLORS.textSecondary },
  btnGhost: { backgroundColor: 'rgba(255,255,255,0.05)', marginTop: -4 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  txtPrimary: { color: "#000", fontWeight: "700", fontSize: 16 },
  txtSecondary: { color: COLORS.textPrimary, fontWeight: "600", fontSize: 16 },
  // Misc
  socialRow: { flexDirection: 'row', gap: 24, marginTop: 10 },
  fab: { position: 'absolute', bottom: 30, right: 24, width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: COLORS.accent, shadowOpacity: 0.4, shadowRadius: 10 },
});