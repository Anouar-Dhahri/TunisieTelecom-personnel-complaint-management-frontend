import React, {useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Account, Hardware, Software, UpdateAccount, Application } from './../../screens'
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {

  const route = useRoute();
  useEffect(() => {
    console.log(route.params.user)
  }, [])
  return (
    <Tab.Navigator
      initialRouteName='Account'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Account') {
            iconName = focused
              ? 'rocket-outline'
              : 'md-rocket-outline';
          } else if (route.name === 'Software') {
            iconName = focused 
              ? 'logo-windows' 
              : 'ios-logo-windows';
          } else if (route.name === 'Hardware') {
            iconName = focused 
              ? 'hardware-chip-outline' 
              : 'ios-hardware-chip-outline';
          } else if (route.name === 'Update Account') {
            iconName = focused 
              ? 'layers-outline' 
              : 'ios-layers-outline';
          } else if (route.name === 'Application') {
            iconName = focused 
              ? 'settings-outline' 
              : 'ios-settings-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3498DB',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 70}
      })}
    >
      <Tab.Screen initialParams={{user: route.params.user}} name="Account" component={Account} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Software" component={Software} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Hardware" component={Hardware} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Update Account" component={UpdateAccount} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Application" component={Application} />
    </Tab.Navigator>
  )
}

export default TabNavigation