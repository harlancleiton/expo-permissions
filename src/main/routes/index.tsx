import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { left, right } from "../../domain";
import { PromiseStatus, useAsyncEither } from "../../presentation";
import { MakeHomeScreen } from "../factories";
import { getPermissions, useAppDispatch } from "../store";

const Stack = createNativeStackNavigator();

export function Routes() {
  const dispatch = useAppDispatch();

  const [state, doGetPermissions] = useAsyncEither(() => {
    return dispatch(getPermissions()).unwrap().then(right).catch(left);
  }, [dispatch]);

  React.useEffect(() => {
    doGetPermissions();
  }, [doGetPermissions]);

  const { status } = state;

  switch (status) {
    case PromiseStatus.SUCCESS:
      return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MakeHomeScreen} />
        </Stack.Navigator>
      );
    default:
      return null;
  }
}
