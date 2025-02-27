import { StyleSheet } from "react-native";

import SettingCard from "@/app/View/Setting";

export default function TabSettingScreen() {
  return <SettingCard />;
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
