import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { Colors, Styles } from "./GlobalStyles";
import Moment from "moment";

import TaskGroup from "./TaskGroup";
import CreateGroup from "./CreateGroup";
import Options from "./Options";

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

export default function GroupViewer({ navigation, props }) {
  const [Groups, SetGroups] = useState([]);
  const [Tasks, SetTasks] = useState([]);

  const [ModalOpen, SetModalOpen] = useState(false);
  const [OptionsOpen, SetOptionsOpen] = useState(false);

  useEffect(() => {
    LoadData();
    const unsubscribe = navigation.addListener("focus", () => {
      LoadData();
    });
    return unsubscribe;
  }, [navigation]);

  const OpenTaskGroup = (i) => {
    navigation.navigate("Tasks", { TaskGroupData: Groups[i] });
  };

  const CreateGroupData = async (g, c, i) => {
    if (Groups.some((t) => t.name === g))
      alert("A group with that name already exists!");
    else {
      SetModalOpen(false);
      try {
        var data = JSON.stringify({
          name: g,
          color: c,
          icon: i,
          key: "group_" + g,
          tasks: [],
        });
        await AsyncStorage.setItem("group_" + g, data);
        LoadData();
      } catch (e) {
        alert("There has been an error: " + e);
      }
    }
  };

  const DeleteAllData = async () => {
    SetOptionsOpen(false);
    var keys = [];

    try {
      keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      alert("All data has been deleted.");
    } catch (e) {
      alert("There has been an error: " + e);
    }

    await LoadData();
  };

  const LoadData = async () => {
    var tempGroups = [];
    var tempTasks = [];
    try {
      // Get the keys
      var keys = await AsyncStorage.getAllKeys();

      if (keys.length !== 0) {
        // Off load the data
        await Promise.all(
          keys.map(async (element) => {
            const data = JSON.parse(await AsyncStorage.getItem(element));

            if (element.split("_")[0] === "group") tempGroups.push(data);
            else tempTasks.push(data);
          })
        );

        if (tempTasks.length !== 0) {
          // Sort the tasks to their groups
          await Promise.all(
            tempTasks.map(async (task) => {
              tempGroups.forEach(async (group, index) => {
                if (group !== null)
                  if (group.name.localeCompare(task.group) === 0)
                    group.tasks.push(task);
              });
            })
          );
        }
      }
    } catch (e) {
      alert("There was an issue loading local data : " + e);
    }
    SetGroups(tempGroups);
  };

  const DeleteGroup = async (data) => {
    try {
      // Then delete all tasks belonging to that group
      await Promise.all(
        data.tasks.map(async (task) => {
          if (task.group.localeCompare(data.name) == 0)
            await AsyncStorage.removeItem(task.key);
        })
      );

      // First, delete the actual group
      await AsyncStorage.removeItem(data.key);
    } catch (e) {
      alert("There was an issue deleting the group : " + e);
    }

    await LoadData();
  };

  const GetProgress = (taskArray) => {
    var doneTasks = undefined;

    doneTasks = taskArray.filter((e) => e.completed === true);

    return doneTasks !== undefined
      ? taskArray.length !== 0
        ? (doneTasks.length / taskArray.length) * 100 + "%"
        : "none"
      : "0%";
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Colors.Background,
        alignContent: "center",
        paddingTop: 30,
      }}
    >
      <CreateGroup
        visible={ModalOpen}
        CloseModal={() => SetModalOpen(false)}
        Create={(n, c, i) => CreateGroupData(n, c, i)}
      />
      <Options
        visible={OptionsOpen}
        CloseModal={() => SetOptionsOpen(false)}
        DeleteAllData={() => DeleteAllData()}
      />
      <View
        style={{
          marginTop: 10,
          width: "90%",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => SetOptionsOpen(true)}>
          <IconMCI name={"dots-horizontal"} color="black" size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => SetModalOpen(true)}>
          <IconMCI name={"plus"} color="black" size={32} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          width: "100%",
          marginTop: 10,
          paddingTop: 5,
          backgroundColor: Colors.backgroundColor_darker,
        }}
      >
        {Groups.length === 0 ? (
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
              Looks like you don't have any task groups set up!
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
          Groups.map((data, index) =>
            data !== null ? (
              <TaskGroup
                key={index}
                name={data.name}
                color={data.color}
                icon={data.icon}
                tasks={data.tasks}
                progress={GetProgress(data.tasks)}
                Delete={() =>
                  Alert.alert(
                    "Delete Group",
                    "Are you sure you want to delete this group?",
                    [
                      {
                        text: "No",
                        style: "cancel",
                      },
                      { text: "Yes", onPress: () => DeleteGroup(data) },
                    ],
                    { cancelable: false }
                  )
                }
                OpenTaskGroup={() => OpenTaskGroup(index)}
              />
            ) : null
          )
        )}
      </ScrollView>
    </View>
  );
}
