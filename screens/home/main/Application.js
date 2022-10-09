import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Card, Paragraph, Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { application } from './../../../data';

const Application = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [data, setData] = useState(application);
  const [backup, setBackup] = useState(application);

  const LeftContent = props => <Avatar.Icon {...props} icon="robot" />

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
            <Card style={{marginBottom: 10}} key={index} onPress={() => navigation.navigate("AppForm", {data:item, id:route.params.user._id})}>
              <Card.Title title={item.logo} subtitle={item.title} left={LeftContent} />
              <Card.Content>
                <Paragraph>{item.subTitle}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://blog.capterra.com/wp-content/uploads/2020/06/be-an-informed-buyer-understanding-the-cost-of-bus.png' }} />
            </Card>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Application