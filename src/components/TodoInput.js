import React,{useState,useEffect} from 'react'
import { Formik } from 'formik'
import { TextInput,Text,TouchableOpacity, SafeAreaView } from 'react-native'
import { globalStyle } from '../styles/globalStyle'
import { useUser } from '../context/UserContext'
import { addTodo } from '../firebase/database'
import { useTodo } from '../context/TodoContext'
import { useRoute } from '@react-navigation/native'
import * as Yup from "yup"
import DatePicker from './DatePicker'
import { formatDateToISOString, getTodayDate } from '../utils/util'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

export default function TodoInput({navigation}) {

  //Hooks
  const [date,setDate] = useState(new Date())
  const {user} = useUser()
  const {setTodos} = useTodo()


  //Submit the form
  const handleSubmit =  async(props,{resetForm}) => {
    const newTodo = {
      title : props.title,
      details : props.details,
      user_id : user.uid,
      completed : false,
      deadline: date.toLocaleDateString('en-GB'),
      completedDate: ''
    }

   const docRef = await addTodo(newTodo)

   newTodo.id = docRef.id
    setTodos(todosPrev => [newTodo,...todosPrev])
    navigation.navigate("Home")

    resetForm()
    

    
  }

    return (
        <Formik 
        onSubmit={handleSubmit}
        initialValues={{title: '',details: ''}}
        validationSchema={validationSchema}
        >
      {(props) => {
          return (
            
              <SafeAreaView style={globalStyle.container}>
              <TextInput style={globalStyle.formInput}  
              placeholder='Title:' 
              placeholderTextColor="gray"
              onChangeText={props.handleChange("title")} 
              autoCapitalize='none'
              autoCorrect={false}
              value={props.values.title}/>   

              {props.values.title.length === 0 && <Text style={{ color: 'red', textAlign : "center" }}>{props.errors.title}</Text>}
  
              <TextInput style={globalStyle.formInput} 
              placeholder='Details: (Optional)' 
              placeholderTextColor="gray"
              onChangeText={props.handleChange("details")} 
              value={props.values.details}/>

              <DatePicker date={date} setDate={setDate} />
  
              <TouchableOpacity
              style={{
                ...globalStyle.formInput,
                backgroundColor: '#ef233c',
                marginTop: 10,
                borderWidth : 0
              }}
              onPress={props.handleSubmit}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Add New Todo</Text>
            </TouchableOpacity>
              </SafeAreaView>
          )
      }}
        </Formik>
)}


