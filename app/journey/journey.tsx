import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import GridBackground from "../../components/GridBackground";
import { COLORS } from "../../constants/colors";
import { JOURNEY_DATA } from "../../constants/journey";

export default function Journey() {
  const router = useRouter();

  return (
    <GridBackground>
      <Stack.Screen 
        options={{
          headerTitle: "My Journey",
          headerTintColor: COLORS.textPrimary,
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false, // Menghilangkan garis default header
        }} 
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Career Path</Text>
            <Text style={styles.headerSubtitle}>Education, Work & Milestones</Text>
        </View>

        <View style={styles.timelineContainer}>
          {/* Garis Vertikal Panjang */}
          <View style={styles.verticalLine} />

          {JOURNEY_DATA.map((item, index) => {
            const isLast = index === JOURNEY_DATA.length - 1;
            
            return (
              <View key={item.id} style={styles.timelineItem}>
                
                {/* Bagian Kiri: Marker & Icon */}
                <View style={styles.leftSide}>
                  <View style={styles.iconBubble}>
                     <Ionicons name={item.icon as any} size={18} color="#000" />
                  </View>
                </View>

                {/* Bagian Kanan: Content Card */}
                <View style={[styles.card, isLast && styles.lastCard]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.yearBadge}>{item.year}</Text>
                    <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                  </View>
                  
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCompany}>{item.company}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  timelineContainer: {
    position: 'relative',
  },
  // Garis Neon Vertikal
  verticalLine: {
    position: 'absolute',
    left: 19, // Posisi garis agar pas di tengah icon
    top: 20,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0, 229, 255, 0.2)', // Warna Accent transparan
    borderRadius: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 32, // Jarak antar item
  },
  leftSide: {
    marginRight: 16,
    alignItems: 'center',
    zIndex: 1, // Agar icon berada di atas garis
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  lastCard: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  yearBadge: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 14,
  },
  typeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
  },
  itemTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  itemCompany: {
    color: COLORS.textSecondary, // Menggunakan warna sekunder agar beda dengan judul
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  itemDesc: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
  }
});