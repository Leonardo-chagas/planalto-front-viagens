import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DataHandler from '../DataHandler';

const dataHandler = new DataHandler();

const Stack = createNativeStackNavigator();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;//Area que contem os elementos da tela

const Container = styled.View`
  width: 90%;
`;//Area que contem o conteudo principal da tela

const InputView = styled.View`
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  padding: 5px;
  margin-bottom: 20px;
`;//Area que contem os inputs

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
  color: black;
`;//Os inputs em si

const BackButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
`;

const ButtonSymbol = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  width: 100%;  
`;//Area que fica os botões

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;//Texto de realizar o login

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
    width: 200,
    marginTop: 20,
  }
});

export default function ViagemForm({navigation, route}) {
  const dia = new Date().getDate();
  const mes = new Date().getMonth()+1;
  const ano = new Date().getFullYear();
  const data = dia + '/' + mes + '/' + ano;

  var novoMes = Number(mes)+2;
  var novoAno = Number(ano);
  if(novoMes > 12){
    novoMes -= 12;
    novoAno += 1;
  }

  const ultimoMes = novoMes.toString();
  const ultimoAno = novoAno.toString();
  const ultimaData = '31/' + ultimoMes + '/' + ultimoAno;

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataIda, setDataIda] = useState(data);
  const [dataVolta, setDataVolta] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const onPressOrigem = () => {
    navigation.navigate('Pesquisa de Origem', {onReturnOrigem: (item) => {
      setOrigem(item)
    }})
  }
  
  const onPressDestino = () => {
    navigation.navigate('Pesquisa de Destino', {onReturnDestino: (item) => {
      setDestino(item)
    }})
  }

  const Buscar = async () => {
    if(origem && destino && dataIda){
      var origemID = 0;
      var destinoID = 0;
      const reqCities = await fetch('http://52.87.215.20:5000/city');
      const jsonCities = await reqCities.json();
      jsonCities.cities.forEach(item => {
        if(item.name == origem)
          origemID = item.id;
        if(item.name == destino)
          destinoID = item.id;
      });
      const ida = dataIda;
      const req = await fetch('http://52.87.215.20:5000/tripByDate', {
        method: 'POST',
        body: JSON.stringify({
          tripdate: dataIda,
          origin_id: origemID,
          destination_id: destinoID
        }),
        headers:{
          'Content-type': 'application/json'
        }
      });
      var viagens = [];
      const json = await req.json();
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
      alert('Preencha os campos obrigatórios');
    }
  }

  const MinhasViagens = () => {
    var ret = [];
    var dev = [];
    var fin = [];

    ret = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', valor: '143,40', code: 'Some string value'},
          {origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', valor: '143,40', code: 'Some string value'}];

    dev = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', nsu: '23843749144184'}];

    fin = [{origem: 'Pelotas - RS', destino: 'Porto Alegre - RS', dataIda: '16/02/2022 16:19', nsu: '23843749144184'}];
    
    setMenuVisible(false)
    navigation.navigate('Minhas Viagens', {ret: ret, dev: dev, fin: fin})
  }

  const Login = () => {
    setMenuVisible(false);
    navigation.navigate('Login', {dataHandler: dataHandler})
  }

  const Cadastrar = () => {
    setMenuVisible(false)
    navigation.navigate('Cadastro', {dataHandler: dataHandler})
  }

  const Perfil = () => {
    setMenuVisible(false)
    navigation.navigate('Perfil', {dataHandler: dataHandler})
  }

  const Sair = () => {
    setMenuVisible(false)
    dataHandler.setAccessToken('');
    dataHandler.setRefreshToken('');
    dataHandler.setUserID('');
    navigation.navigate('Pesquisa de Viagens')
  }
  
  console.log("Esse é o token: "+ dataHandler.getAccessToken())
  console.log("Esse é o refresh: "+ dataHandler.getRefreshToken())
  console.log("Esse é o ID: "+ dataHandler.getUserID())
  if (dataHandler.getAccessToken() == '') {
    console.log("Entrei aqui, estou sem token!")
    return (
      <Page>
        <Menu visible={menuVisible}
          animationType='slide'
          transparent={true}>
          <MenuBody onPressOut={()=>setMenuVisible(false)}>
            <TouchableWithoutFeedback>
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
            </TouchableWithoutFeedback>
          </MenuBody>
        </Menu>
  
        <Header>
          <MenuButton onPress={()=>setMenuVisible(true)}>
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
              value={origem}
            />
          </InputView>
          </Touchable>
          <Touchable onPress={onPressDestino}>
          <InputView>
            <Input 
              placeholder={'Escolha seu Destino'}
              editable={false}
              onTouchStart={onPressDestino}
              value={destino}/>
          </InputView>
          </Touchable>
          <InputView>
            <DatePicker
              style={styles.datePickerStyle}
              date={dataIda}
              mode="date"
              placeholder="Escolha a data de ida"
              format="YYYY-MM-DD"
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
                  marginLeft: 36,
                  borderWidth: 0,
                },
              }}
              onDateChange={(dataIda) => {setDataIda(dataIda)}}/>
          </InputView>
          <InputView>
            <DatePicker
              style={styles.datePickerStyle}
              date={dataVolta}
              mode="date"
              placeholder="Escolha a data de volta (opcional)"
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
                  marginLeft: 36,
                  borderWidth: 0,
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
  } else {
    console.log("Entrei aqui, estou com token!")
    return (
      <Page>
        <Menu visible={menuVisible}
          animationType='slide'
          transparent={true}>
          <MenuBody onPressOut={()=>setMenuVisible(false)}>
            <TouchableWithoutFeedback>
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
            </TouchableWithoutFeedback>
          </MenuBody>
        </Menu>
  
        <Header>
          <MenuButton onPress={()=>setMenuVisible(true)}>
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
              value={origem}
            />
          </InputView>
          </Touchable>
          <Touchable onPress={onPressDestino}>
          <InputView>
            <Input 
              placeholder={'Escolha seu Destino'}
              editable={false}
              onTouchStart={onPressDestino}
              value={destino}/>
          </InputView>
          </Touchable>
          <InputView>
            <DatePicker
              style={styles.datePickerStyle}
              date={dataIda}
              mode="date"
              placeholder="Escolha a data de ida"
              format="YYYY-MM-DD"
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
                  marginLeft: 36,
                  borderWidth: 0,
                },
              }}
              onDateChange={(dataIda) => {setDataIda(dataIda)}}/>
          </InputView>
          <InputView>
          <DatePicker
            style={styles.datePickerStyle}
            date={dataVolta}
            mode="date"
            placeholder="Escolha a data de volta (opcional)"
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
                marginLeft: 36,
                borderWidth: 0,
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
}