import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "start"; // Opsi baru untuk alignment
}

export default function SectionHeader({
  title,
  subtitle,
  align = "start",
}: SectionHeaderProps): React.ReactElement {
  
  const isCenter = align === "center";

  return (
    <View style={[styles.wrap, isCenter && styles.centerWrap]}>
      <Text style={[styles.title, isCenter && styles.centerText]}>{title}</Text>
      
      {subtitle && (
        <Text style={[styles.subtitle, isCenter && styles.centerText]}>
          {subtitle}
        </Text>
      )}

      {/* Decorative Underline */}
      <View style={[styles.underline, isCenter && styles.centerUnderline]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    marginBottom: 32,
    width: '100%',
  },
  centerWrap: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32, // Lebih besar agar stand out
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  underline: {
    marginTop: 12,
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    
    // Neon glow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  centerUnderline: {
    alignSelf: 'center',
  }
});