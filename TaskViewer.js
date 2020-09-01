import React, { useEffect, useState } from "react";

import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Colors, Styles } from "./GlobalStyles";
import Moment from "moment";
import Task from "./Task";

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import ProgressBar from "./ProgressBar";
import CreateTask from "./CreateTask";

export default function TaskViewer(props) {
  const [Tasks, SetTasks] = useState([]);
  const [TaskGroupData, SetTaskGroupData] = useState({ name: "", tasks: [] });
  const [ModalOpen, SetModalOpen] = useState(false);

  var moment = require("moment");
  const importance = { HIGH: "High", MEDIUM: "Medium", LOW: "Low" };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      SetTaskGroupData(props.route.params.TaskGroupData);
      LoadData(props.route.params.TaskGroupData.tasks);
    });
    return unsubscribe;
  }, [props.navigation]);

  const ToggleDone = async (index, data, oldCompleted) => {
    Tasks[index].completed = !oldCompleted;
    //TaskGroupData.tasks[index].completed = !oldCompleted;
    AsyncStorage.setItem(
      data.key,
      JSON.stringify({
        key: data.key,
        name: data.name,
        group: data.group,
        startDate: data.startDate,
        completed: !oldCompleted,
        importance: data.importance,
      })
    );
    LoadData(null);
  };

  const DeleteTask = async (i, key) => {
    // NOTE: this variable is used for the progress bar
    let newTaskArray = TaskGroupData.tasks.filter(
      (data, index, arr) => index != i
    );

    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      alert("There was an issue loading local data : " + e);
    }
    LoadData(null);
  };

  const GetProgress = (taskArray) => {
    var doneTasks = undefined;
    doneTasks = taskArray.filter((e) => e.completed === true);

    if (Tasks.length === 0) return "0%";

    return doneTasks !== undefined
      ? (doneTasks.length / taskArray.length) * 100 + "%"
      : "0%";
  };

  const CreateTaskData = async (e, i) => {
    if (Tasks.some((t) => t.name === e))
      alert("A task with that name already exists!");
    else {
      SetModalOpen(false);
      try {
        var data = JSON.stringify({
          key: "task_" + TaskGroupData.name + "_" + e,
          name: e,
          group: TaskGroupData.name,
          startDate: moment(),
          importance: i,
          completed: false,
        });
        await AsyncStorage.setItem(
          "task_" + TaskGroupData.name + "_" + e,
          data
        );
      } catch (e) {
        alert("There has been an error: " + e);
      }
      LoadData(null);
    }
  };

  const LoadData = async (taskSeed) => {
    var tempTasks = [];
    var keys = [];

    try {
      // Get the keys
      var keys = await AsyncStorage.getAllKeys();
      if (taskSeed === null) {
        // Load data that is a task, and the group name matches current group
        await Promise.all(
          keys.map(async (element) => {
            if (element.split("_")[0] === "task") {
              var d = JSON.parse(await AsyncStorage.getItem(element));
              if (TaskGroupData.name.localeCompare(d.group) === 0)
                tempTasks.push(d);
            }
          })
        );
      } else {
        await Promise.all(
          taskSeed.map(async (element) => {
            tempTasks.push(element);
          })
        );
      }
      tempTasks.sort((a, b) =>
        a.importance > b.importance ? 1 : b.importance > a.importance ? -1 : 0
      );
      SetTasks(tempTasks);
    } catch (e) {
      alert("There was an issue loading local data : " + e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",

        backgroundColor: TaskGroupData.color,
        alignContent: "center",
        paddingTop: 30,
      }}
    >
      <CreateTask
        visible={ModalOpen}
        CloseModal={() => SetModalOpen(false)}
        Create={(e, i) => CreateTaskData(e, i)}
      />
      <View
        style={{
          width: "90%",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <IconMCI name={"keyboard-backspace"} color="black" size={32} />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 32, fontFamily: "sans-serif-condensed" }}>
            {TaskGroupData.name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => SetModalOpen(true)}>
          <IconMCI name={"plus"} color="black" size={32} />
        </TouchableOpacity>
      </View>
      <ProgressBar progress={GetProgress(Tasks)} width={"90%"} />
      <ScrollView
        style={{
          width: "100%",
          marginTop: 20,
          paddingTop: 5,
          backgroundColor:
            TaskGroupData.color === Colors.GroupRed
              ? Colors.GroupRed_darker
              : TaskGroupData.color === Colors.GroupOrange
              ? Colors.GroupOrange_darker
              : TaskGroupData.color === Colors.GroupYellow
              ? Colors.GroupYellow_darker
              : TaskGroupData.color === Colors.GroupGreen
              ? Colors.GroupGreen_darker
              : Colors.GroupBlue_darker,
        }}
      >
        {Tasks.length === 0 ? (
          <View
            style={{
              paddingTop: 50,
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                color: Colors.TextColor,
                fontSize: 24,
                fontFamily: "sans-serif-condensed",
              }}
            >
              Now that you have a group, let us add some tasks!
            </Text>
            <Text
              style={{
                color: Colors.TextColor,
                fontSize: 24,
                fontFamily: "sans-serif-condensed",
              }}
            >
              Click the + at the top right to get started!
            </Text>
          </View>
        ) : (
          Tasks.map((data, index) => (
            <Task
              key={index}
              taskName={data.name}
              importance={data.importance}
              startDate={data.startDate}
              done={data.completed}
              Delete={() =>
                Alert.alert(
                  "Delete Task",
                  "Are you sure you want to delete this task?",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    { text: "Yes", onPress: () => DeleteTask(index, data.key) },
                  ],
                  { cancelable: false }
                )
              }
              ToggleDone={() => ToggleDone(index, data, data.completed)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
