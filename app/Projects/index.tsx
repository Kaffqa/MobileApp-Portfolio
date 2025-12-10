import { View, FlatList, StyleSheet } from "react-native";
import GridBackground from "../../components/GridBackground";
import ProjectCard from "../../components/ProjectCard";
import { PROJECTS } from "../../constants/data";

export default function ProjectScreen() {
  return (
    <GridBackground>
      <View style={styles.container}>
        <FlatList
          data={PROJECTS}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => <ProjectCard item={item} />}
        />
      </View>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
