import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';
import Icon from 'react-native-vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';

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

const Item = styled.Text`
  font-size: 18px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
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
`;

const VoucherLink = styled.TouchableHighlight`
width: 50%
padding-bottom: 10px;
`;

const VoucherText = styled.Text`
color: #088A29;
font-size: 18px;
font-weight: bold;
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
width: 60%;
height: 70%
background-color: white;
position: absolute;
left: 20%;
top: 20%;
align-items: center;
justify-content: center;
`;

export default function MinhasViagens({navigation, route}) {

  const [screen, setScreen] = useState(0);
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [qrcode, setQRcode] = useState('');
  const [ret, setRet] = useState(route.params.ret)
  const [dev, setDev] = useState(route.params.dev)
  const [fin, setFin] = useState(route.params.fin)

  const ViewVoucher = (code) => {
    setQRcode(code);
    setVoucherVisible(true);
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
                    <QRCode
                    value='Some string value'
                    color={'black'}
                    backgroundColor={'white'}
                    size={150}/>
                  </Box>
                </TouchableWithoutFeedback>
              </VoucherAreaBody>
            </VoucherArea>
           
           {screen == 0 &&
                <SearchDropdownArea>
                    <SearchDropdown>
                      {
                        ret.map(item=>{
                          return(
                        <ItemArea>
                          <Item>{item.origem} ------{'>'} {item.destino}</Item>
                          <Item>Data: {item.dataIda}</Item>
                          <Item>Valor Total: R$ {item.valor}</Item>
                          <VoucherLink onPress={()=>ViewVoucher(item.code)}>
                            <VoucherText>Vizualizar Voucher</VoucherText>
                          </VoucherLink>
                        </ItemArea>)
                        })
                      }
                    </SearchDropdown>
                </SearchDropdownArea>
            }
            {screen == 1 &&
                <SearchDropdownArea>
                    <SearchDropdown>
                      {
                        dev.map(item=>{
                          return(
                        <ItemArea>
                            <Item>{item.origem} ------{'>'} {item.destino}</Item>
                            <Item>Data: {item.dataIda}</Item>
                            <Item>NSU: {item.nsu}</Item>
                          </ItemArea>)
                      })
                      }
                    </SearchDropdown>
                </SearchDropdownArea>
            }
            {screen == 2 &&
                <SearchDropdownArea>
                    <SearchDropdown>
                      {
                        fin.map(item=>{
                        return(
                      <ItemArea>
                        <Item>{item.origem} ------{'>'} {item.destino}</Item>
                        <Item>Data: {item.dataIda}</Item>
                        <Item>NSU: {item.nsu}</Item>
                      </ItemArea>)
                      })
                      }
                    </SearchDropdown>
                </SearchDropdownArea>
            }
        </Page>
    );
}

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 3,
    borderBottomColor: '#088A29',
  },
  inactive: {
    borderBottomWidth: 0,
  }
});