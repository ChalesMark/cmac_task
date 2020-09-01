import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors, Styles } from "./GlobalStyles";

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressBar from "./ProgressBar";

export default function TaskGroup(props) {
  return (
    <TouchableOpacity
      onPress={props.OpenTaskGroup}
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        margin: 10,
        padding: 10,
        paddingTop: 0,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: props.color,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconMCI
        name={props.icon}
        color="black"
        size={50}
        style={{ margin: 10 }}
      />
      <View style={{ flexDirection: "column", width: "80%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 32,
              margin: 10,
              marginLeft: 0,
              fontFamily: "sans-serif-condensed",
            }}
          >
            {props.name}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={props.Delete}
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMCI name={"trash-can-outline"} color="black" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        {props.progress !== "none" ? (
          <ProgressBar progress={props.progress} width={"100%"} />
        ) : (
          <ProgressBar progress={null} width={"100%"} />
        )}
      </View>
    </TouchableOpacity>
  );
}
