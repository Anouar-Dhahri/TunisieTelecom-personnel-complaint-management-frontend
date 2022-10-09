import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';

import TabNavigation from './TabNavigation';
import CustomDrawer from './CustomDrawer';
import RequestTabNavigation from './RequestTabNavigation';

import { Cart, Profile, Approval } from './../../screens'

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {

  const toast = useToast();
  const route = useRoute();

  useEffect(()=> {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null || value == undefined ) {
        toast.show("Unauthorized, Please Sign In !", {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        navigation.navigate("Signin");
      }
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        //headerShown: false,
        drawerActiveBackgroundColor: '#3498DB',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor:'#333',
        drawerLabelStyle: {
          fontSize:15,
          marginLeft: -25,
        }
      }}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Accueil" 
        component={TabNavigation} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="home-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Cart" 
        component={Cart} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="cart-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Demandes" 
        component={RequestTabNavigation} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="list-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Apprové" 
        component={Approval} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="md-checkmark-done-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Profil" 
        component={Profile} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation