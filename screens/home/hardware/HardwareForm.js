import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Text from '@kaloraat/react-native-text';
import { Avatar, Card, TextInput, Button, Title, Paragraph } from 'react-native-paper'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioForm from 'react-native-simple-radio-button';
import {API} from '../../../configs';
import { radioButtonsData, Src24, Urgency } from '../../../data';
import { DropdownPicker } from '../../../components';

const HardwareForm = ({ navigation }) => {

  const [requestedFor, setRequestedFor] = useState("");
  const [atb, setAtb] = useState(false);
  const [besoin, setBesoin] = useState("");
  const [region, setRegion] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();
  
  const LeftContent = props => <Avatar.Icon {...props} icon="desktop-tower-monitor" />

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
    else if(!besoin) {
      toast.show('Nature Besoin is required !', {
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
      await axios.post(`${API}/hardware/add`, {
        userId:route.params.id,
        hardwareName:route.params.data.title,
        requestedFor:requestedFor, 
        atb:atb,
        natureBesoin:besoin,
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
          setAtb(!atb);
          setBesoin("");
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
      <View style={{flex:1, marginHorizontal:20,  marginVertical:50}}>
        <Card style={{marginBottom:20}}>
          <Card.Title title={route.params.data.title} titleNumberOfLines={2} subtitle={route.params.data.subTitle} subtitleNumberOfLines={2} left={LeftContent} />
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
        <BouncyCheckbox
            style={{ marginTop:10, marginBottom:10}}  
            size={25}
            fillColor="#ff9900"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "#ff9900" }}
            isChecked={atb}
            text="Acquisition par transfert de budget"
            onPress={() => setAtb(!atb)}
        />
        <View>
          <Text medium heavy>Nature du Besoin *</Text>
          <RadioForm
            style={{ marginTop:10, marginBottom:10}}  
            radio_props={radioButtonsData}
            initial={-1}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={'#ff9900'}
            buttonInnerColor={'#ff9900'}
            animation={true}
            onPress={(value) => {setBesoin(value)}}
          />
        </View>

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

export default HardwareForm