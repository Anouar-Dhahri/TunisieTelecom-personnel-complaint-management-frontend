import { View } from 'react-native'
import React, { useState }from 'react'
import Text from '@kaloraat/react-native-text';
import { TextInput, Button } from 'react-native-paper'
import { Logo } from './../../components';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './../../configs';

const Signin = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const storeData = async (token, user) => {
    try {
      const userObject = JSON.stringify(user);
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@user', userObject);
      navigation.navigate("Hello", {user: user});
    } catch (e) {
      console.log(e);
    }
  }

  const invokeSignin = async () => {
    setLoading(true)
    if(!email) {
      toast.show('Email is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }
    else if(!password) {
      toast.show('Password is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }else {
      try {
        await axios.post(`${API}/auth/signin`, {
          email,
          password
        }).then((response) => {
          if(response.data.success) {
            toast.show(response.data.message, {
              type: "success",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
            console.log(response.data.token);
            storeData(response.data.token, response.data.user)
            setEmail("");
            setPassword("");

          }else{
            toast.show(response.data.message, {
              type: "danger",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            });
            setLoading(false);
          }
        })
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:20 }}>
      <Logo />
      <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          secureTextEntry={true} 
          mode="flat"
          label="Mot de passe"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button 
          mode="contained" 
          compact={false} 
          color="#ff9900"
          loading={loading}
          onPress={invokeSignin}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          connexion
        </Button>
      <Text small center>
        Pas encore enregistré ? <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">S'inscrire</Text>
      </Text>
    </View>
  )
}

export default Signin