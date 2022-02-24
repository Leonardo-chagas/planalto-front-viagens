import { StackActions } from '@react-navigation/routers';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  align-items: flex-start;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 15%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const SearchDropdown = styled.View`
  flex-wrap: wrap;
  margin-horizontal: 20px;
`;

const BackButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
  margin-top: 13px;
  align-items: center;
`;

const Item = styled.Text`
  padding-left: 15px;
  font-size: 20px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #A4A4A4;
`;

const ItemArea = styled.TouchableHighlight`
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  margin-left: 25px;
  width: 85%;
  margin-top: 15px;
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

export default function Confirmar({navigation, route}) {

  const [origem] = useState(route.params.trip.origin.name);
  const [destino] = useState(route.params.trip.destination.name);
  const [data] = useState(route.params.trip.tripdate);
  const [assento] = useState(route.params.dataHandler.getAssento());

  const formatarData = (data) => {
    let d = new Date (data);
    return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
  }

  const formatarHora = (data) => {
    let d = new Date (data);
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
  }

  const Confirmar = async () => {

    if (route.params.dataHandler.getAccessToken() !== "") {
      try {
        const requestToken = await fetch('http://34.207.157.190:5000/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: route.params.dataHandler.getRefreshToken()
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        
        const responseToken = await requestToken.json();
        
        route.params.dataHandler.setAccessToken(responseToken.access_token);
        route.params.dataHandler.setRefreshToken(responseToken.refresh_token);
        
        console.log(route.params.dataHandler.getAccessToken());
        console.log(route.params.dataHandler.getViagemID());
        console.log(route.params.dataHandler.getAssentoID());

        console.log("Entrei aqui")
        const req = await fetch('http://34.207.157.190:5000/reservation', {
          method: 'POST',
          body: JSON.stringify({
            access_token: route.params.dataHandler.getAccessToken(),
            trip_id: route.params.dataHandler.getViagemID(),
            seat_id: route.params.dataHandler.getAssentoID()
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        console.log("Entrei aqui")

        console.log(req);
        
        const json = await req.json();
  
        console.log(json);
  
        if(json.success == true){
          Alert.alert('Aviso','Reserva Confirmada');
          navigation.navigate('Pesquisa de Viagens', {dataHandler: route.params.dataHandler})
        } else {
          Alert.alert('Aviso','Erro ao reservar - ' + json.message);
        }
      } catch (error) {
        Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
        console.log(error);
      }
    } else {
      Alert.alert('Aviso','Para confirmar a reservar você precisa realizar o login!');
      navigation.navigate('Login', {dataHandler: route.params.dataHandler, trip: route.params.trip, isBuying: true});
    }
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Confirmação de Reserva</HeaderText>
      </Header>
        <SearchDropdownArea>
          <SearchDropdown>
            <ItemArea>
              <View>
                <Item>Origem: {origem}</Item>
                <Item>Destino: {destino}</Item>
                <Item>Data: {formatarData(data)}</Item>
                <Item>Hora: {formatarHora(data)}</Item>
                <Item>Assento: {assento}</Item>
              </View>
            </ItemArea>
            <Button onPress={() => Confirmar()}>
              <LoginText>Confirmar</LoginText>
            </Button>
          </SearchDropdown>
        </SearchDropdownArea>
    </Page>
  );
}