import { Text,StyleSheet, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { globalStyle } from '../../styles/globalStyle'
import { StatusBar } from 'expo-status-bar';

export default function Welcome({navigation}) {

  return (
      <SafeAreaView style={globalStyle.container}>
      <StatusBar style='dark'/>
      <Text style={styles.splashText}>Tuduuu</Text>
      <Image style={globalStyle.authLogo} source={require('../../assets/mobile-guy.png')}/>
      <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => navigation.navigate("SignUp")}
    >
      <Text style={{ color: 'black', textAlign: 'center' }}>Register</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => navigation.navigate("SignIn")}
  >
    <Text style={{ color: 'black', textAlign: 'center' }}>Login</Text>
  </TouchableOpacity>
      
      </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    buttonStyle : {
        ...globalStyle.formInput,
        backgroundColor: '#edf2f4',
        marginTop: 10,
        borderRadius : 10
    },
    splashText : {
      color: '#2b2d42',
      fontSize: 36,
      marginBottom: 42,
      fontWeight: 'bold'
    }
})
