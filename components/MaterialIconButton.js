import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialIconButton(props) {
  
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Icon name={props.iconName} style={styles.icon} ></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(242,19,19,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 5,
    minWidth: 40,
    minHeight: 40
  },
  icon: {
    color: "#fff",
    fontSize: 32,
    alignSelf: "center"
  }
});

export default MaterialIconButton;
