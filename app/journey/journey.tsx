import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import GridBackground from "../../components/GridBackground";
import { COLORS } from "../../constants/colors";
import { JOURNEY_DATA } from "../../constants/journey";

const { width } = Dimensions.get("window");

// --- 1. Sub-Component Terpisah & Memoized (Optimasi Render) ---
const JourneyItem = React.memo(({ item, index, isLast }: any) => {
  // Animasi Slide Up & Fade In
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150, // Stagger effect (muncul berurutan)
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.itemContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      {/* Bagian Kiri: Garis & Icon */}
      <View style={styles.leftColumn}>
        <View style={styles.iconBubble}>
          <Ionicons name={item.icon} size={18} color="#000" />
        </View>
        {/* Garis hanya muncul jika BUKAN item terakhir */}
        {!isLast && <View style={styles.lineConnector} />}
      </View>

      {/* Bagian Kanan: Card Content */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Header Card: Year & Type */}
          <View style={styles.cardHeader}>
            <View style={styles.yearBadge}>
              <Ionicons name="calendar-outline" size={12} color={COLORS.accent} style={{ marginRight: 4 }} />
              <Text style={styles.yearText}>{item.year}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </Animated.View>
  );
});

// --- 2. Component Utama ---
export default function Journey() {
  return (
    <GridBackground>
      <Stack.Screen
        options={{
          headerTitle: "", // Kosongkan title default agar header custom di bawah lebih fokus
          headerTransparent: true,
          headerTintColor: COLORS.textPrimary,
          headerShadowVisible: false,
        }}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.headerTitle}>Career Path 🚀</Text>
          <Text style={styles.headerSubtitle}>My professional timeline & milestones.</Text>
        </View>

        <View style={styles.timelineList}>
          {JOURNEY_DATA.map((item, index) => (
            <JourneyItem 
              key={item.id || index} 
              item={item} 
              index={index} 
              isLast={index === JOURNEY_DATA.length - 1} 
            />
          ))}
        </View>
      </ScrollView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingTop: 100, // Kompensasi headerTransparent
    paddingBottom: 50,
  },
  // Header Style
  pageHeader: {
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 22,
  },
  
  // Timeline Logic
  timelineList: {
    paddingLeft: 8, // Sedikit indent agar icon tidak terlalu mepet kiri layar
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 4, // Jarak antar row (dikontrol oleh minHeight garis)
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: 16,
    width: 40, 
  },
  
  // Icon & Garis Neon
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 3,
    borderColor: '#111', // Memberi efek border agar terpisah dari garis
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  lineConnector: {
    flex: 1, // Mengisi sisa ruang ke bawah
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: -2, // Hack agar garis nyambung sempurna ke bubble berikutnya
    minHeight: 40, // Pastikan ada jarak minimal antar item
  },

  // Card Styling
  cardWrapper: {
    flex: 1,
    paddingBottom: 32, // Memberi jarak visual antar card content
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // Badges
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)', // Warna accent transparan
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yearText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  typeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Text Content
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  company: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 12,
  },
  description: {
    color: '#D1D5DB', // Abu-abu terang
    fontSize: 14,
    lineHeight: 22, // Keterbacaan lebih baik
  },
});