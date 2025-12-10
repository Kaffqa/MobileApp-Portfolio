import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps): React.ReactElement {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 18 },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 6,
    fontSize: 13,
  },
  underline: {
    marginTop: 10,
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    opacity: 0.9,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
