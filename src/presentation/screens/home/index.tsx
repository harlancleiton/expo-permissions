import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";

import { CreatePortfolioContext } from "../../../domain";
import { PromiseStatus } from "../../hooks";
import useAsyncEither from "../../hooks/async-either/hook";
import { HomeProps } from "./types";

export function Home(props: HomeProps) {
  const { createPortfolio, portfolios } = props;

  console.log("🚀 ~ Home ~ portfolios", portfolios, portfolios.length);

  const [state, handleCreatePortfolio] = useAsyncEither(
    () =>
      createPortfolio.handle(
        CreatePortfolioContext.create({ title: "Lorem Ipsum" })
      ),
    [createPortfolio]
  );

  console.log("🚀 ~ Home ~ state", state);

  const { status } = state;

  function renderComponent() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <TouchableOpacity onPress={handleCreatePortfolio}>
          <Text>Criar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  switch (status) {
    case PromiseStatus.IDLE:
      return renderComponent();
    case PromiseStatus.PENDING:
      return <Text>Carregando...</Text>; // <Loading />
    case PromiseStatus.SUCCESS:
      return renderComponent(); // <Success />
    case PromiseStatus.ERROR:
      return <Text>Erro</Text>; // <Error />
    default:
      renderComponent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
