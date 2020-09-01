import React, { useEffect, useState } from "react";

import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { Colors, Styles } from "./GlobalStyles";
import Modal from "react-native-modal";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

export default function Options(props) {
  const [ModalOpen, SetModalOpen] = useState(false);

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
          flexDirection: "column",
          alignItems: "flex-start",
          alignContent: "center",
          padding: 20,
          borderRadius: 20,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          onPress={() => props.CloseModal()}
          style={{
            height: 50,
            width: "100%",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <IconMCI
            name={"keyboard-backspace"}
            color="black"
            size={25}
            style={{ margin: 20 }}
          />
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontFamily: "sans-serif-condensed",
            }}
          >
            Return
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Clear Data",
              "Are you sure you want to delete all groups and their tasks?",
              [
                {
                  text: "No",
                  style: "cancel",
                },
                { text: "Yes", onPress: () => props.DeleteAllData() },
              ],
              { cancelable: false }
            )
          }
          style={{
            height: 50,
            width: "100%",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <IconMCI
            name={"trash-can-outline"}
            color="black"
            size={25}
            style={{ margin: 20 }}
          />
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontFamily: "sans-serif-condensed",
            }}
          >
            Clear Data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "About",
              "cmac_task\nCharles Mark Colling\n2020\ncollingmark@gmail.com"
            )
          }
          style={{
            height: 50,
            width: "100%",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <IconMCI
            name={"information-variant"}
            color="black"
            size={25}
            style={{ margin: 20 }}
          />
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontFamily: "sans-serif-condensed",
            }}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
