import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";

import {
  CreatePortfolioContext,
  ExecuteAction,
  PermissionOperation,
  RecurrenceExecute,
  Right,
} from "../../../domain";
import { PromiseStatus, useCanExecute } from "../../hooks";
import useAsyncEither from "../../hooks/async-either/hook";
import { HomeProps } from "./types";

export function Home(props: HomeProps) {
  const { createPortfolio, portfolios } = props;

  const recurrenceExecute = useCanExecute(
    ExecuteAction.create({
      action: "create_portfolio",
      operation: PermissionOperation.CREATE,
      resource: "portfolio",
    }).value as ExecuteAction
  );

  const [state, handleCreatePortfolio] = useAsyncEither(
    () =>
      createPortfolio.handle(
        CreatePortfolioContext.create({ title: "Lorem Ipsum" })
      ),
    [createPortfolio]
  );

  const { status } = state;

  function renderPermission() {
    if (recurrenceExecute.isLeft()) {
      const permissionDeny = recurrenceExecute.value;
      const { suggestiveActions } = permissionDeny;

      if (!suggestiveActions.length) {
        return <Text>Permission Deny!</Text>;
      }

      const suggestiveAction = suggestiveActions[0];

      return (
        <View>
          <Text>Permission Deny!</Text>
          <Text>{suggestiveAction.title}</Text>
          <Text>{suggestiveAction.message}</Text>
          <Text>{suggestiveAction.action}</Text>
        </View>
      );
    }

    const permissionAllow = (
      recurrenceExecute as Right<RecurrenceExecute, RecurrenceExecute>
    ).value;
    if (permissionAllow) {
      return <Text>Permission allowed!</Text>;
    }
  }

  function renderComponent() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Text>Você tem {portfolios.length} carteiras</Text>

        {renderPermission()}

        <TouchableOpacity style={styles.button} onPress={handleCreatePortfolio}>
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
      return renderComponent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    width: 120,
    backgroundColor: "#c9c9c9",
    padding: 20,
    alignItems: "center",
  },
});
