import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { MakeHomeScreen } from "../factories/screens/home";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MakeHomeScreen} />
    </Stack.Navigator>
  );
}
