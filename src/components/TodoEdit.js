import React,{useState,useEffect} from 'react'
import { Formik } from 'formik'
import { TextInput,Text,TouchableOpacity,View,Button,StyleSheet } from 'react-native'
import { globalStyle } from '../styles/globalStyle'
import { useUser } from '../context/UserContext'
import { formatDateToISOString } from '../utils/util'
import {  editedTodo } from '../firebase/database'
import { useTodo } from '../context/TodoContext'
import { useRoute } from '@react-navigation/native'
import * as Yup from "yup"
import DatePicker from './DatePicker'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

export default function TodoEdit({navigation}) {

  const route = useRoute()

  const {params} = route

  //Hooks
  const [date,setDate] = useState(new Date(formatDateToISOString(params.todo.deadline)))
  const {setTodos} = useTodo()


  //Submit the form
  const handleSubmit =  async(props) => {

 await editedTodo(params.todo.id,
    props.title,
    props.details,
    date.toLocaleDateString('en-GB')
    
)

const newTodo = {
    ...params.todo,
    title: props.title,
    details: props.details,
    deadline : date.toLocaleDateString('en-GB')
}

setTodos(todos => todos.map(todo => todo.id === params.todo.id ? newTodo : todo ))

navigation.navigate('Home')
    
  }

    return (
        <Formik 
        onSubmit={handleSubmit}
        initialValues={{title: params.todo.title, details: params.todo.details}}
        validationSchema={validationSchema}
        >
      {(props) => {
          return (
              <View>
              <TextInput style={globalStyle.formInput}  
              placeholder='Title:' 
              placeholderTextColor="lightgray"
              onChangeText={props.handleChange("title")} 
              autoCapitalize='none'
              autoCorrect={false}
              value={props.values.title}/>   

              {props.values.title.length === 0 && <Text style={{ color: 'red', textAlign : "center" }}>{props.errors.title}</Text>}
  
              <TextInput style={globalStyle.formInput} 
              placeholder='Details: (Optional)' 
              placeholderTextColor="lightgray"
              onChangeText={props.handleChange("details")} 
              value={props.values.details}/>

              <DatePicker date={date} setDate={setDate} />
  
              <TouchableOpacity
              style={{
                ...globalStyle.formInput,
                backgroundColor: '#ef233c',
                marginTop: 10,
              }}
              onPress={props.handleSubmit}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Update Todo</Text>
            </TouchableOpacity>
              </View>
          )
      }}
        </Formik>
)}


