import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useAppDispatch } from "../hooks";
import { createPortfolio } from "../../main/store";

export function Home() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(createPortfolio({ title: "Lorem Ipsum" }));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
