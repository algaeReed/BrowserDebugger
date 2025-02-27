import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

export default function WebViewConfigScreen() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [protocol, setProtocol] = useState("http://");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage_webview_uri = await AsyncStorage.getItem(
          "@storage_webview_uri"
        );

        if (storage_webview_uri !== null) {
          setInputValue(
            storage_webview_uri.replace(/^(http:\/\/|https:\/\/)/, "")
          );
          setProtocol(
            storage_webview_uri.startsWith("https://") ? "https://" : "http://"
          );
        }
      } catch (e) {
        console.error("Failed to fetch value:", e);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (text: React.SetStateAction<string>) => {
    setInputValue(text);
  };

  const validateInput = (text: string) => {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)+)$/;
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    return domainRegex.test(text) || ipRegex.test(text);
  };

  const handleSave = async () => {
    const fullUrl = `${protocol}${inputValue}`;
    if (validateInput(inputValue)) {
      try {
        await AsyncStorage.setItem("@storage_webview_uri", fullUrl);
        Alert.alert(
          "Success",
          "Save success! 🚀",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                router.back();
              },
            },
          ],
          { cancelable: false } // 使弹窗不可通过点击外部关闭
        );
        console.log("Value saved:", fullUrl);
      } catch (e) {
        console.error("Failed to save value:", e);
      }
    } else if (inputValue == "") {
      await AsyncStorage.removeItem("@storage_webview_uri");
      ToastAndroid.show("remove", ToastAndroid.SHORT);
      router.back();
    } else {
      Alert.alert(
        "Invalid input. Please enter a valid domain name or IP address."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={styles.innerContainer}>
        <View style={styles.inputRow}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setProtocol(value)}
              items={[
                { label: "https://", value: "https://" },
                { label: "http://", value: "http://" },
                { label: "None", value: "" },
              ]}
              value={protocol}
              style={pickerSelectStyles}
            />
          </View>
          <TextInput
            placeholder="请配置首页地址"
            label="Enter Value"
            value={inputValue}
            onChangeText={handleInputChange}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="close"
                onPress={() => {
                  setInputValue("");
                }}
              />
            }
            style={styles.input}
          />
        </View>
        <Text
          variant="bodyLarge"
          style={{
            marginBottom: "auto",
          }}
        >
          {protocol}
          {inputValue}
        </Text>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Save
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 2,
    marginRight: 10,
    borderRadius: 8,
    borderColor: "#cccccc",
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    flex: 3,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#6200ee",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#f0f0f0",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#f0f0f0",
  },
};
