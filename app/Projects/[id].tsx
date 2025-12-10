import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GridBackground from "../../components/GridBackground";
import { COLORS } from "../../constants/colors";
import { PROJECTS } from "../../constants/data";

export default function ProjectDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id?.toString();
  const project = PROJECTS.find((p) => p.id.toString() === id);

  if (!project) return null;

  return (
    <GridBackground>
      {/* Konfigurasi Header agar transparan/custom */}
      <Stack.Screen 
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: COLORS.textPrimary,
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </Pressable>
          )
        }} 
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: project.thumbnail }} style={styles.banner} />
        
        <View style={styles.contentBox}>
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.subtitle}>{project.subtitle}</Text>

            {/* Tech Stack Chips */}
            <Text style={styles.sectionLabel}>TECHNOLOGIES</Text>
            <View style={styles.stackRow}>
            {project.tags.map((tech, index) => (
                <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{tech}</Text>
                </View>
            ))}
            </View>

            <Text style={styles.sectionLabel}>ABOUT</Text>
            <Text style={styles.description}>
            {project.description}
            </Text>

            {/* Action Button */}
            <Pressable 
                style={styles.actionButton}
                onPress={() => Linking.openURL(project.link || "https://github.com")}
            >
                <Text style={styles.actionBtnText}>View Live Project</Text>
                <Ionicons name="open-outline" size={18} color="#000" />
            </Pressable>
        </View>
      </ScrollView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingBottom: 40 
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  banner: { 
    width: "100%", 
    height: 300, 
    resizeMode: 'cover'
  },
  contentBox: {
    padding: 20,
    marginTop: -20, // Negative margin to overlap image
    backgroundColor: COLORS.background, // Must match bg
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: { 
    color: COLORS.textPrimary, 
    fontSize: 28, 
    fontWeight: "800",
  },
  subtitle: { 
    color: COLORS.accent, 
    fontSize: 16, 
    marginTop: 4, 
    marginBottom: 24,
    fontWeight: "600"
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },
  description: { 
    color: '#CCCCCC', 
    lineHeight: 24, 
    fontSize: 16,
    marginBottom: 32 
  },
  stackRow: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 8,
    marginBottom: 32 
  },
  chip: { 
    backgroundColor: COLORS.surface, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder
  },
  chipText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "500"
  },
  actionButton: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16
  }
});