import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../../presentation/";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
