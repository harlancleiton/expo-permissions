import "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { StatusBar } from "expo-status-bar";

import { Routes } from "./src/main/routes";
import { store } from "./src/main/store/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ReduxProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
