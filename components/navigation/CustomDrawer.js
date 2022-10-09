import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import{ DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {

  const toast = useToast();
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(()=> {
    userData();
  }, [])
  
  const userData = async () => {
    let user = await AsyncStorage.getItem('@user');
    user = JSON.parse(user)
    setName(user.prenom);
    setSurname(user.nom);
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      props.navigation.navigate("Signin");

    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <ImageBackground 
          source={require('./../../assets/menu-bg.jpg')}
          style={{padding:20}}
        >
          <Image 
            source={require('./../../assets/user-profile.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}} 
          />
          <Text
            style={{
            color: '#fff',
            fontSize: 18,
            marginBottom: 5,
            }}
          >
            { name + " " + surname}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              Connecté
            </Text>
            <Ionicons name="shield-checkmark" size={16} color="#27AE60" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={
          logout
        } style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Se déconnecter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CustomDrawer