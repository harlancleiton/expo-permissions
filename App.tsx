import "react-native-get-random-values";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
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
