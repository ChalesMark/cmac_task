import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";

import { Colors, Styles } from "./GlobalStyles";

import Modal from "react-native-modal";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
const CreateTask = (props) => {
  const [TaskName, SetTaskName] = useState("");
  const [Importance, SetImportance] = useState(2);

  useEffect(() => {
    SetTaskName("");
  }, [props.visible]);

  return (
    <Modal
      avoidKeyboard={Platform.OS === "ios"}
      isVisible={props.visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
    >
      <View
        style={{
          padding: 20,
          borderRadius: 20,
          backgroundColor:
            Importance === 0
              ? Colors.TaskHigh
              : Importance === 1
              ? Colors.TaskMedium
              : Colors.TaskLow,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={Styles.TextInput}
          placeholder={"New Task Name"}
          value={TaskName}
          onChangeText={(e) => SetTaskName(e.split("_").join(""))}
        />

        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 90,
              height: 90,
              backgroundColor: Colors.TaskHigh,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetImportance(0)}
          >
            <Text style={{ fontSize: 32 }}>!!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 90,
              height: 90,
              backgroundColor: Colors.TaskMedium,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetImportance(1)}
          >
            <Text style={{ fontSize: 32 }}>!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 90,
              height: 90,
              backgroundColor: Colors.TaskLow,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetImportance(2)}
          >
            <Text style={{ fontSize: 32 }}>!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 3,
            width: "100%",
          }}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.CloseModal()}
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconMCI name={"keyboard-return"} color="black" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              TaskName === ""
                ? alert("Name can not be blank")
                : props.Create(TaskName, Importance)
            }
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconMCI name={"plus-circle"} color="black" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTask;
