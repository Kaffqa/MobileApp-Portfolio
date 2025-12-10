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
      {/* Thumbnail Image */}
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
        
        {/* Render First 2 Tags only to keep it clean */}
        <View style={styles.tagContainer}>
          {item.tags.slice(0, 2).map((tag: string, index: number) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: "hidden",
    marginBottom: 4, // spacing adjustment
  },
  thumbnail: {
    width: "100%",
    height: 140,
    backgroundColor: "#222",
  },
  content: {
    padding: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)', // Transparan Accent
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  tagText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "600",
  }
});