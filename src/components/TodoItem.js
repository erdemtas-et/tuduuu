import { View, Text , StyleSheet, Dimensions, TouchableOpacity, Image, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { deleteTodo, updateCompletedDate, updateTodo } from '../firebase/database';
import { useTodo } from '../context/TodoContext';
import { getTodayDate, isTaskLate } from '../utils/util';

const windowWidth = Dimensions.get('window').width;

export default function TodoItem({todo}) {
    // Hooks
    const navigation = useNavigation()
    
    const {todos,setTodos} = useTodo()

    //Complete the task
    const handleComplete = (id) => {
        todo.completed = !todo.completed
        updateTodo(id,todo.completed)
        
        if(todo.completed) {
            todo.completedDate = getTodayDate()
            updateCompletedDate(id,todo.completedDate)
        } else {
            todo.completedDate = ''
            updateCompletedDate(id, todo.completedDate)
        }

        const updatedTodo = todos.find(todo => todo.id === id)

        setTodos(todos.map(todo => {
            return todo.id === id ? updatedTodo : todo
        }))
    }

    //Edit the todo
    const handleEdit = () => {
     navigation.navigate('TodoEditScreen',{todo})
    }

    //Delete the todo
    const handleDelete = (id) => {
        //Confirmatio
        Alert.alert('Are you sure to delete?', '',[
            {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Delete', onPress: () => {
                deleteTodo(id)
                setTodos(todos.filter(todo => {
                    return todo.id !== id
                }))
              }},
        ])
       
    }

    const todoBorderStyle = () => {
        //normal is that deadline must be bigger or same as completed date
       const result = isTaskLate(todo.deadline,todo.completedDate,todo)

       if (result === -1) {
           return [styles.incompleteBorder,styles.todoContainer]
        } else if (result === 1) {
            return [styles.completedBorder,styles.todoContainer]
        } else if(result === 0) {
            return [styles.lateBorder,styles.todoContainer]
      }
    }

  return (
    <View style={todoBorderStyle()}>
    <View>
         <Text style={todo.completed ? [styles.completedText, styles.titleText] : styles.titleText}>{todo.title}</Text> 
         <Text style={todo.completed ? [styles.completedText, styles.detailsText] : styles.detailsText}>{todo.details}</Text> 
         {todo.deadline && <Text style={styles.dateText}>Deadline: {todo.deadline}</Text>}
         {todo.completedDate !== "" && <Text style={styles.date}>Completed Date: {todo.completedDate}</Text>}
         </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleComplete(todo.id)}>
        <Image style={{width: 20, height: 20}} source={require("../assets/checkmark.png")}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit(todo.id)}>
        <Image style={{width: 20, height: 20}} source={require("../assets/edit.png")}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(todo.id)}>
        <Image style={{width: 20, height: 20}} source={require("../assets/recycle-bin.png")}/>
        </TouchableOpacity>

      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    todoContainer : {
        width : windowWidth - 20,
        height: 150,
        borderRadius: 10,
        margin : 10,
        padding: 20,
        backgroundColor: 'white',
        flexDirection : "row",
        justifyContent: "space-between",
    },
    titleText : {
        color: "#2b2d42",
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600'
    },
    completedText: {
        textDecorationLine : "line-through"
    },
    detailsText: {
        color: "#2b2d42",
        marginBottom: 5
    },
  
    buttonContainer : {
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    },
    completedBorder : {
        borderBottomWidth: 10,
        borderBottomColor : '#228b22'
    },
    incompleteBorder : {
        borderBottomWidth: 10,
        borderBottomColor : '#d0312d'
    },
    lateBorder: {
        borderBottomWidth: 10,
        borderBottomColor : '#ffd700'
    },
    dateText : {
        color: "#2b2d42",
        marginBottom: 5,
        fontWeight: '600'
    }
})
