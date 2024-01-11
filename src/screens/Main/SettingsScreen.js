import { View, Text,Dimensions,SafeAreaView ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useUser } from '../../context/UserContext'
import { logout } from '../../firebase/userAuthentication'
import { globalStyle } from '../../styles/globalStyle'
import { useTodo } from '../../context/TodoContext'
import { deleteAllTodos } from '../../firebase/database'

const windowWidth = Dimensions.get('window').width;

export default function SettingsScreen() {
  const {user} = useUser()
  const {todos,setTodos} = useTodo()

    const handleSignout = () => {
      logout()
    }

    const handleCleanTodos = () => {
      deleteAllTodos(user.uid)
      setTodos([])
    }

  return (
    <SafeAreaView style={globalStyle.container}>
    <View style={styles.userDetailsContainer}>
    <Text style={styles.userDetailsText}> Email: {user.email}</Text> 
    </View>
      <View style={styles.userDetailsContainer}> 
      <Text style={styles.userDetailsText}>User id: {user.uid}</Text>
      </View>
      <View style={styles.userDetailsContainer}> 
      <Text style={styles.userDetailsText}>You have {todos.length} todos.</Text>
      </View>

     {todos.length > 0 && <TouchableOpacity onPress={handleCleanTodos} style={styles.cleanTodosButton}>
      <Text style={{color: 'white'}}>Clean Todos</Text>
      </TouchableOpacity>}

     <TouchableOpacity onPress={handleSignout} style={styles.logoutButton}>
     <Text style={{color: 'white'}}>Sign out</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  userDetailsContainer : {
   borderBottomColor: '#2b2d42',
   borderBottomWidth: 3,
   padding: 20,
   width: windowWidth - 50
  },
  cleanTodosButton: {
    backgroundColor: '#2b2d42',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  logoutButton : {
    backgroundColor: '#ef233c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
    
  },
  userDetailsText: {
    color: '#2b2d42',
    textAlign : 'left'
  }
})