import React from 'react';
import { View, StatusBar, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import TodoScreen from '../screens/Main/TodoScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TodoEditScreen from '../screens/Main/TodoEditScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UserTabGroup() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTintColor: '#2b2d42',
      headerTitleStyle: { fontSize: 32 },
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffff',
        borderRadius: 15,
        height: 80,
        ...styles.shadow,
      },
    }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                borderTopWidth: focused ? 5 : 0,
                borderRadius: 6,
                padding: focused ? 8 : 0,
              }}
            >
              <Image
                source={
                  focused
                    ? require('../assets/home-filled.png')
                    : require('../assets/home.png')
                }
                resizeMode='contain'
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
          title: 'Todos',
        }}
      />

      <Tab.Screen
        name='TodoScreen'
        component={TodoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                ...styles.shadow,
              }}
            >
              <Image
                source={require('../assets/add.png')}
                resizeMode='contain'
                style={{ width: 70, height: 70, position: 'absolute', top: -60 }}
              />
            </View>
          ),
          title: 'Add',
        }}
      />

      <Tab.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                borderTopWidth: focused ? 5 : 0,
                borderRadius: 6,
                padding: focused ? 8 : 0,
              }}
            >
              <Image
                source={
                  focused
                    ? require('../assets/settings-filled.png')
                    : require('../assets/settings.png')
                }
                resizeMode='contain'
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

const UserStack = () => {
  return (
    <NavigationContainer>
    <StatusBar style='light'/>
      <Stack.Navigator    screenOptions={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTintColor: '#2b2d42',
        headerTitleStyle: { fontSize: 32 },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffff',
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}  initialRouteName='TabGroup'>
        <Stack.Screen options={{headerShown : false}} name='TabGroup' component={UserTabGroup} />
        <Stack.Screen options={{headerTransparent: true, headerTitle: 'Edit', headerBackTitle : ''}} name='TodoEditScreen' component={TodoEditScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default UserStack;
