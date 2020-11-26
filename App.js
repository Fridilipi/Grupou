import "react-native-gesture-handler";

import React from "react";
import { LogBox, StatusBar, StyleSheet } from "react-native";

import Routes from "./routes";

import { UsuarioProvider } from "./contexts/user";

import {} from "react-native";
import "./services/firebase";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <>
      <StatusBar backgroundColor="#AB1B71" />
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
