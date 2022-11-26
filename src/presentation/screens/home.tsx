import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { MockedCreatePortfolio } from "../../domain";

export function Home() {
  React.useEffect(() => {
    console.log("logging from Home screen");

    (async () => {
      const createPortfolio = new MockedCreatePortfolio();

      const response = await createPortfolio.execute({ title: "Lorem Ipsum" });
      console.log(response.isLeft(), response.isRight(), response.value);
    })();
  }, []);

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
