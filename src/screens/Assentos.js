import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
    var seats = [];
    var index = 0;
    console.log(busSeats);

    const seatsLength = busSeats.length;

      for(var i=0; i<seatsLength/4; i++){
        var row = [];
        var passou = false;

        for(var seat=index; seat<index+3; seat++){
          if(seat == index+2 && !passou){
            row.push(<View>
              <Text style={{paddingRight:30, paddingLeft:30}}></Text>
            </View>);
            seat--;
            passou = true;
          }
          else{
            row.push(<Seat onPress={() => FazerReserva()}>
              <Text>{busSeats[seat].name}</Text>
            </Seat>);
          }
        }
        seats.push(<Row>
            {row}
        </Row>);
        index = index+4;
      }

      const FazerReserva = async () => {
        const req = await fetch('http://52.87.215.20:5000/reservation', {
          method: 'POST',
          body: JSON.stringify({}),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const json = await req.json();

        if(json.succes == true){
          alert('Reserva Concluída');
        }
      }
    

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <ButtonSymbol>{'<'}</ButtonSymbol>
                </BackButton>
                <HeaderText>Escolha o seu assento</HeaderText>
            </Header>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                    {
                        seats
                    }
                    {/* <Row>
                    <Seat>
                      <Text>{1}</Text>
                    </Seat>
                    <Seat>
                      <Text>{2}</Text>
                    </Seat>
                    <Seat>
                      <Text>{3}</Text>
                    </Seat>
                    </Row> */}
                    </SearchDropdown>
                </SearchDropdownArea>
        </Page>
    );
}