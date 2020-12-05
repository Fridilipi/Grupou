import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text, Image, ActivityIndicator } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Texto,
  CaixaLogin,
  Botao,
  BotaoTexto,
  ContainerBotoes,
  Input,
  InputTexto,
  ContainerButtons,
  Button,
  ButtonText,
  ForgotPassword,
  Logo,
  CaixaTextoChamada,
  TextoChamada,
  TextoGrupou,
} from "./styles";

import logoImg from "../../assets/logo.png";

import { UsuarioContext } from "../../contexts/user";

const Login = () => {
  const { signIn, signUp } = useContext(UsuarioContext);

  const [currentButton, setCurrentButton] = useState("aluno");
  const [email, setEmail] = useState("felippesouza97@outlook.com");
  const [carregando, setCarregando] = useState(false);
  const [password, setPassword] = useState("#Teste12");

  useEffect(() => {
    this.checkDeviceForHardware();
  });

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      let result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        var email;
        var password;
        await AsyncStorage.getItem("emailLogin").then(
          (response) => (email = response)
        );
        await AsyncStorage.getItem("passwordLogin").then(
          (response) => (password = response)
        );
        if (email == null || password == null) {
          alert("Digite seu usuário e senha para autenticar sua biometria.");
        } else {
          signIn(email, password);
        }
      } else {
        alert("Autenticação cancelada");
      }
    } else {
      alert("Current device does not have the necessary hardware!");
    }
  };

  function handleSignIn() {
    try {
      signIn(email, password);
    } catch (err) {
      console.warn(err);
    }
  }

  function handleSignUp() {
    // console.warn(email, password);
    setCarregando(true);

    try {
      signUp(email, password);
    } catch (err) {
      console.warn(err);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Container>
      <Logo>
        <Image source={logoImg} style={{ width: 300, height: 100 }} />
      </Logo>

      <CaixaTextoChamada>
        <TextoChamada>Problemas para formar</TextoChamada>
        <TextoChamada>um grupo de trabalho</TextoChamada>
        <TextoChamada>
          O <TextoGrupou>Grupou! </TextoGrupou>resolve!
        </TextoChamada>
      </CaixaTextoChamada>

      <CaixaLogin>
        <ScrollView>
          <ContainerBotoes>
            <Botao
              onPress={() => {
                setCurrentButton("aluno");
              }}
              lastClick={currentButton == "aluno" ? true : false}
            >
              <BotaoTexto lastClick={currentButton == "aluno" ? true : false}>
                Aluno
              </BotaoTexto>
            </Botao>
            <Botao
              onPress={() => {
                setCurrentButton("professor");
              }}
              lastClick={currentButton == "professor" ? true : false}
            >
              <BotaoTexto
                lastClick={currentButton == "professor" ? true : false}
              >
                Professor
              </BotaoTexto>
            </Botao>
          </ContainerBotoes>
          <InputTexto>Email</InputTexto>
          <Input
            placeholder="Digite seu email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <InputTexto>Senha</InputTexto>
          <Input
            placeholder="Digite sua senha"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <ForgotPassword>esqueci minha senha</ForgotPassword>
          <ContainerButtons>
            <Button
              invert={true}
              onPress={() => {
                handleSignUp();
              }}
            >
              {carregando ? (
                <ActivityIndicator color="#AE1B73" />
              ) : (
                <ButtonText invert={true}>Cadastre-se</ButtonText>
              )}
            </Button>
            <Button
              onPress={() => {
                handleSignIn();
              }}
            >
              <ButtonText>Entrar</ButtonText>
            </Button>
          </ContainerButtons>
        </ScrollView>
      </CaixaLogin>
    </Container>
  );
};

export default Login;
