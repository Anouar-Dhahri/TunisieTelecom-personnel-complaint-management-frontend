import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Text from '@kaloraat/react-native-text';
import { Avatar, Card, TextInput, Button, Title, Paragraph } from 'react-native-paper'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import {API} from '../../../configs';
import { Src24, Urgency } from '../../../data'
import { DropdownPicker } from '../../../components';

const SoftwareForm = ({ navigation }) => {

  const [requestedFor, setRequestedFor] = useState("");
  const [machineName, setMachineName] = useState("");
  const [region, setRegion] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();
  
  const LeftContent = props => <Avatar.Icon {...props} icon="microsoft" />
  
  const handleSubmit = async () => {
    setLoading(true)
    if(!region) {
      toast.show('Region is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }else if(!requestedFor) {
      toast.show('requestedFor is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }
    else if(!machineName) {
      toast.show('Machine name is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }else if(!urgency) {
      toast.show('Urgency is required !', {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
      setLoading(false)
      return;
    }
    try {
      await axios.post(`${API}/software/add`, {
        userId:route.params.id,
        softwareName:route.params.data.subTitle,
        requestedFor:requestedFor, 
        machineName:machineName,
        region: region,
        urgency: urgency
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
          setRequestedFor("");
          setMachineName("");

        }else{
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
      console.log(err)
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{justifyContent: "center"}}>
      <View style={{flex:1, marginHorizontal:20,  marginVertical:50, justifyContent: "center"}}>
        <Card style={{marginBottom:20}}>
          <Card.Title title={route.params.data.subTitle} titleNumberOfLines={2} subtitle={route.params.data.title} subtitleNumberOfLines={2} left={LeftContent} />
          <Card.Content>
            <Title>Details </Title>
            <Paragraph>{route.params.data.subTitle}</Paragraph>
          </Card.Content>
        </Card>
        <Text large light style={{marginTop:10, marginBottom:10}}>REQUEST DETAILS</Text>

        <DropdownPicker
          title="Région: *"
          data={Src24}
          value={region}
          setValue={setRegion}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Requested For: *"
          value={requestedFor}
          onChangeText={text => setRequestedFor(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Machine Name: *"
          value={machineName}
          onChangeText={text => setMachineName(text)}
        />

        <DropdownPicker
          title="Urgency *"
          data={Urgency}
          value={urgency}
          setValue={setUrgency}
        />

        <Button 
          mode="contained" 
          compact={false} 
          color="#ff9900"
          loading={loading}
          onPress={handleSubmit}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          Validation
        </Button>
      </View>
    </ScrollView>
  )
}

export default SoftwareForm