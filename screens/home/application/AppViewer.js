import { View, ScrollView } from 'react-native'
import React from 'react'
import Text from '@kaloraat/react-native-text';
import { Avatar, Card, Title, Paragraph, DataTable } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';

const AppViewer = () => {

  const LeftContent = props => <Avatar.Icon {...props} icon="robot" />
  const route = useRoute();

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style={{flex:1, marginHorizontal:20, marginVertical:50,justifyContent: "center"}}>
        <Card style={{marginBottom:20}}>
          <Card.Title title={route.params.item.categorie} subtitle={route.params.item.createdAt} titleNumberOfLines={2} subtitleNumberOfLines={2} left={LeftContent} />
          <Card.Content>
            <Title>Details </Title>
            <Paragraph>{route.params.item.title}</Paragraph>
          </Card.Content>
        </Card>
        <Text large light style={{marginTop:10, marginBottom:10}}>REQUEST DETAILS</Text>
        <DataTable>

          <DataTable.Row>
            <DataTable.Cell>Description :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.description}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Src24 :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.src24}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Src 25 :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.src25}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Src 26 :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.src26}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Contact :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.contact}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Urgency :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.urgency}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Requested For :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.requestedFor}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Référence :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.reference}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Attachement :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.attachement.name}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Statut :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.requestStatus}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Apprové :</DataTable.Cell>
            <DataTable.Cell>{route.params.item.approved.toString()}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  )
}

export default AppViewer