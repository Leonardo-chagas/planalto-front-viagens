import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  margin-bottom: 20px;
  align-items: flex-start;
`;//Area que contem o titulo da tela

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;//Titulo da tela

const Touchable = styled.TouchableOpacity``;

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
      const req = await fetch('http://52.87.215.20:5000/trip');
      const json = await req.json();
      const viagens = []
      json.trips.forEach(item => {
        if(item.origin.name == origem && item.destination.name == destino){
          viagens.push({ida:item.tripdate, assentos:32, preco:item.price, id:item.bus.id});
        }
      });
      //viagens = [{ida:'12/03/2021',assentos:32, preco:102.09}];
      navigation.navigate('Viagens', {viagens: viagens})
    }
    else{

    }
  }

  return (
    <Page>
      <Header>
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

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  }
});