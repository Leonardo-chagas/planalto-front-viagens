import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DataHandler from '../DataHandler';

const dataHandler = new DataHandler();

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

export default function ViagemForm({navigation, route}) {
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

  const [origem, setOrigem] = useState({name: ''});
  const [destino, setDestino] = useState({name: ''});
  const [dataIda, setDataIda] = useState(data);
  const [maxData] = useState(ultimaData);
  const [dataVolta, setDataVolta] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const onPressOrigem = async () => {
    try {
      const reqCities = await fetch('http://34.207.157.190:5000/city', {
        method: 'GET'
      });
      
      const jsonCities = await reqCities.json();
      
      const cities = jsonCities.cities;

      if(jsonCities.success == false){
        Alert.alert('Aviso','Erro na busca - ' + jsonCities.message);
      } else {
        navigation.navigate('Pesquisa de Origem', {cities: cities, onReturnOrigem: (item) => {setOrigem(item)}})
      }

    } catch (error) {
      Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
      console.log(error);
    }
  }

  const onPressDestino = async () => {
    try {
      const reqCities = await fetch('http://34.207.157.190:5000/city', {
        method: 'GET'
      });

      const jsonCities = await reqCities.json();

      const cities = jsonCities.cities;

      if(jsonCities.success == false){
        Alert.alert('Aviso','Erro na busca - ' + jsonCities.message);
      } else {
        navigation.navigate('Pesquisa de Destino', {cities:cities, onReturnDestino: (item) => {setDestino(item)}})
      }

    } catch (error) {
      Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
      console.log(error);
    }

  }

  const Buscar = async () => {
    if(origem && destino && dataIda){
      const dataArray = dataIda.split('/');
      const dataCerta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];
      const reqteste = await fetch('http://34.207.157.190:5000/trip');
      const jsonteste = await reqteste.json();
      console.log(dataCerta);
      console.log(jsonteste);
      const req = await fetch('http://34.207.157.190:5000/tripByDate', {
        method: 'POST',
        body: JSON.stringify({
          tripdate: dataCerta,
          origin_id: origem.id,
          destination_id: destino.id
        }),
        headers:{
          'Content-type': 'application/json'
        }
      });
      var viagens = [];
      const json = await req.json();
      if(json.success){
        json.trips.forEach(item => {
          viagens.push({dataIda:item.tripdate, preco:item.price, id:item.id, busID: item.bus_id});
        })
        //const viagens = [{ida:'12/03/2021',assentos:32, preco:102.09, id: 123}];
        dataHandler.setOrigem(origem);
        dataHandler.setDestino(destino);
        dataHandler.setDataIda(dataIda);
        navigation.navigate('Viagens', {viagens: viagens, origem: origem, destino: destino, dataIda: dataIda})
      }
      else{
        console.log(json.message);
        alert('Não foi encontrada nenhuma viagem para esta data');
      }
    }
    else{
      alert('Preencha os campos obrigatórios');
    }
  }
  
  const MinhasViagens = async () => {
    var ret = [];
    var dev = [];
    var fin = [];

    /* ret = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', valor: '143,40', code: 'Some string value', id: 9},
          {origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', valor: '143,40', code: 'Some string value', id: 10}];

    dev = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', nsu: '23843749144184', id: 9}];

    fin = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', nsu: '23843749144184', id: 9}]; */

    const req = await fetch('http://34.207.157.190:5000/reservation?access_token=' + dataHandler.getAccessToken());
    const json = await req.json();
    if(json.success){
      json.reservations.forEach(async item => {
        if(item.user_id == dataHandler.getUserID()){
          if(item.deleted_at != null){
            const reqtrip = await fetch('http://34.207.157.190:5000/trip/' + item.trip_id);
            const jsontrip = await reqtrip.json();
            if(jsontrip.success){
              const info = {origin: jsontrip.trip.origin.name,
              destination: jsontrip.trip.destination.name,
              tripdate: jsontrip.trip.tripdate,
              transaction_id: item.transaction_id};
              dev.push(info);
            }
          }
          else if(item.approved){
            const reqtrip = await fetch('http://34.207.157.190:5000/trip/' + item.trip_id);
            const jsontrip = await reqtrip.json();
            if(jsontrip.success){
              const info = {origin: jsontrip.trip.origin.name,
                destination: jsontrip.trip.destination.name,
                tripdate: jsontrip.trip.tripdate,
                transaction_id: item.transaction_id};
              fin.push(info);
            }
          }
          else if(!item.approved){
            const reqtrip = await fetch('http://34.207.157.190:5000/trip/' + item.trip_id);
            const jsontrip = await reqtrip.json();
            if(jsontrip.success){
              const info = {origin: jsontrip.trip.origin.name,
                destination: jsontrip.trip.destination.name,
                tripdate: jsontrip.trip.tripdate,
                transaction_id: item.transaction_id,
                id: item.id,
                price: jsontrip.trip.price};
              ret.push(info);
            }
          }
        }
      })
    }
    console.log(json);

    setMenuVisible(false);
    navigation.navigate('Minhas Viagens',{ret: ret, dev: dev, fin: fin, dataHandler: dataHandler})
  }

  const Login = () => {
    setMenuVisible(false);
    navigation.navigate('Login', {dataHandler: dataHandler})
  }

  const Cadastrar = () => {
    setMenuVisible(false)
    navigation.navigate('Cadastro', {dataHandler: dataHandler})
  }

  const Perfil = async() => {
    try {
      const requestToken = await fetch('http://34.207.157.190:5000/refresh', {
        method: 'PUT',
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

      console.log(url);
      const requestData = await fetch('http://34.207.157.190:5000/user/'+ dataHandler.getUserID() + '?access_token='+ dataHandler.getAccessToken(), {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      });

      console.log("Cheguei aqui!")
      const userData = await requestData.json();

      setMenuVisible(false);
      navigation.navigate('Perfil', {userData: userData, dataHandler: dataHandler});

    } catch (error) {
      Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
      console.log(error);
    }
  }

  const Sair = () => {
    setMenuVisible(false)
    dataHandler.setAccessToken('');
    dataHandler.setRefreshToken('');
    dataHandler.setUserID('');
    navigation.navigate('Pesquisa de Viagens')
  }
  
  return (
    <Page>
      <Menu visible={menuVisible}
      animationType='slide'
      transparent={true}>
        <MenuBody onPressOut={()=>setMenuVisible(false)}>
          {/* <TouchableWithoutFeedback> */}
          {dataHandler.getAccessToken() != '' &&
            <Box>
              <MenuItem onPress={()=>setMenuVisible(false)}>
                <View>
                  <Icon name="home" color="#aaaaaa" size={25}/>
                  <MenuItemText>Home</MenuItemText>
                </View>
              </MenuItem>

              <MenuItem onPress={()=>Perfil()}>
                <View>
                  <Icon name="user"  color="#aaaaaa" size={25}/>
                  <MenuItemText>Perfil</MenuItemText>
                </View>
              </MenuItem>

              <MenuItem onPress={()=>MinhasViagens()}>
                <View>
                  <IconAwesome name="bus" color="#aaaaaa" size={25}/>
                  <MenuItemText>Minhas Viagens</MenuItemText>
                </View>
              </MenuItem>

              <MenuItem onPress={()=>Sair()}>
                <View>
                  <Icon name="log-out" color="#aaaaaa" size={25}/>
                  <MenuItemText>Sair</MenuItemText>
                </View>
              </MenuItem>
            </Box>
            }
            {dataHandler.getAccessToken() == '' &&
              <Box>
              <MenuItem onPress={()=>setMenuVisible(false)}>
                <View>
                  <Icon name="home" color="#aaaaaa" size={25}/>
                  <MenuItemText>Home</MenuItemText>
                </View>
              </MenuItem>

              <MenuItem onPress={()=>Login()}>
                <View>
                  <Icon name="lock-open" color="#aaaaaa" size={25}/>
                  <MenuItemText>Entrar</MenuItemText>
                </View>
              </MenuItem>

              <MenuItem onPress={()=>Cadastrar()}>
                <View>
                  <Icon name="lock-open"  color="#aaaaaa" size={25}/>
                  <MenuItemText>Cadastrar</MenuItemText>
                </View>
              </MenuItem>
            </Box>
            }
          {/* </TouchableWithoutFeedback> */}
        </MenuBody>
      </Menu>

      <Header>
        <MenuButton onPress={() => setMenuVisible(true)}>
          <Icon name='menu' size={25} color="white"/>
        </MenuButton>
        <HeaderText>Pesquisa de Viagens</HeaderText>
      </Header>

      <Container>
        <Image source={require('../images/logo.png')} style={{height: 50, width: 330, marginBottom: 20}} />
        <Touchable onPress={onPressOrigem}>
        <InputView>
          <Input 
          placeholder={'Escolha sua Origem'}
          editable={false}
          onTouchStart={onPressOrigem}
          value={origem.name}
          />
        </InputView>
        </Touchable>
        <Touchable onPress={onPressDestino}>
        <InputView>
          <Input 
          placeholder={'Escolha seu Destino'}
          editable={false}
          onTouchStart={onPressDestino}
          value={destino.name}/>
        </InputView>
        </Touchable>
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