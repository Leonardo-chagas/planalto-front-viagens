import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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

export default function TrocarAssento({navigation, route}) {
  const [trip] = useState(route.params.trip);
  const [lastID] = useState(route.params.lastID);
  var seats = [];
  var index = 0;

  const seatsLength = route.params.busSeats.length;
  
  for(var i=1; i<=Math.ceil(seatsLength/4); i++){
    var quant = 0;
    if(i*4 < seatsLength) {
      quant = 4;
    } else {
      quant = seatsLength-((i-1)*4);
    }

    console.log(quant);
    var row = [];
    var passou = false;

    for(var seat = index * 4; seat < index + quant; seat++) {
      const seatName = route.params.busSeats[seat].name;
      let seatID = route.params.busSeats[seat].id;
      let reserved = false;

      if(seat == index + 2 && !passou) {
        row.push(
        <View>
          <Text style={{paddingRight:30, paddingLeft:30}}></Text>
        </View>
        );
        seat--;
        passou = true;
      } else {
        if(trip.reserved_seats){
        trip.reserved_seats.forEach(item => {
          console.log(item.seat_id);
          console.log(seatID);
          if(parseInt(item.seat_id) == seatID){
            console.log('passei');
            reserved = true;
          }
        });
      }
        if(!reserved){
          row.push(
            <Seat key={seatID} onPress={() => FazerReserva(seatName, seatID)}>
              <Text>{seatName}</Text>
            </Seat>
          );
        }
        else{
          row.push(
          <ReservedSeat key={seatID}>
              <Text>{seatName}</Text>
          </ReservedSeat>
          );
        }
      }
    }

    seats.push(
      <Row key={i}>
        {row}
      </Row>
    );
    index = index+4;
  }

  const FazerReserva = async (seatName, seatID) => {
    // DataHandler.assento = assento;
    // DataHandler.assentoID = assentoID;
    route.params.dataHandler.setAssento(seatName);
    route.params.dataHandler.setAssentoID(seatID);
    route.params.dataHandler.setViagemID(route.params.trip.id);
    navigation.navigate('Trocar Confirmar', {trip: route.params.trip, dataHandler: route.params.dataHandler, lastID: lastID});
  }

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
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