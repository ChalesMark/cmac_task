import { StyleSheet } from "react-native";

export const Colors = {
  PrimaryColor: "#234099",

  Background: "#e9ebf0",
  backgroundColor_darker: "#d0d2d6",

  TextColor: "#384545",

  TaskGroup: "#416091",

  TaskHigh: "#e8392c",
  TaskMedium: "#b4db25",
  TaskLow: "#23c4af",

  ProgressBar_back: "#dbdbdb",
  ProgressBar_front: "#33a8d6",
  ProgressBar_gold: "#ffbb29",
  ProgressBar_goldDark: "#91490f",

  Done: "#ffbb29",
  NotDone: "#473e31",

  GroupRed: "#e83613",
  GroupYellow: "#cf9b00",
  GroupOrange: "#e87a13",
  GroupGreen: "#7ec211",
  GroupBlue: "#11b3c2",

  GroupRed_darker: "#c2b5b2",
  GroupYellow_darker: "#c2c2b2",
  GroupOrange_darker: "#c2bcb2",
  GroupGreen_darker: "#b6c2b2",
  GroupBlue_darker: "#b2bfc2",
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    alignItems: "center",
    justifyContent: "center",
  },

  Task_High: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 5,

    backgroundColor: Colors.TaskHigh,
  },
  Task_Medium: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 5,

    backgroundColor: Colors.TaskMedium,
  },
  Task_Low: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 5,

    backgroundColor: Colors.TaskLow,
  },

  taskIconSmall: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 5,
  },

  TextInput: {
    width: "100%",
    margin: 10,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
});
