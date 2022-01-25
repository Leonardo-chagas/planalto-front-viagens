import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  ViagemForm  from './screens/ViagemForm'
import  OrigemPesquisa  from './screens/OrigemPesquisa'
import  DestinoPesquisa  from './screens/DestinoPesquisa'
import Viagens from './screens/Viagens'
import Assentos from './screens/Assentos';
import Login from './screens/Login';
import Confirmar from './screens/Confirmar';
import Cadastro from './screens/Cadastro';
import MinhasViagens from './screens/MinhasViagens';

const Stack = createNativeStackNavigator();

export default () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='Pesquisa de Viagens'
        component={ViagemForm}/>
      <Stack.Screen
        name='Minhas Viagens'
        component={MinhasViagens}/>
      <Stack.Screen
        name='Login'
        component={Login}/>
        <Stack.Screen
        name='Cadastro'
        component={Cadastro}/>
        <Stack.Screen
        name='Pesquisa de Origem'
        component={OrigemPesquisa}/>
        <Stack.Screen
        name='Pesquisa de Destino'
        component={DestinoPesquisa}/>
        <Stack.Screen
        name='Viagens'
        component={Viagens}/>
        <Stack.Screen
        name='Assentos'
        component={Assentos}/>
        <Stack.Screen
        name='Confirmar'
        component={Confirmar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
