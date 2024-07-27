import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function App() {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("@storage_Key");
        if (value !== null) {
          setInputValue(value); // 设置从 AsyncStorage 读取的值
        }
      } catch (e) {
        console.error("Failed to fetch value:", e);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text); // 更新状态
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("@storage_Key", inputValue);
      Alert.alert("save success ! 🚀");
      console.log("Value saved:", inputValue);
    } catch (e) {
      console.error("Failed to save value:", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Enter Value"
            value={inputValue}
            onChangeText={handleInputChange}
            mode="outlined"
            style={styles.input}
          />
        </View>
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
    backgroundColor: "#f5f5f5", // 背景色
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between", // 在顶部和底部之间留空间
    padding: 20,
  },
  inputContainer: {
    // 可以添加额外的样式或边距
  },
  input: {
    marginBottom: 20, // 输入框下边距
  },
  buttonContainer: {
    // 确保按钮在底部
    marginBottom: 20, // 按钮与底部的距离
  },
  button: {
    // 可以添加按钮的样式
  },
});
