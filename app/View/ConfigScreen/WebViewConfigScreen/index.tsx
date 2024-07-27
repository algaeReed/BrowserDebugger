import { StyleSheet, Text } from "react-native";

export default function WebViewConfigScreen() {
  return <Text>WebViewConfigScreen</Text>;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "orange",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
