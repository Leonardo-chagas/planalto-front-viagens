import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Switch} from 'react-native';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.ScrollView`
  width: 90%;
`;

const InputView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  padding-left: 10px;
  overflow: hidden;
`;

const SelectorView = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  margin-bottom: 20px;
  height: 40px;
  display: flex;
  justify-content: center; 
  overflow: hidden;
`;

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
  overflow: hidden;
  padding: 0;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  flex: 1; 
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 60px;
  align-items: flex-start;
  justify-content: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;

const Title = styled.View`
  width: 100%;
  background-color: #D8D8D8;
  height: 50px;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const TitleText = styled.Text`
  color: #848484;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
  } 
});

export default function Cadastro ({navigation}) {

  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmapassword, setConfirmaPassword] = useState('');
  const [datanascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [confirmaemail, setConfirmaEmail] = useState('');
  const [tipotelefone, setTipoTelefone] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const aguardarCadastro = async () =>{
    if (password != '' && nome != '') {
      const req = await fetch('http://52.87.215.20:5000/register', {
        method: 'POST',
        body: JSON.stringify({
          name: nome,
          email: email,
          email_confirmation: confirmaemail,
          password: password,
          password_confirmation: confirmapassword,
          document: documento,
          phone_type: tipotelefone,
          phone: telefone,
          addr_postal_code: cep,
          addr_street: rua,
          addr_number: numero,
          addr_additional_info: complemento,
          birthdate: datanascimento,
          neighbourhood: bairro,
          city: cidade,
          state: estado,
          enable_sms: 'true',
        }),
        headers:{
            'Content-Type': 'application/json'
        }
      });
      const json = await req.json();
      console.log(json);

      if(json.success == true){
        alert('Cadastro Realizado');
        navigation.goBack();
      } else {
        alert('Erro no cadastro - '+json.message);
      }

    } else {
      alert('Preencha as informações!')
    }
  }
  
  return (
    <Page>
      <Header>
        <HeaderText>Cadastro</HeaderText>
      </Header>
      <Title>
        <TitleText>Dados Pessoais</TitleText>
      </Title>
      <Container>
        <InputView>
          <Input value={nome} onChangeText={t=>setNome(t)} placeholder={'Nome completo'}/>
        </InputView>
        <InputView>
          <Input value={documento} onChangeText={t=>setDocumento(t)} placeholder={'Documento'}/>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha'}></Input>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={confirmapassword} onChangeText={t=>setConfirmaPassword(t)} placeholder={'Confirmação de senha'}></Input>
        </InputView>
        <InputView>
          <Input value={datanascimento} onChangeText={t=>setDataNascimento(t)} placeholder={'Data de nascimento'}/>
        </InputView>
        <InputView>
          <Input value={email} onChangeText={t=>setEmail(t)} placeholder={'E-mail'}/>
        </InputView>
        <InputView>
          <Input value={confirmaemail} onChangeText={t=>setConfirmaEmail(t)} placeholder={'Confirmação de e-mail'}/>
        </InputView>
        <SelectorView>
        <Picker selectedValue={tipotelefone} mode={'dropdown'} onValueChange={t=>setTipoTelefone(t)}>
          <Picker.Item style={styles.item} label="Celular" value="1"/>
          <Picker.Item style={styles.item} label="Residencial" value="2"/>
          <Picker.Item style={styles.item} label="Comarcial" value="3"/>
        </Picker>
        </SelectorView>
        <InputView>
          <Input value={telefone} onChangeText={t=>setTelefone(t)} placeholder={'Telefone'}/>
        </InputView>
        {/* <InputView>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        </InputView> */}
        <InputView>
          <Input value={cep} onChangeText={t=>setCep(t)} placeholder={'Cep'}/>
        </InputView>
        <InputView>
          <Input value={rua} onChangeText={t=>setRua(t)} placeholder={'Rua'}/>
        </InputView>
        <InputView>
          <Input value={numero} onChangeText={t=>setNumero(t)} placeholder={'Número'}/>
        </InputView>
        <InputView>
          <Input value={complemento} onChangeText={t=>setComplemento(t)} placeholder={'Complemento'}/>
        </InputView>
        <InputView>
          <Input value={bairro} onChangeText={t=>setBairro(t)} placeholder={'Bairro'}/>
        </InputView>
        <InputView>
          <Input value={cidade} onChangeText={t=>setCidade(t)} placeholder={'Cidade'}/>
        </InputView>
        <SelectorView>
        <Picker selectedValue={estado} mode={'dropdown'} onValueChange={t=>setEstado(t)}>
          <Picker.Item style={styles.item} value="AC" label="Acre"/>
          <Picker.Item style={styles.item} value="AL" label="Alagoas"/>
          <Picker.Item style={styles.item} value="AP" label="Amapá"/>
          <Picker.Item style={styles.item} value="AM" label="Amazonas"/>
          <Picker.Item style={styles.item} value="BA" label="Bahia"/>
          <Picker.Item style={styles.item} value="CE" label="Ceará"/>
          <Picker.Item style={styles.item} value="DF" label="Distrito Federal"/>
          <Picker.Item style={styles.item} value="ES" label="Espírito Santo"/>
          <Picker.Item style={styles.item} value="GO" label="Goiás"/>
          <Picker.Item style={styles.item} value="MA" label="Maranhão"/>
          <Picker.Item style={styles.item} value="MT" label="Mato Grosso"/>
          <Picker.Item style={styles.item} value="MS" label="Mato Grosso do Sul"/>
          <Picker.Item style={styles.item} value="MG" label="Minas Gerais"/>
          <Picker.Item style={styles.item} value="PA" label="Pará"/>
          <Picker.Item style={styles.item} value="PB" label="Paraíba"/>
          <Picker.Item style={styles.item} value="PR" label="Paraná"/>
          <Picker.Item style={styles.item} value="PE" label="Pernambuco"/>
          <Picker.Item style={styles.item} value="PI" label="Piauí"/>
          <Picker.Item style={styles.item} value="RJ" label="Rio de Janeiro"/>
          <Picker.Item style={styles.item} value="RN" label="Rio Grande do Norte"/>
          <Picker.Item style={styles.item} value="RS" label="Rio Grande do Sul"/>
          <Picker.Item style={styles.item} value="RO" label="Rondônia"/>
          <Picker.Item style={styles.item} value="RR" label="Roraima"/>
          <Picker.Item style={styles.item} value="SC" label="Santa Catarina"/>
          <Picker.Item style={styles.item} value="SP" label="São Paulo"/>
          <Picker.Item style={styles.item} value="SE" label="Sergipe"/>
          <Picker.Item style={styles.item} value="TO" label="Tocantins"/>
        </Picker>
        </SelectorView>
        <Button onPress={aguardarCadastro}>
          <LoginText>Cadastrar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}