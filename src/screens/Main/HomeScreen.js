import React,{useState} from 'react';
import {SafeAreaView,Text,Button } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';
import TodoList from '../../components/TodoList';

export default function HomeScreen() {

return (
    <SafeAreaView style={[globalStyle.container] } >
      <TodoList/>
    </SafeAreaView>
  );
}

