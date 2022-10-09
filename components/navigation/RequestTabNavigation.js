import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Open, Closed, RequireAction } from './../../screens'
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const RequestTabNavigation = ({navigation}) => {

  const route = useRoute();
  
  return (
    <Tab.Navigator
      initialRouteName='Open'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Ouvert') {
            iconName = focused
              ? 'ios-timer-outline'
              : 'md-timer-outline';
          } else if (route.name === 'Fermé') {
            iconName = focused 
              ? 'ios-lock-closed-outline' 
              : 'lock-closed-outline';
          } else if (route.name === 'Action') {
            iconName = focused 
              ? 'alert-circle-outline' 
              : 'ios-alert-circle-outline';
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
      <Tab.Screen initialParams={{user: route.params.user}} name="Ouvert" component={Open} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Fermé" component={Closed} />
      <Tab.Screen initialParams={{user: route.params.user}} name="Action" component={RequireAction}/>
    </Tab.Navigator>
  )
}

export default RequestTabNavigation