import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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

const Seat = styled.TouchableHighlight`
border-width: 1px;
border-color: #A4A4A4;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
flex:1;
align-items: center;
justify-content: center;
height: 35px;
margin-bottom: 10px;
background-color: #088A29;
`;

const Row = styled.View`
display: flex;
flex-direction: row;
`;

export default function Assentos({navigation, route}) {
    const [busSeats, setBusSeats] = useState(route.params.seats);
    const [origem, setOrigem] = useState(route.params.origem);
    const [destino, setDestino] = useState(route.params.destino);
    const [dataIda, setDataIda] = useState(route.params.dataIda);

    var seats = [];
    var index = 0;

    const seatsLength = busSeats.length;
      for(var i=1; i<=Math.ceil(seatsLength/4); i++){
        var quant = 0;
        if(i*4 < seatsLength)
          quant = 4;
        else
          quant = seatsLength-((i-1)*4);
        console.log(quant);
        var row = [];
        var passou = false;

        for(var seat=index*4; seat<index+quant; seat++){
          
          const seatName = busSeats[seat].name;
          const seatID = busSeats[seat].id;
          if(seat == index+2 && !passou){
            row.push(<View>
              <Text style={{paddingRight:30, paddingLeft:30}}></Text>
            </View>);
            seat--;
            passou = true;
          }
          else{
            row.push(<Seat onPress={() => FazerReserva(seatName, seatID)}>
              <Text>{seatName}</Text>
            </Seat>);
          }
        }
        seats.push(<Row>
            {row}
        </Row>);
        index = index+4;
      }

      const FazerReserva = async (assento, assentoID) => {
        DataHandler.assento = assento;
        DataHandler.assentoID = assentoID;
        navigation.navigate('Confirmar', {origem: origem, destino: destino, dataIda: dataIda, assento: assento});
      }
    

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <Icon name="arrowleft" color="white" size={25}/>
                </BackButton>
                <HeaderText>Escolha o seu assento</HeaderText>
            </Header>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                    {
                        seats
                    }
                    </SearchDropdown>
                </SearchDropdownArea>
        </Page>
    );
}