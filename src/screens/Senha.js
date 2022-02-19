import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.ScrollView`
  width: 90%;
`;

const InputView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  padding-left: 10px;
  overflow: hidden;
`;

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
  overflow: hidden;
  padding: 0;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  flex: 1; 
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  align-items: flex-start;
  flex-direction: row;
`;//Area que contem o titulo da tela

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;//Titulo da tela

const BackButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
  margin-top: 13px;
  align-items: center;
`;

const Title = styled.View`
  width: 100%;
  background-color: #D8D8D8;
  height: 50px;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const TitleText = styled.Text`
  color: #848484;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

export default function Senha ({navigation, route}) {
  console.log(route.params.email)
  
  const [password, setPassword] = useState('');
  const [novapassword, setNovaPassword] = useState('');
  const [confirmapassword, setConfirmaPassword] = useState('');

  const atualizarSenha = async () =>{
    console.log("Vou atualizar!")
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
        <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Cadastro</HeaderText>
      </Header>
      <Title>
        <TitleText>Alterar Senha</TitleText>
      </Title>
      <Container>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha atual'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={novapassword} onChangeText={t=>setNovaPassword(t)} placeholder={'Nova senha'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={confirmapassword} onChangeText={t=>setConfirmaPassword(t)} placeholder={'Confirmação de nova senha'}></Input>
        </InputView>
        <Button onPress={atualizarSenha}>
          <LoginText>Atualizar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}