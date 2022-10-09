import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Card, Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { software } from './../../../data';

const Software = ({ navigation }) => {
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState(software);
  const [backup, setBackup] = useState(software);

  const LeftContent = props => <Avatar.Icon {...props} icon="microsoft" />

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
            <Card style={{marginBottom:10}} key={index} onPress={() => navigation.navigate("SoftwareForm", {data:item, id:route.params.user._id})}>
              <Card.Title title={item.subTitle} subtitle={item.title} left={LeftContent} />
              <Card.Cover source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/150/566/471/window-universe-wallpaper-preview.jpg' }} />
            </Card>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Software