import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { Avatar, Card, TextInput, Button, Title, Paragraph } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { Src24, Src26, ContactMethod, Urgency } from '../../../data'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API} from '../../../configs';
import { DropdownPicker } from '../../../components';

const AppForm = () => {

  const [description, setDescription] = useState("");
  const [src24, setSrc24] = useState("");
  const [src25, setSrc25] = useState("");
  const [src26, setSrc26] = useState("");
  const [contact, setContact] = useState("");
  const [urgency, setUrgency] = useState("");
  const [requestedFor, setRequestedFor] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const LeftContent = props => <Avatar.Icon {...props} icon="robot" />

  const handleSubmit = async () => {
    setLoading(true)
    if(!description) {
      toast.show("Description is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!src24){
      toast.show("SRC24 is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!src25){
      toast.show(" SRC25 is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!src26){
      toast.show("SRC26 is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!contact){
      toast.show("Contact is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!urgency){
      toast.show("Urgency is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    } else if(!requestedFor){
      toast.show("requested For is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!reference){
      toast.show("Reference is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else if(!file){
      toast.show("Attachement is required", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else{
      try {
        const formData = new FormData();
        formData.append("userId", route.params.id)
        formData.append("title", route.params.data.title);
        formData.append("description",description);
        formData.append("src24",src24);
        formData.append("src25",src25);
        formData.append("src26",src26);
        formData.append("contact",contact);
        formData.append("urgency",urgency);
        formData.append("requestedFor",requestedFor);
        formData.append("reference",reference);
        formData.append("file",file);
        console.log(formData)
        const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };

        await fetch(`${API}/app/add`, options)
        .then(response => {
          toast.show("Application Complain added successfully!", {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
          })
          setLoading(false);
          setDescription("");
          setSrc24("");
          setSrc25("");
          setSrc26("");
          setContact("");
          setUrgency("");
          setRequestedFor("");
          setReference("");
          setFile();
        })
        console.log(formData)
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
  }

  const uploadFile =  async () => {
    setToggle(true)
    const res = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true })
    .then(response => {
      if (response.type == 'success') {          
        let { name, size, uri, mimeType } = response;
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: mimeType
        };
        //console.log(fileToUpload, '...............file')
        setFile(fileToUpload);
        //console.log(file.uri)
        setToggle(false)
      } 
    });

  }

  return (
    <ScrollView contentContainerStyle={{justifyContent: "center"}}>
      <View style={{flex:1, marginHorizontal:20, marginVertical:50,}}>
        <Card style={{marginBottom:20}}>
          <Card.Title title={route.params.data.logo} titleNumberOfLines={2} subtitle={route.params.data.title} subtitleNumberOfLines={2} left={LeftContent} />
          <Card.Content>
            <Title>Details </Title>
            <Paragraph>{route.params.data.subTitle}</Paragraph>
          </Card.Content>
        </Card>

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Title"
          value={route.params.data.title}
          disabled={true}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Description *"
          value={description}
          multiline={true}
          numberOfLines={6}
          onChangeText={text => setDescription(text)}
        />

        <Text large light style={{marginTop:10, marginBottom:10}}>CONTACT INFORMATION</Text>
          <DropdownPicker
            title="Message srcconfig-26 Could not be found *"
            data={Src26}
            value={src26}
            setValue={setSrc26}
          />
          <DropdownPicker
            title="Contact Method *"
            data={ContactMethod}
            value={contact}
            setValue={setContact}
          />
          <DropdownPicker
            title="Message srcconfig-24 Could not be found *"
            data={Src24}
            value={src24}
            setValue={setSrc24}
          />
        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Message srcconfig-25 Could not be found *"
          value={src25}
          onChangeText={text => setSrc25(text)}
        />

        <Text large light style={{marginTop:10, marginBottom:10}}>ADDITIONAL INFORMATION</Text>
        <DropdownPicker
          title="Urgency *"
          data={Urgency}
          value={urgency}
          setValue={setUrgency}
        />

        <Text large light style={{marginTop:10, marginBottom:10}}>REQUEST DETAILS</Text>
        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Requested For *"
          value={requestedFor}
          onChangeText={text => setRequestedFor(text)}
        />
        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeOutlineColor="#ff9900"
          mode="flat"
          label="Reference *"
          value={reference}
          onChangeText={text => setReference(text)}
        />

        <Button 
          mode="contained" 
          compact={false} 
          color="#222"
          loading={toggle}
          onPress={uploadFile}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
            <Text bold medium center color="#FFF">
              Add Attachement <Ionicons name="file-tray-outline" size={22} color="#FFF"/>
            </Text>
        </Button>

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

export default AppForm