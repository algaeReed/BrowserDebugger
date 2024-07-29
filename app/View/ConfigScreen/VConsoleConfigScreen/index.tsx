import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Switch } from "react-native-paper";

export default function VConsoleConfigScreen() {
  const [isDebuggerOn, setIsDebuggerOn] = useState(false);

  const onToggleSwitch = useCallback(async () => {
    const newStatus = !isDebuggerOn;
    console.log("status", newStatus);
    try {
      await AsyncStorage.setItem(
        "@storage_vConsole_status",
        JSON.stringify(newStatus)
      );
      setIsDebuggerOn(newStatus);
    } catch (e) {
      console.error("Failed to save status:", e);
    }
  }, [isDebuggerOn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage_vConsole_status = await AsyncStorage.getItem(
          "@storage_vConsole_status"
        );
        console.log("Fetched value", storage_vConsole_status);

        setIsDebuggerOn(storage_vConsole_status === "true");
      } catch (e) {
        console.error("Failed to fetch value:", e);
        setIsDebuggerOn(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Card>
        <Card.Title
          title="WebView Debugger"
          subtitle="based on vConsole"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={() => (
            <Switch value={isDebuggerOn} onValueChange={onToggleSwitch} />
          )}
        />
      </Card>
      {/* <Text>{JSON.stringify(isDebuggerOn)}</Text> */}
    </ParallaxScrollView>
  );
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
