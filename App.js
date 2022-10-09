import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ToastProvider } from 'react-native-toast-notifications'

import {
  Signup, Signin,
  
  AccountForm, 
  AccountViewer,

  HardwareForm, HardwareViewer,

  SoftwareForm, SoftwareViewer,

  UpdateAccountForm, 
  UpdateAccountViewer,

  AppForm,
  AppViewer
} from './screens'

import { DrawerNavigation } from './components'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Signin' screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />

          <Stack.Screen name="Hello" component={DrawerNavigation} />

          <Stack.Screen name="AccountForm" component={AccountForm}/>
          <Stack.Screen name="AccountViewer" component={AccountViewer}/>

          <Stack.Screen name="HardwareForm" component={HardwareForm}/>
          <Stack.Screen name="HardwareViewer" component={HardwareViewer}/>

          <Stack.Screen name="SoftwareForm" component={SoftwareForm}/>
          <Stack.Screen name="SoftwareViewer" component={SoftwareViewer}/>

          <Stack.Screen name="UpdateAccountForm" component={UpdateAccountForm}/>
          <Stack.Screen name="UpdateAccountViewer" component={UpdateAccountViewer}/>

          <Stack.Screen name="AppForm" component={AppForm}/>
          <Stack.Screen name="AppViewer" component={AppViewer}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}