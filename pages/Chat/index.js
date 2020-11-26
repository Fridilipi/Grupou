import React, { useState, useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { UsuarioContext } from "../../contexts/user";

import { Button, ButtonText } from "./styles";

import firebase from "firebase";
import "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useContext(UsuarioContext);

  const ListenUpdateMessages = (snap) => {
    const data = snap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    // console.log(data)
    setMessages(data);
  };

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection("mensagens")
      .onSnapshot(ListenUpdateMessages);

    return () => listener();
  }, []);

  const handleAddMessages = () => {
    if (newMessage == "") {
      console.warn("Preencha o campo");
      return;
    }

    try {
      firebase.firestore().collection("mensagens").add({
        texto: newMessage,
        lida: false,
      });
      setNewMessage("");
    } catch (err) {
      console.warn("erro de comunicação, tente mais tarde");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ab1b71", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          flex: 1,
          marginTop: 16,
          marginHorizontal: 16,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 16, paddingBottom: 16 }}>Tarefas</Text>
        <ScrollView style={{ flex: 1 }}>
          {messages.map((message) => (
            <View
              style={{
                backgroundColor: "#BBBBBB",
                borderRadius: 16,
                marginBottom: 8,
                padding: 16,
              }}
            >
              <Text key={message.id}>{message.texto}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          borderBottomColor: "#E3E3E3",
          borderBottomWidth: 1.25,
          marginHorizontal: 16,
          backgroundColor: "#FFFFFF",
          paddingVertical: 4,
        }}
      />
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#EEEEEE",
          flex: 0.5,
          padding: 16,
          marginBottom: 16,
          marginHorizontal: 16,
          borderBottomEndRadius: 16,
          borderBottomStartRadius: 16,
        }}
      >
        <TextInput
          style={{
            borderColor: "#CCCCCC",
            borderWidth: 1,
            flex: 1,
            borderRadius: 8,
            padding: 20,
            backgroundColor: "#FFFFFF",
            marginBottom: 16,
          }}
          placeholder="Digite sua mensagem"
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
        />

        <Button
          invert={false}
          onPress={() => {
            handleAddMessages();
          }}
        >
          <ButtonText invert={false}>Enviar</ButtonText>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
