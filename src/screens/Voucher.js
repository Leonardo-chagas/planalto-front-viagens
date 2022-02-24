import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';

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
`;

const Item = styled.Text`
  font-size: 22px;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
`;

const ItemArea = styled.View`
  flex: 1;
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export default function Voucher({navigation, route}) {

  return (
    <Page>
      <Header>
        <BackButton onPress={() => navigation.goBack()} underlayColor='#1ab241'>
          <Icon name="arrowleft" color="white" size={25}/>
        </BackButton>
        <HeaderText>Voucher da Viagem</HeaderText>
      </Header>
      <SearchDropdownArea>
        <SearchDropdown>
          <ItemArea>
              <Item>{'origem'} - {'>'} {'destino'}</Item>
              <Item>{'data'}</Item>
              <QRCode
                value='Some string value'
                color={'black'}
                backgroundColor={'white'}
                size={150}/>
              <Item>Horário: {'hora'}</Item>
              <Item>Assento: {'assento'}</Item>
              <Item>Ônibus: {'placa'}</Item>
              <Item>Status do Pagamento: {'pendente'}</Item>
          </ItemArea>
        </SearchDropdown>
      </SearchDropdownArea>
    </Page>
  );
}