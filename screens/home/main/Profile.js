import { View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Text from '@kaloraat/react-native-text';
import { TextInput, Button } from 'react-native-paper'
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import {API} from './../../../configs';

const Profile = ({ navigation }) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const updateProfile = async () => {
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
        await axios.put(`${API}/auth/profile/${route.params.user._id}`, {
          nom:surname,
          prenom:name, 
          email:email, 
          password:password, 
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
        <Text title center>Profil</Text>

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Nom"
          value={name}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Prénom"
          value={surname}
          onChangeText={text => setSurname(text)}
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
          onPress={updateProfile}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          enregistrer
        </Button>

      </View>
    </ScrollView>
  )
}

export default Profile