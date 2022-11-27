import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import {
  createPortfolio,
  portfoliosSelector,
  useAppDispatch,
  useAppSelector,
} from "../../main/store";

export function Home() {
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(portfoliosSelector);
  console.log("🚀 ~ Home ~ portfolios", portfolios);

  React.useEffect(() => {
    dispatch(createPortfolio({ title: "Lorem Ipsum" }));

    setTimeout(() => {
      dispatch(createPortfolio({ title: "Odeio Postman" }));
    }, 2_000);

    setTimeout(() => {
      dispatch(createPortfolio({ title: "Odeio C#" }));
    }, 5_000);
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
