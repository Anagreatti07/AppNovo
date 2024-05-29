import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {

  const[clients, setClients] = useState([]);
  const[error, setError] = useState(false);
  const[edicao, setEdicao] = useState(false);
  const[clientId, setClientId] = useState(0);
  const[clientNome, setNome] = useState();
  const[clientEmail, setEmail] = useState();
  const[clientGenere, setGenere] = useState();
  const[deleteResposta, setResposta] = useState(false);

  async function getClients()
  {
    await fetch('http://10.139.75.22:5251/api/Clients/GetAllClients',{
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then( res => res.json())
        .then(json => setClients(json))
        .catch(err => setError(true))
  }

  async function getClient(id)
  {    
    await fetch('http://10.139.75.22:5251/api/Clients/GetClientId/' + id,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        .then((response)=> response.json())        
        .then(json=>{
          setClientId(json.clientId);
          setNome(json.clientName);
          setEmail(json.clientEmail);
          setGenere(json.clientGenere);
        });
  }

  async function editClient()
  {    
    await fetch('http://10.139.75.22:5251/api/Clients/UpdateClient/' + clientId,{
            method: 'PUT',
            headers: {
              'Content-type' : 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              clientId: clientId,
              clientEmail: clientEmail,
              clientGenere: clientGenere,
              clientName: clientNome
            })
        })
        .then( (response) => response.json())
        .catch(err => console.log(err));
        getClients();
        setEdicao(false);
  }

  function showAlert(id, clientName){
    Alert.alert(
      '',
      'Deseja realmente excluir esse cliente?',
      [
        {text: 'Sim', onPress:()=> deleteClient(id, clientName)},
        {text: 'Não', onPress:()=>('')},
      ],
      {cancelable: false}
    );
  }

  async function deleteClient(id, clientName){
    await fetch('http://10.139.75.22:5251/api/Clients/DeleteClient/' + id,{
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(json => setResposta(json))
        .catch(err => setError(true))

        if(deleteResposta == true)
          {
            Alert.alert(
              '',
              'Client' + clientName + 'excluido com sucesso',
              [
                {text:'', onPress:()=>('')},
                {text:'Ok', onPress:()=>('')},
              ],
              {cancelable: false}
            );
            getClients();
          }
          else{
            Alert.alert(
              '',
              'Client' + clientName + 'não foi excluido',
              [
                {text:'', onPress:()=>('')},
                {text:'Ok', onPress:()=>('')},
              ],
              {cancelable: false}
            );
            getClients();
          }
  };

  useEffect(()=>{
    getClients();
  },[]);

  useFocusEffect(
    React.useCallback(()=>{
      getClients();
    },[])
  );

  return (
    <View style={css.container}>
      {edicao == false ?
    <FlatList
    style={css.flat}
    data={clients}
    keyExtractor={(item) => item.clientId}
    renderItem={({item})=>(
      <Text style={css.text}>
        {item.clientName}
        <TouchableOpacity style={css.btnEdit} onPress={() => {setEdicao(true); getClient(item.clientId)}}>
          <Text style={css.btnLoginText}>EDITAR   </Text>
        </TouchableOpacity>
        <TouchableOpacity style={css.btnDelete} onPress={()=> showAlert(item.clientId, item.clientName)}>
          <Text style={css.btnLoginText}>EXCLUIR</Text>
        </TouchableOpacity>
      </Text>
    )}
    />

  :
  <View style={css.editar}>
    <TextInput
    inputMode="text"
    style={css.input}
    value={clientNome}
    onChangeText={(digitado)=> setNome(digitado)}
    placeholderTextColor="black"   
    />
    <TextInput
    inputMode="email"
    style={css.input}
    value={clientEmail}
    onChangeText={(digitado)=> setEmail(digitado)}
    placeholderTextColor="black"   
    />
    <TextInput
    inputMode="text"
    secureTextEntry={true}
    style={css.input}
    value={clientGenere}
    onChangeText={(digitado)=> setGenere(digitado)}
    placeholderTextColor="black"    
    />
    <TouchableOpacity styele={css.btnCreate} onPress={()=>editClient()}>
      <Text styel={css.btnLoginText}>SALVAR</Text>
    </TouchableOpacity>
  </View>

}
</View>
  )}


  const css = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      marginTop: 20,
      padding: 10,
    },
    flat: {
      width: '100%',
    },
    text: {
      fontSize: 16,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btnEdit: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginRight: 5,
    },
    btnDelete: {
      backgroundColor: '#f44336',
      padding: 10,
      borderRadius: 5,
    },
    btnLoginText: {
      color: 'white',
      fontWeight: 'bold',
    },
    editar: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    btnCreate: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    searchBox: {
      width: '80%',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      marginBottom: 25,
      color: 'white',
      backgroundColor: 'gray',
    },
  });