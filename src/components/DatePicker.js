import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { globalStyle } from '../styles/globalStyle';

export default function DatePicker({date,setDate}) {

    const onChange = (event, selectedDateTime) => {
      const currentDateTime = selectedDateTime || dateTime;
      setDate(currentDateTime);
      console.log(selectedDateTime)
    };
  

  return (
    <View style={styles.datePickerContainer}>
    <Text style={styles.deadlineText}>Deadline: </Text>
       <DateTimePicker
       style={styles.datePicker}
         testID="dateTimePicker"
         themeVariant="light"
         value={date}
         mode="date" 
         is24Hour={true}
         display="clock"
         onChange={onChange}
         timeZoneName={'Europe/Helsinki'} 
       />
    
   </View>
  )
}


const styles = StyleSheet.create({
    datePickerContainer : {
      flexDirection: 'column',
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      ...globalStyle.formInput
     
    },
    datePicker : {
      color : '#2b2d42',
      width: 200,
      marginLeft: -90
    },
    deadlineText: {
      color: '#2b2d42',
      marginBottom: 10,
      
    }
  })