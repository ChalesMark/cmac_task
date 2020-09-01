import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Styles } from "./GlobalStyles";

import Navi from "./Navi";

export default function App() {
  return (
    <NavigationContainer>
      <Navi />
    </NavigationContainer>
  );
}
