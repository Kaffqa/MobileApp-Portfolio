import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import GridBackground from "../../components/GridBackground";
import { COLORS } from "../../constants/colors";
import { PROJECTS } from "../../constants/data";

export default function ProjectDetail() {
  const params = useLocalSearchParams();
  const id = params.id?.toString();
  const project = PROJECTS.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <GridBackground>
        <View style={styles.center}>
          <Text style={{ color: COLORS.textPrimary }}>Project not found</Text>
        </View>
      </GridBackground>
    );
  }

  return (
    <GridBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: project.thumbnail }} style={styles.banner} />
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.subtitle}>{project.subtitle}</Text>
        <Text style={styles.description}>
          This is a demo project detail. Replace with real project description, goals,
          challenges, and learnings. The layout is intentionally minimal and focuses on
          readable content and neon accents.
        </Text>

        <Text style={styles.stackTitle}>Tech Stack</Text>
        <View style={styles.stackRow}>
          <Text style={styles.stackItem}>React Native</Text>
          <Text style={styles.stackItem}>Expo</Text>
          <Text style={styles.stackItem}>TypeScript</Text>
        </View>
      </ScrollView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  banner: { width: "100%", height: 200, borderRadius: 12, marginBottom: 12 },
  title: { color: COLORS.textPrimary, fontSize: 22, fontWeight: "700" },
  subtitle: { color: COLORS.textSecondary, marginTop: 6, marginBottom: 12 },
  description: { color: COLORS.textSecondary, lineHeight: 20, marginBottom: 12 },
  stackTitle: { color: COLORS.textPrimary, fontWeight: "700", marginTop: 8 },
  stackRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  stackItem: { color: COLORS.accent, marginRight: 12, marginBottom: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
