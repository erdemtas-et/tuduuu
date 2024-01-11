import { SafeAreaView,Image, Alert,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FormikInput from '../../components/FormikInput'
import { globalStyle } from '../../styles/globalStyle'
import { register } from '../../firebase/userAuthentication'



export default function Signup() {

  const [errorMessage,setErrorMessage] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

    const handleSignUp =  async (values) => {
      setIsLoading(true)
      try {
       await register(values.email, values.password)
      }catch(error) {
       setErrorMessage(error.message)
      }
      setIsLoading(false)
    }

    
  return (
    <SafeAreaView style={globalStyle.container} >
    <Image style={globalStyle.authLogo} source={require('../../assets/list.png')} />
      <FormikInput handleOnSubmit={handleSignUp} buttonTitle="Register"/>
      {isLoading && <ActivityIndicator size="large" color="gray" />}
      {errorMessage &&  Alert.alert("Couldn't register with the user.", `${errorMessage}`,[ {text: 'OK', onPress: () => setErrorMessage(null)}])}
    </SafeAreaView>
  )
}
