import React, { useState } from 'react';
import styled from 'styled-components/native';
import Data from './cities.json'
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

const InputView = styled.View`
  background-color: #088A29;
  width: 100%;
  padding-left: 50px;
`

const Input = styled.TextInput`
  background-color: #088A29;
  color: white;
  width: 80%;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  padding-horizontal: 10px;
  border-bottom-width: 1px;
  border-bottom-color: white;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 25%;
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
  font-size: 22px;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemArea = styled.TouchableHighlight`
  width: 100%;
`;

export default function DestinoPesquisa({navigation, route}) {
    const [dataSource] = useState(Data.Cities);
    const [filtered, setFiltered] = useState(dataSource);
    const [destino, setDestino] = useState('');
    const OnSearch = (text) => {
        setDestino(text);
        if(text){
            const temp = text.toString().toLowerCase();

            const tempList = dataSource.filter(item=>{
                if(item.toString().toLowerCase().startsWith(temp))
                return item
            })
            setFiltered(tempList);
        }
        else{
            setFiltered(dataSource);
        }
    }

    

    const Select = (item) => {
      setDestino(item);
      route.params.onReturnDestino(item);
      navigation.goBack();
    }

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <Icon name="arrowleft" color="white" size={25}/>
                </BackButton>
                <HeaderText>Selecione seu Destino</HeaderText>
            </Header>
            <InputView>
              <Input
              placeholder={'Ex: Pelotas'}
              onChangeText={OnSearch}
              value={destino}
              />
            </InputView>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                    {
                        filtered.map(item=>{
                            return(
                            <ItemArea onPress={() => Select(item)}
                            navigator={navigation}
                            underlayColor='#b5b5b5'
                            activeOpacity={0.6}>
                            <Item>{item}</Item>
                            </ItemArea>)
                        })
                    }
                    </SearchDropdown>
                </SearchDropdownArea>
            
        </Page>
    );
}