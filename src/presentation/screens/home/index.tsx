import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";

import { CreatePortfolioContext } from "../../../domain";
import { HomeProps } from "./types";

export function Home(props: HomeProps) {
  const { baseRequest, portfolios } = props;

  console.log("🚀 ~ Home ~ portfolios", portfolios);

  async function handleAddPortfolio() {
    const response = await baseRequest.handle(
      CreatePortfolioContext.create({ title: "Lorem Ipsum" })
    );

    console.log("🚀 ~ Home ~ response", response.value);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity onPress={handleAddPortfolio}>
        <Text>Criar</Text>
      </TouchableOpacity>
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
