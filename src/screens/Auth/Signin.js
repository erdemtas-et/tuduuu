import { SafeAreaView, Image, Alert,ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import FormikInput from '../../components/FormikInput'
import { globalStyle } from '../../styles/globalStyle'
import { login } from '../../firebase/userAuthentication'

export default function Signin() {

  const [errorMessage,setErrorMessage] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

const handleSignIn = async(values) => {
  setIsLoading(true)
  try {
   await login(values.email,values.password)
   
  } catch (error) {
    setErrorMessage(error.message)
}
setIsLoading(false)
} 
 

  return (
    <SafeAreaView style={globalStyle.container}>
    <Image style={globalStyle.authLogo} source={require('../../assets/list.png')} />
      <FormikInput handleOnSubmit={handleSignIn} buttonTitle="Login"/>
     {isLoading && <ActivityIndicator size="large" color="gray" />}
      {errorMessage &&  Alert.alert("Couldn't login with the user.", `${errorMessage}`,[ {text: 'OK', onPress: () => setErrorMessage(null)}])}
    </SafeAreaView>
  )
}