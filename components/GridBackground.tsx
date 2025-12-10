import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function GridBackground({ children }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.grid} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    borderColor: COLORS.gridLine,
    borderWidth: 0.4,
    borderStyle: "dotted",
  },
});
