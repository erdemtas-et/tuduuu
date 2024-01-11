import { SafeAreaView } from 'react-native';
import React from 'react';
import TodoInput from '../../components/TodoInput';
import { globalStyle } from '../../styles/globalStyle';

export default function TodoScreen({ navigation}) {
  
  return (
    <SafeAreaView style={globalStyle.container}>
      <TodoInput navigation={navigation} />
    </SafeAreaView>
  );
}
