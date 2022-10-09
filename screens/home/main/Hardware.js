import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Card, Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { hardware } from './../../../data';

const Hardware = ({ navigation }) => {
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState(hardware);
  const [backup, setBackup] = useState(hardware);

  const LeftContent = props => <Avatar.Icon {...props} icon="desktop-tower-monitor" />

  const route = useRoute();

  const filterData = (text) => {
    const query = backup.filter((item) => {
      //item.title.toLowerCase().includes(txt) || item.subTitle.toLowerCase().includes(txt) || item.logo.toLowerCase().includes(txt)
      const item_data = `${item.title.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearch(text);
    setData(query);
    console.log(query);
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
          style={{marginBottom:20}}
          placeholder="Rechercher..."
          onChangeText={(text) => filterData(text)}
          value={search}
        />
        {
          data.map((item, index) => (
            <Card style={{marginBottom: 10}} key={index} onPress={() => navigation.navigate("HardwareForm",{data:item, id:route.params.user._id})}>
              <Card.Title title={item.title} subtitle={item.subTitle} left={LeftContent} />
              <Card.Cover source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/340/541/274/pc-gaming-computer-pc-cases-technology-hardware-wallpaper-preview.jpg' }} />
            </Card>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Hardware