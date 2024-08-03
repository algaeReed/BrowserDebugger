import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { WebView } from "react-native-webview";
import { Error_loading_content, No_URL_found, VCONSOLE_SCRIPT } from "./script";

export default function WebViewScreen() {
  const [url, setUrl] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  const [isDebuggerOn, setIsDebuggerOn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      console.log("test");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Alert.alert("focused");
      fetchUrl();
      fetch_vConsole_status();
      return () => {};
    }, [])
  );

  const fetch_vConsole_status = async () => {
    if (!url) return;
    try {
      const storage_vConsole_status = await AsyncStorage.getItem(
        "@storage_vConsole_status"
      );
      console.log("storage_vConsole_status_success", storage_vConsole_status);

      ToastAndroid.show(
        "storage_vConsole_status_success  successfully!",
        ToastAndroid.SHORT
      );

      setIsDebuggerOn(storage_vConsole_status === "true");
    } catch (error) {
      console.log("storage_vConsole_status_error", error);
    }
  };
  const fetchUrl = async () => {
    try {
      console.log("fetchUrl");
      const value = await AsyncStorage.getItem("@storage_webview_uri");
      console.log("value", value);
      if (value !== null) {
        setUrl(value);
      } else {
        setUrl(null);
        setHtmlContent(No_URL_found);
      }
    } catch (e) {
      console.error("Failed to fetch URL:", e);
      setHtmlContent(Error_loading_content);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <WebView
        source={url ? { uri: url } : { html: htmlContent }}
        onError={(e) => console.log("Error loading URL:", e)}
        style={{ flex: 1 }}
        injectedJavaScript={isDebuggerOn ? VCONSOLE_SCRIPT : ""}
        onMessage={(event) => {
          console.log(event);
          if (event.nativeEvent.data === "refresh") {
            fetchUrl();
          } else if (event.nativeEvent.data === "VCONSOLE_SCRIPT") {
            ToastAndroid.show("debugger  successfully!", ToastAndroid.SHORT);
          } else if (event.nativeEvent.data === "setting") {
            router.push("/View/ConfigScreen/WebViewConfigScreen");
          }
        }}
        // renderError={(e) => {
        //   if (e === "WebKitErrorDomain") {
        //     return;
        //   }
        // }}
        renderError={(e) => {
          return <></>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
