import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const [url, setUrl] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setUrl(value);
      } else {
        setHtmlContent(`
          <html>
            <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: lightgrey;">
              <div style="text-align: center;">
                <h1>No URL found</h1>
                <p>Please set a URL in the app settings.</p>
                <button onclick="window.ReactNativeWebView.postMessage('refresh');" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer;">
                  Refresh
                </button>
              </div>
            </body>
          </html>
        `);
      }
    } catch (e) {
      console.error("Failed to fetch URL:", e);
      setHtmlContent(`
        <html>
          <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: lightgrey;">
            <div style="text-align: center;">
              <h1>Error loading content</h1>
              <p>There was an error loading the content. Please try again later.</p>
              <button onclick="window.ReactNativeWebView.postMessage('refresh');" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer;">
                Refresh
              </button>
            </div>
          </body>
        </html>
      `);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={url ? { uri: url } : { html: htmlContent }}
        onError={(e) => console.log("Error loading URL:", e)}
        style={{ flex: 1 }}
        injectedJavaScript={`window.ReactNativeWebView.postMessage('loaded');`}
        onMessage={(event) => {
          if (event.nativeEvent.data === "refresh") {
            fetchUrl(); // 重新获取URL并更新
          }
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
