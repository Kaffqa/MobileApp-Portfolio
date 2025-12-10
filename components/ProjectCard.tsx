import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function ProjectCard({ item }: any) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/Projects/${item.id}` as any)}
      style={({ pressed }) => [
        styles.card,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <View style={styles.accent} />
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 12,
    overflow: "hidden",
    position: "relative",
    minWidth: 150,
  },
  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.accent,
    opacity: 0.95,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 6,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  desc: {
    color: COLORS.textSecondary,
    marginTop: 2,
    fontSize: 13,
    marginLeft: 6,
  },
});
