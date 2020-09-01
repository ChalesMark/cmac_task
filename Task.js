import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors, Styles } from "./GlobalStyles";
import Moment from "moment";

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

export default function Task(props) {
  var moment = require("moment");

  return (
    <TouchableOpacity
      onPress={props.ToggleDone}
      activeOpacity={0.5}
      style={
        props.importance === 0
          ? Styles.Task_High
          : props.importance === 1
          ? Styles.Task_Medium
          : Styles.Task_Low
      }
    >
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {props.done ? (
          <IconMCI name={"star-circle"} color={Colors.Done} size={25} />
        ) : (
          <IconMCI name={"circle"} color={Colors.NotDone} size={25} />
        )}
        <View style={{ flexDirection: "column", width: "60%", marginLeft: 20 }}>
          <Text
            style={{
              color: Colors.TextColor,
              fontSize: 32,
              fontFamily: "sans-serif-condensed",
            }}
          >
            {props.taskName}
          </Text>
          <Text
            style={{
              color: Colors.TextColor,
              fontFamily: "sans-serif-condensed",
            }}
          >
            {moment(props.startDate).fromNow()}
          </Text>
        </View>
      </View>
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
          <IconMCI
            name={"trash-can-outline"}
            color={Colors.TextColor}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
