import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  return (
    <WebView
      source={{ uri: "https://reactnative.dev/" }}
      onError={(e) => {
        console.log("err__", e);
      }}
      style={{ flex: 1, backgroundColor: "orange" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
