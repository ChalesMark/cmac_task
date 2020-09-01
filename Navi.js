import React, { useState } from "react";

import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import TaskViewer from "./TaskViewer";
import GroupViewer from "./GroupViewer";
import CreateTask from "./CreateTask";

const Stack = createStackNavigator();

export default function Navi() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={GroupViewer} />
      <Stack.Screen name="Tasks" component={TaskViewer} />
      <Stack.Screen name="Create" component={CreateTask} />
    </Stack.Navigator>
  );
}
