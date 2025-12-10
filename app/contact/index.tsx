import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GridBackground from "../../components/GridBackground";
import SectionHeader from "../../components/SectionHeader";
import { COLORS } from "../../constants/colors";

export default function Contact() {
  return (
    <GridBackground>
      <View style={styles.container}>
        <SectionHeader title="Contact" subtitle="Let&apos;s build something together" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="you@domain.com" placeholderTextColor="rgba(255,255,255,0.2)" />

        <Text style={styles.label}>Message</Text>
        <TextInput style={[styles.input, { height: 120 }]} placeholder="Hello..." placeholderTextColor="rgba(255,255,255,0.2)" multiline />
      </View>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { color: COLORS.textSecondary, marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    color: COLORS.textPrimary,
  },
});
