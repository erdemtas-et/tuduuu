import { View, Text, Image, ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import AuthStack from '../stacks/authStack'
import UserStack from '../stacks/userStack'
import { useUser } from '../context/UserContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { globalStyle } from '../styles/globalStyle'

export default function RootNavigation() {

const { user,setUser } = useUser()
const [loading, setLoading] = useState(true)

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
    setUser(user);
    } else {
    setUser(undefined)
    }
    setLoading(false)
    });
   
    }, [user]);

    if (loading) {
      return (
        <View style={globalStyle.container}>
          <Image style={globalStyle.authLogo} source={require('../assets/list.png')} />
          <ActivityIndicator size="large" color="gray" />
        </View>
      )
    }

  return (
    <View style={{flex : 1}} >
      {user ? <UserStack/> : <AuthStack/>}
    </View>
  )
}

