import { View, FlatList, StyleSheet, Text } from "react-native";
import GridBackground from "../../components/GridBackground";
import ProjectCard from "../../components/ProjectCard";
import { PROJECTS } from "../../constants/data";
import { COLORS } from "../../constants/colors";

export default function ProjectScreen() {
  return (
    <GridBackground>
      <FlatList
        data={PROJECTS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        
        // Style adjustments
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 16, gap: 12, paddingTop: 60 }}
        
        // Header Component
        ListHeaderComponent={() => (
           <View style={{ marginBottom: 20 }}>
             <Text style={styles.headerTitle}>Featured Work</Text>
             <Text style={styles.headerSubtitle}>Selected projects & experiments</Text>
           </View>
        )}
        
        renderItem={({ item }) => <ProjectCard item={item} />}
      />
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  }
});