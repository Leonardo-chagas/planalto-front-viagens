import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DataHandler from '../DataHandler';

//const dataHandler = new DataHandler();

const Stack = createNativeStackNavigator();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.View`
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

const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: '#A4A4A4',
}))`
  height: 40px;
  font-size: 18px;
  overflow: hidden;
  padding: 0;
  color: #424242;
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

const MenuButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
  margin-top: 13px;
  align-items: center;
`;

const Menu = styled.Modal`
  background-color: rgba(0, 0, 0, 0.3);
`;

const MenuBody = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Box = styled.View`
  width: 80%;
  height: 100%;
  background-color: white;
`;

const MenuItem = styled.TouchableHighlight`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #aaaaaa;
`;

const MenuItemText = styled.Text`
  position: absolute;
  margin-left: 60px;
  font-size: 20px;
  color: #aaaaaa;
`;

const Touchable = styled.TouchableOpacity``;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 300,
  }
});

export default function TrocarViagemForm({navigation, route}) {
  const [lastID] = useState(route.params.lastID);
  const [trip] = useState(route.params.trip);
  const [dataHandler] = useState(route.params.dataHandler);
  const dia = new Date().getDate();
  const mes = new Date().getMonth()+1;
  const ano = new Date().getFullYear();
  /* const numeroDia = Number(dia);
  const numeroMes */
  var mesReal = mes;
  var diaReal = dia;
  if(mes < 10)
    mesReal = '0' + mes;
  if(dia<10)
    diaReal = '0' + dia;
  
  const data = diaReal + '/' + mesReal + '/' + ano;

  var novoMes = Number(mes)+2;
  var novoAno = Number(ano);
  if(novoMes > 12){
    novoMes -= 12;
    novoAno += 1;
  }

  var ultimoMes;
  if(novoMes<10)
    ultimoMes = '0' + novoMes.toString();
  else
    ultimoMes = novoMes.toString();
  const ultimoAno = novoAno.toString();
  const ultimaData = '28/' + ultimoMes + '/' + ultimoAno;

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataIda, setDataIda] = useState(data);
  const [dataVolta, setDataVolta] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const Buscar = async () => {
    if (dataVolta !== "") {
      if(dataIda !== "") {
        try {
          const dataArray = dataIda.split('/');
          const dataCerta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];

          const reqTripIda = await fetch('http://34.207.157.190:5000/tripByDate', {
            method: 'POST',
            body: JSON.stringify({
              tripdate : dataCerta,
              origin_id: trip.origin_id,
              destination_id: trip.destination_id
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          });
          
          const responseTripIda = await reqTripIda.json();
          console.log(responseTripIda);
  
          if(responseTripIda.success) {

            console.log(responseTripIda.trips);

            const reqTripVolta = await fetch('http://34.207.157.190:5000/tripByDate', {
              method: 'POST',
              body: JSON.stringify({
                tripdate : dataCerta,
                origin_id: trip.destination_id,
                destination_id: trip.origin_id
              }),
              headers:{
                'Content-Type': 'application/json'
              }
            });
            
            const responseTripVolta = await reqTripVolta.json();
            console.log(responseTripVolta);
    
            if(responseTripVolta.success) {
    
              console.log(responseTripVolta.trips);
    
              navigation.navigate('Viagens', {viagensIda: responseTripIda.trips, viagensVolta: responseTripVolta, dataHandler: dataHandler})
            } else {
              console.log(responseTripVolta.message);
              Alert.alert('Aviso','Não foi encontrada nenhuma viagem de volta para esta data');
              navigation.navigate('Viagens', {viagensIda: responseTripIda.trips, viagensVolta: [], dataHandler: dataHandler})
            }

          } else {
            console.log(responseTripIda.message);
            Alert.alert('Aviso','Não foi encontrada nenhuma viagem de ida para esta data');
            const reqTripVolta = await fetch('http://34.207.157.190:5000/tripByDate', {
              method: 'POST',
              body: JSON.stringify({
                tripdate : dataCerta,
                origin_id: trip.destination_id,
                destination_id: trip.origin_id
              }),
              headers:{
                'Content-Type': 'application/json'
              }
            });
            
            const responseTripVolta = await reqTripVolta.json();
            console.log(responseTripVolta);
    
            if(responseTripVolta.success) {
    
              console.log(responseTripVolta.trips);
    
              navigation.navigate('Viagens', {viagensIda: [], viagensVolta: responseTripVolta, dataHandler: dataHandler})
            } else {
              Alert.alert('Aviso','Não foi encontrada nenhuma viagem de ida ou volta para esta data');
            }
          }
  
        } catch (error) {
          Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
          console.log(error);
        }
      } else {
        alert('Preencha os campos obrigatórios');
      }
    } else {
      if(dataIda !== "") {
        try {
          const dataArray = dataIda.split('/');
          const dataCerta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];
          console.log(dataCerta);
          console.log(trip.origin_id);
          console.log(trip.destination_id);

          const reqTripIda = await fetch('http://34.207.157.190:5000/tripByDate', {
            method: 'POST',
            body: JSON.stringify({
              tripdate : dataCerta,
              origin_id: trip.origin_id,
              destination_id: trip.destination_id
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          });
          
          console.log(JSON.stringify({
            tripdate : dataCerta,
            origin_id: trip.origem_id,
            destination_id: trip.destination_id}))

          const responseTripIda = await reqTripIda.json();
          console.log(responseTripIda);
  
          if(responseTripIda.success) {

            console.log(responseTripIda.trips);
  
            navigation.navigate('Viagens', {viagensIda: responseTripIda.trips, viagensVolta: [], dataHandler: dataHandler})
          }
          else {
            console.log(responseTripIda.message);
            Alert.alert('Aviso','Não foi encontrada nenhuma viagem para esta data');
          }
  
        } catch (error) {
          Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
          console.log(error);
        }
      } else {
        alert('Preencha os campos obrigatórios');
      }
    }
  }
  
  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Pesquisa de Viagens</HeaderText>
      </Header>

      <Container>
        <Image source={require('../images/logo.png')} style={{height: 50, width: 330, marginBottom: 20}} />
        <InputView>
          <DatePicker
          style={styles.datePickerStyle}
          date={dataIda}
          mode="date"
          placeholder="Escolha a data de ida"
          format="DD/MM/YYYY"
          minDate={data}
          maxDate={ultimaData}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderWidth: 0,
            },
            dateText: {
              fontSize: 18,
            },
            placeholderText: {
              fontSize: 18,
              color: '#A4A4A4',
            },
          }}
          onDateChange={(dataIda) => setDataIda(dataIda)}/>
        </InputView>
        <InputView>
        <DatePicker
        style={styles.datePickerStyle}
        date={dataVolta}
        mode="date"
        placeholder="Data de volta (opcional)"
        format="DD/MM/YYYY"
        minDate={data}
        maxDate={ultimaData}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            borderWidth: 0,
          },
          dateText: {
            fontSize: 18,
          },
          placeholderText: {
            fontSize: 18,
            color: '#A4A4A4',
          },
        }}
        onDateChange={(dataVolta) => {setDataVolta(dataVolta)}}/>
        </InputView>
        <Button onPress={Buscar}>
          <LoginText>Buscar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}