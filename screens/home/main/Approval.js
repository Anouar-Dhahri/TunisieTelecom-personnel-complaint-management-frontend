import { View,ScrollView } from 'react-native'
import React, {useState, useCallback } from 'react'
import { Avatar, Card, Title, Paragraph, Searchbar, Button } from 'react-native-paper';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import Text from '@kaloraat/react-native-text';
import { API } from './../../../configs';

const Approval = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [backup, setBackup] = useState([]);
  const [data, setData] = useState([]);
  const LeftContent = props => <Avatar.Icon {...props} icon="check-decagram" />

  const route = useRoute();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchData()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const fetchData = async () => {
    //const token = await AsyncStorage.getItem('@token');
    await axios.get(`${API}/data/request/approved/${route.params.user._id}`)
    .then(res => {
      setData(res.data.approved); 
      setBackup(res.data.approved);
    });
  }

  const filterData = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.categorie.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearch(text);
    setData(query);
    console.log(query); 
  }

  const redirectPage = (item) => {
    if(item.categorie == "DEMANDE DE NOUVEAU COMPTE") {
      navigation.navigate("AccountViewer", {item:item});
    }else if(item.categorie == "DEMANDE D'ÉQUIPEMENT"){
      navigation.navigate("HardwareViewer", {item:item});
    }else if(item.categorie == "DEMANDE DE NOUVEAU SOFTWARE"){
      navigation.navigate("SoftwareViewer", {item:item});
    }else if(item.categorie == "MODIFICATION DE COMPTE"){
      navigation.navigate("UpdateAccountViewer", {item:item});
    }else if(item.categorie == "PROBLÈME APPLICATION"){
      navigation.navigate("AppViewer", {item:item});
    }
  }

  const deleteComplain = async(item) => {
    if(item.categorie == "DEMANDE DE NOUVEAU COMPTE") {
      await axios.delete(`${API}/account/delete/${item._id}`)
      .then(res => {
        if(res.data.success) {
          toast.show(res.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          fetchData();
        }else{
          toast.show(res.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
        }
      });
    }else if(item.categorie == "DEMANDE D'ÉQUIPEMENT"){
      await axios.delete(`${API}/hardware/delete/${item._id}`)
      .then(res => {
        if(res.data.success) {
          toast.show(res.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          fetchData();
        }else{
          toast.show(res.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
        }
      });
    }else if(item.categorie == "DEMANDE DE NOUVEAU SOFTWARE"){
      await axios.delete(`${API}/software/delete/${item._id}`)
      .then(res => {
        if(res.data.success) {
          toast.show(res.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          fetchData();
        }else{
          toast.show(res.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
        }
      });
    }else if(item.categorie == "MODIFICATION DE COMPTE"){
      await axios.delete(`${API}/updateaccount/delete/${item._id}`)
      .then(res => {
        if(res.data.success) {
          toast.show(res.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          fetchData();
        }else{
          toast.show(res.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
        }
      });
    }else if(item.categorie == "PROBLÈME APPLICATION"){
      await axios.delete(`${API}/app/delete/${item._id}`)
      .then(res => {
        if(res.data.success) {
          toast.show(res.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          fetchData();
        }else{
          toast.show(res.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
        }
      });
    }
  }
  
  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View 
        style={{
          marginHorizontal:20,
          marginVertical:30
        }}
      >
        <Searchbar
          style={{marginBottom:10, marginTop:10 }}
          placeholder="Rechercher..."
          onChangeText={(text) => filterData(text)}
          value={search}
        />
        <Text medium color="#06bcee" style={{marginBottom:10}}>Toutes les demandes approuvées {data.length}</Text>
        {
          data.map((item, index) => (
            <Card style={{marginBottom: 10}} key={index}>
              <Card.Title titleStyle={{fontSize:16, color:"#06bcee"}} titleNumberOfLines={2} title={item.categorie} subtitleStyle={{color:"#ff9900"}} subtitle={new Date(item.createdAt).toLocaleDateString()+" "+new Date(item.createdAt).toLocaleTimeString() } left={LeftContent} />
              <Card.Content>
                <Title style={{fontSize:14}}><Text color="#27AE60">Objectif :</Text> {item.accountType} {item.hardwareName} {item.softwareName } {item.title }</Title>
                <Paragraph><Text color="#27AE60">Requested For :</Text> {item.requestedFor}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => redirectPage(item)}>Détails</Button>
                <Button onPress={() => deleteComplain(item)}>Supprimer</Button>
              </Card.Actions>
            </Card>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Approval