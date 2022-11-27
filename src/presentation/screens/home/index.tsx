import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { HomeProps } from "./types";

export function Home(props: HomeProps) {
  const { createPortfolio, portfolios } = props;

  console.log("🚀 ~ Home ~ portfolios", portfolios);

  React.useEffect(() => {
    createPortfolio.execute({
      title: "Lorem Ipsum",
    });
  }, [createPortfolio]);

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
