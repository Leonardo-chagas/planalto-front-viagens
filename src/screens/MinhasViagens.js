import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;//Area que contem os elementos da tela

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

const Button = styled.TouchableHighlight`
  padding: 5px;
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
  font-size: 18px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #A4A4A4;
`;

const ItemArea = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
  padding-left: 10px;
`;

const ScreensHeader = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ScreenArea = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScreenText = styled.Text`
  padding-bottom: 3px;
  color: #A4A4A4;
`;

const VoucherLink = styled.TouchableHighlight`
  padding-bottom: 10px;
`;

const VoucherText = styled.Text`
  color: #088A29;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const VoucherArea = styled.Modal`
  background-color: rgba(0, 0, 0, 0.3);
`;

const VoucherAreaBody = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Box = styled.View`
  width: 80%;
  height: 30%
  background-color: white;
  position: absolute;
  left: 10%;
  top: 30%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
`;

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 3,
    borderBottomColor: '#088A29',
  },
  inactive: {
    borderBottomWidth: 0,
  }
});

export default function MinhasViagens({navigation, route}) {

  const [screen, setScreen] = useState(0);
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [ret, setRet] = useState(route.params.ret)
  const [dev, setDev] = useState(route.params.dev)
  const [fin] = useState(route.params.fin)
  const [currentItem, setCurrentItem] = useState();

  const formatarData = (data) => {
    let d = new Date (data);
    return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
  }

  const formatarHora = (data) => {
    let d = new Date (data);
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
  }

  const ViewVoucher = (item) => {
    setVoucherVisible(true);
    setCurrentItem(item);
  }

  const OnPressTrocarViagem = async () => {
    const dia = new Date().getDate();
    const mes = new Date().getMonth()+1;
    const ano = new Date().getFullYear();
    const req = await fetch('http://34.207.157.190:5000/trip');
    const json = req.json();
    var viagens = [];
    if(json.success){
      json.trips.forEach(item => {
        const viagemDia = new Date(item.tripdate).getDate();
        const viagemMes = new Date(item.tripdate).getMonth()+1;
        const viagemAno = new Date(item.tripdate).getFullYear();
        if(item.origin.id == currentItem.origin.id && item.destination.id == currentItem.destination.id &&
          viagemAno >= ano){
            viagens.push(item);
        }
      })
      if(viagens){
        navigation.navigate('Trocar viagem', {viagens: viagens, origem: currentItem.origin, destino: currentItem.destination});
      }
      else{
        alert("Não existe mais nenhuma viagem para esta rota");
      }
    }
  }

  const OnPressCancelarViagem = async () => {
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

    const req = await fetch('http://34.207.157.190:5000/reservation/' + currentItem.reservation_id, {
      method: 'DELETE',
      body: JSON.stringify({
        access_token: route.params.dataHandler.getAccessToken()
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    const json = await req.json();
    
    if(json.success) {
      let retArray = ret;
      retArray.splice(ret.indexOf(currentItem), 1);
      setRet(retArray);
      let devArray = dev;
      devArray.push(ret.indexOf(currentItem));
      setDev(devArray);
      alert('Viagem Cancelada com sucesso');
    } else {
      alert("Não foi possível cancelar a viagem");
    }

  }

  const Voucher = async () => {
    try {
      const reqtrip = await fetch('http://34.207.157.190:5000/trip/' + currentItem.trip_id);
      const jsontrip = await reqtrip.json();
  
      if(jsontrip.success){
        console.log(jsontrip.trip)

        const reqseat = await fetch('http://34.207.157.190:5000/seat/' + currentItem.seat_id);
        const jsonseat = await reqseat.json();

        if (jsonseat.success) {
          setVoucherVisible(false);
          navigation.navigate("Voucher", {trip: jsontrip.trip, seat: jsonseat.seat});
        } else {
          Alert('Aviso', 'Erro na busca do voucher - ' + jsontrip.message)
        }
      } else {
        Alert('Aviso', 'Erro na busca do voucher - ' + jsontrip.message)
      }
  
    } catch (error) {
      Alert.alert('Aviso','Erro interno do servidor! Tente novamente mais tarde.');
      console.log(error);
    }
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()}
        underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Viagens</HeaderText>
      </Header>
      <ScreensHeader>
        <ScreenArea onPress={() => setScreen(0)}  style={screen == 0 ? styles.active : styles.inactive}>
          <ScreenText>Ag. Retirada</ScreenText>
        </ScreenArea>
        <ScreenArea onPress={() => setScreen(1)} style={screen == 1 ? styles.active : styles.inactive}>
          <ScreenText>Devoluções</ScreenText>
        </ScreenArea>
        <ScreenArea onPress={() => setScreen(2)} style={screen == 2 ? styles.active : styles.inactive}>
          <ScreenText>Finalizadas</ScreenText>
        </ScreenArea>
      </ScreensHeader>
      <VoucherArea 
        visible={voucherVisible}
        transparent={true}>
        <VoucherAreaBody onPressOut={()=>setVoucherVisible(false)}>
          <TouchableWithoutFeedback>
            <Box>
              <Button onPress={Voucher}>
                <LoginText>Visualizar Voucher</LoginText>
              </Button>
              <Button onPress={OnPressTrocarViagem}>
                <LoginText>Trocar Data da Viagem</LoginText>
              </Button>
              <Button onPress={OnPressCancelarViagem}>
                <LoginText>Cancelar Viagem</LoginText>
              </Button>
            </Box>
          </TouchableWithoutFeedback>
        </VoucherAreaBody>
      </VoucherArea>
      {screen == 0 &&
        <SearchDropdownArea>
          <SearchDropdown>
            {ret.map(item=>{
              return(
                <ItemArea key={item.transaction_id}>
                  <Item>{item.origin} ------{'>'} {item.destination}</Item>
                  <Item>Data: {formatarData(item.tripdate)}</Item>
                  <Item>Hora: {formatarHora(item.tripdate)}</Item>
                  <Item>Valor Total: R$ {item.price.toFixed(2)}</Item>
                  <VoucherLink onPress={()=>ViewVoucher(item)}>
                    <VoucherText>Opções</VoucherText>
                  </VoucherLink>
                </ItemArea>
              )})
            }
          </SearchDropdown>
        </SearchDropdownArea>
      }
      {screen == 1 &&
        <SearchDropdownArea>
          <SearchDropdown>
            {dev.map(item=>{
              return(
                <ItemArea key={item.transaction_id}>
                  <Item>{item.origin} ------{'>'} {item.destination}</Item>
                  <Item>Data: {formatarData(item.tripdate)}</Item>
                  <Item>Hora: {formatarHora(item.tripdate)}</Item>
                  <Item>Valor Devolvido: R$ {item.price.toFixed(2)}</Item>
                </ItemArea>
              )})
            }
          </SearchDropdown>
        </SearchDropdownArea>
      }
      {screen == 2 &&
        <SearchDropdownArea>
          <SearchDropdown>
            {fin.map(item=>{
              return(
                <ItemArea key={item.transaction_id}>
                  <Item>{item.origin} ------{'>'} {item.destination}</Item>
                  <Item>Data: {formatarData(item.tripdate)}</Item>
                  <Item>Hora: {formatarHora(item.tripdate)}</Item>
                  <Item>Valor Total: R$ {item.price.toFixed(2)}</Item>
                </ItemArea>
              )})
            }
          </SearchDropdown>
        </SearchDropdownArea>
      }
    </Page>
  );
}
