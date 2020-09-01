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
const CreateGroup = (props) => {
  const [GroupName, SetGroupName] = useState("");
  const [GroupColor, SetGroupColor] = useState(Colors.GroupBlue);
  const [GroupIcon, SetGroupIcon] = useState("clipboard-text-outline");

  useEffect(() => {
    SetGroupName("");
    SetGroupColor(Colors.GroupBlue);
    SetGroupIcon("clipboard-text-outline");
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
          backgroundColor: GroupColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconMCI name={GroupIcon} color="black" size={50} />
          <TextInput
            style={{
              width: "80%",
              margin: 10,
              borderColor: "gray",
              backgroundColor: "white",
              borderWidth: 1,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
            }}
            value={GroupName}
            onChangeText={(e) => SetGroupName(e.split("_").join(""))}
            placeholder={"New Group Name"}
          />
        </View>
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
              width: 50,
              backgroundColor: Colors.GroupRed,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetGroupColor(Colors.GroupRed)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 50,
              backgroundColor: Colors.GroupOrange,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetGroupColor(Colors.GroupOrange)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 50,
              backgroundColor: Colors.GroupYellow,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetGroupColor(Colors.GroupYellow)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 50,
              backgroundColor: Colors.GroupGreen,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetGroupColor(Colors.GroupGreen)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 50,
              backgroundColor: Colors.GroupBlue,
              borderWidth: 5,
              borderColor: "white",
              borderRadius: 50,
            }}
            onPress={() => SetGroupColor(Colors.GroupBlue)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 100,
              height: 100,
            }}
            onPress={() => SetGroupIcon("clipboard-text-outline")}
          >
            <IconMCI name={"clipboard-text-outline"} color="black" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 100,
              height: 100,
            }}
            onPress={() => SetGroupIcon("food-apple")}
          >
            <IconMCI name={"food-apple"} color="black" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 100,
              height: 100,
            }}
            onPress={() => SetGroupIcon("email")}
          >
            <IconMCI name={"email"} color="black" size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              width: 100,
              height: 100,
            }}
            onPress={() => SetGroupIcon("credit-card-outline")}
          >
            <IconMCI name={"credit-card-outline"} color="black" size={50} />
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
              GroupName === ""
                ? alert("Name can not be blank")
                : props.Create(GroupName, GroupColor, GroupIcon)
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

export default CreateGroup;
