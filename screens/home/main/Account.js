import { View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, Card, Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { account } from './../../../data';

const Account = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [data, setData] = useState(account);
  const [backup, setBackup] = useState(account);

  const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />

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
            <Card style={{marginBottom: 10}} key={index} onPress={() => navigation.navigate("AccountForm", {data: item, id:route.params.user._id})}>
              <Card.Title title={item.logo} subtitle={item.title} left={LeftContent} />
              <Card.Cover source={{ uri: 'https://c0.wallpaperflare.com/preview/812/951/702/accounting-application-bankbook-business.jpg' }} />
            </Card>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Account