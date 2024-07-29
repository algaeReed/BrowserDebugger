import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useShake from "@/hooks/useShake";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabVisible = useShake();
  const [tabBarStyle, setTabBarStyle] = useState({ display: "flex" });

  useEffect(() => {
    setTabBarStyle({ display: tabVisible ? "none" : "flex" });
  }, [tabVisible]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
