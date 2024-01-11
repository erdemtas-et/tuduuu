import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/Auth/Welcome'
import Signin from '../screens/Auth/Signin'
import Signup from '../screens/Auth/Signup'

const Stack = createStackNavigator()

export default function AuthStack() {
  return (
 <NavigationContainer>
    <Stack.Navigator  screenOptions={{headerBackTitleVisible : false, headerTintColor: '#2b2d42'}} >
        <Stack.Screen name='Welcome' component={Welcome} options={{headerTransparent : true, headerTitle: ""}} />
        <Stack.Screen name='SignIn' component={Signin} options={{headerTransparent : true, headerTitle: ""}}/>
        <Stack.Screen name='SignUp' component={Signup} options={{headerTransparent : true, headerTitle: ""}} />
    </Stack.Navigator> 
 </NavigationContainer>
  )
}