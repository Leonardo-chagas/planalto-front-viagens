import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Data from './cities.json'

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

const Item = styled.Text`
  font-size: 22px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemArea = styled.TouchableHighlight`
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

export default function Viagens({navigation, route}) {
    const [viagens, setViagens] = useState(route.params.viagens);

    const ComprarViagem = async (id) => {
      var busSeats = [];
      const req = await fetch('http://52.87.215.20:5000/seat');
      const json = await req.json();
      json.seats.forEach(item => {
        if(item.bus_id == id){
          busSeats.push({name:item.name});
      }
    });
      navigation.navigate('Assentos', {seats: busSeats});
    }

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <ButtonSymbol>{'<'}</ButtonSymbol>
                </BackButton>
                <HeaderText>Viagens</HeaderText>
            </Header>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                    {
                        viagens.map(item=>{
                            return(
                            <ItemArea onPress={() => ComprarViagem(item.id)}
                            navigator={navigation}
                            underlayColor='#b5b5b5'
                            activeOpacity={0.6}>
                            <View>
                                <Item>Ida: {item.ida}</Item>
                                <Item>Assentos disponíveis: {item.assentos}</Item>
                                <Item>Preço: R${item.preco}</Item>
                            </View>
                            </ItemArea>)
                        })
                    }
                    </SearchDropdown>
                </SearchDropdownArea>
        </Page>
    );
}