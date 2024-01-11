import { SafeAreaView } from 'react-native';
import React from 'react';
import { globalStyle } from '../../styles/globalStyle';
import TodoEdit from '../../components/TodoEdit';

export default function TodoEditScreen({navigation}) {
  
  return (
    <SafeAreaView style={globalStyle.container}>
      <TodoEdit navigation={navigation} />
    </SafeAreaView>
  );
}
