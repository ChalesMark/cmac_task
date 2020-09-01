import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Colors, Styles } from "./GlobalStyles";

export default function ProgressBar(props) {
  return (
    <View
      style={{
        width: props.width,
        height: 20,
        backgroundColor: Colors.ProgressBar_back,
        borderRadius: 50,
      }}
    >
      {props.progress === null ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            There are no tasks assigned
          </Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: props.progress,
            height: 20,
            backgroundColor:
              props.progress != "100%"
                ? Colors.ProgressBar_front
                : Colors.ProgressBar_gold,
            borderRadius: 50,
          }}
        ></View>
      )}
    </View>
  );
}
