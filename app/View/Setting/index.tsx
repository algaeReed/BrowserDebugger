import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { Avatar, Card, IconButton } from "react-native-paper";

export default function SettingCard() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Setting</ThemedText>
      </ThemedView>

      <Card
        onPress={() => {
          router.push("/View/ConfigScreen/WebViewConfigScreen");
        }}
      >
        <Card.Title
          title="WebView"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </Card>

      <Card
        onPress={() => {
          router.push("/View/ConfigScreen/VConsoleConfigScreen");
        }}
      >
        <Card.Title
          title="vConsole"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </Card>

      <Card
        onPress={() => {
          router.push("/View/ConfigScreen/LocalStorageConfigScreen");
        }}
      >
        <Card.Title
          title="localStorage"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </Card>
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
