import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Text from '@kaloraat/react-native-text';
import { TextInput, Button } from 'react-native-paper'
import { Logo } from './../../components';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import {API} from './../../configs';

const Signup = ({ navigation }) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const invokeSignup = async () => {
    setLoading(true)
    if(!name) {
      toast.show("Name is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }
    else if(!surname) {
      toast.show("Surname is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }
    else if(!email) {
      toast.show("Email is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }
    else if(!password) {
      toast.show("Password is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else {
      try {
        await axios.post(`${API}/auth/signup`, {
          nom:surname, 
          prenom:name, 
          email:email, 
          password:password, 
          role:"user"
        }).then((response) => {
          //console.log(response.data.success);
          if(response.data.success) {
            toast.show(response.data.message, {
              type: "success",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
            setName("");
            setSurname("");
            setEmail("");
            setPassword("");
            navigation.navigate("Signin");
          }else {
            toast.show(response.data.message, {
              type: "danger",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
          }
        })
        setLoading(false);
      } catch (err) {
        toast.show(err, {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        setLoading(false);
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style={{ marginVertical:50, flex: 1, marginHorizontal:20  }}>
        <Logo />
        <Text title center>S'inscrire</Text>

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Nom"
          value={surname}
          onChangeText={text => setSurname(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Prénom"
          value={name}
          onChangeText={text => setName(text)}
        />

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
          onPress={invokeSignup}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          S'inscrire
        </Button>

        <Text small center>
          Déjà inscrit ? <Text onPress={() => navigation.navigate("Signin")} color="#ff2222">S'identifier</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

export default Signup