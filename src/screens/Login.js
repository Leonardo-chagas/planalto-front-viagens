import React, { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.View`
  width: 90%;
`;

const InputView = styled.View`
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  padding: 5px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  width: 100%;  
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const SenhaText = styled.Text`
  color: #A4A4A4;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const CadastroText = styled.Text`
  color: #2E9AFE;
  font-size: 24px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
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

export default function Login({navigation, route}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const aguardarLogin = async () => {
    if (password != '' && username != '') {
      //alert("Informações preenchidas: "+username+" - "+password)
      const req = await fetch('http://34.207.157.190:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          //username: username,
          email: username,
          password: password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
      });
      const json = await req.json();
      console.log(json.access_token);

      if(json.success == true){
        // DataHandler.token = json.access_token
        route.params.dataHandler.setAccessToken(json.access_token);
        route.params.dataHandler.setRefreshToken(json.refresh_token);
        route.params.dataHandler.setUserID(json.user.id);
        navigation.navigate('Pesquisa de Viagens');
       } else {
        alert('Login Negado - ' + json.message);
      } 

    } else {
      alert('Preencha as informações!')
    }
  }

  const recuperarSenha = async () => {
    if (username != '') {
      const req = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: "user_7y9VMeaz4iNRQdQIccT2U",
          service_id: "service_4thk73p",
          template_id: "template_jkts312",
          accessToken: "610abaf7b813d67ee86184209b5c700e",
          template_params: {
            e_mail: username,
            password: "teste"
          }
        })
      });
      
      console.log(req);

      if(req.status == 200){
        alert('Email com nova senha enviado!')
      } else {
        alert('Erro envio do e-mail')        
      } 
    } else {
      alert('Preencha o e-mail!')
    }
  }
  
  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
        <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Login</HeaderText>
      </Header>
      <Container>
        <Image source={require('../images/logo.png')} style={{height: 60, width: 370, marginBottom: 20}} />
        <InputView>
          <Input value={username} onChangeText={t=>setUsername(t)} placeholder={'E-mail/CPF/CNPJ'}/>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha'}></Input>
        </InputView>
        <Button onPress={aguardarLogin}>
          <LoginText>Fazer Login</LoginText>
        </Button>
        <Button onPress={recuperarSenha}>
          <SenhaText>Esqueceu a senha?</SenhaText>
        </Button>
        <Button onPress={() => navigation.navigate('Cadastro')}>
          <CadastroText>CADASTRE-SE AQUI</CadastroText>
        </Button>
      </Container>
    </Page>
  );
}