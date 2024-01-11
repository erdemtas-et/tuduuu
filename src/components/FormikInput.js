import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik  } from 'formik'
import { globalStyle } from '../styles/globalStyle'
import * as Yup from "yup"

export default function FormikInput({handleOnSubmit,buttonTitle}) {

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  
  return (
      <Formik 
      initialValues={{email : "", password:"" }}
      onSubmit={(values) => handleOnSubmit(values)}
      validationSchema={validationSchema}
      >
    {(props) => {
        return (
            <View>
            <TextInput style={globalStyle.formInput}  
            placeholder='Email address:' 
            placeholderTextColor="gray"
            onChangeText={props.handleChange("email")} 
            autoCapitalize='none'
            autoCorrect={false}
            value={props.values.email}/>

           {props.values.email && <Text style={{ color: 'red', textAlign : "center" }}>{props.errors.email}</Text>}

            <TextInput style={globalStyle.formInput} 
            placeholder='Password:' 
            placeholderTextColor="gray"
            secureTextEntry 
            onChangeText={props.handleChange("password")} 
            value={props.values.password}/>

           {props.password && <Text style={{ color: 'red', textAlign : "center" }}>{props.errors.password}</Text>}

            

            <TouchableOpacity
            style={{
              ...globalStyle.formInput,
              backgroundColor: '#ef233c',
              marginTop: 10,
              borderWidth: 0
            }}
            onPress={props.handleSubmit}
          >
            <Text style={{ color: 'white', textAlign: 'center',fontWeight:'bold' }}>{buttonTitle}</Text>
          </TouchableOpacity>

            
            </View>
        )
    }}
      </Formik>
      
  )
}