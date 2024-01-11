import { View, StyleSheet, SectionList, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import TodoItem from './TodoItem'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useTodo } from '../context/TodoContext';

export default function TodoList() {
  const { todos, setTodos } = useTodo()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const getData = async () => {
    setIsLoading(true)
    setTodos([])
    const querySnapshot = await getDocs(query(collection(db, "todos"), where("user_id", "==", user.uid)));

    querySnapshot.forEach((doc) => {
      const newTodo = {
        id: doc.id,
        title: doc.data().title,
        details: doc.data().details,
        completed: doc.data().completed,
        completedDate: doc.data().completedDate,
        deadline: doc.data().deadline,
      }
      setTodos(todosPrev => [newTodo, ...todosPrev])
    })

    setTodos(newTodos => newTodos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return dateA - dateB;
      }
    }))

    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [setTodos])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="gray" />
      </View>
    )
  }

  // Organize todos into completed and incompleted sections
  const sections = [
    { title: 'Incompleted', data: todos.filter(todo => !todo.completed) },
    { title: 'Completed', data: todos.filter(todo => todo.completed) },
    
  ];

  return (
    <View style={styles.todolistContainer}>
      {todos.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoItem todo={item} />}
          renderSectionHeader={({ section: { title,data } }) => (
            data.length > 0 && <Text style={styles.sectionHeader}>{title} : {data.length}</Text>   
          )}
        />
      ) : (
        <Text style={styles.textStyle}>You do not have any todo on your list.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  todolistContainer: {
    marginBottom: 150,
    marginTop: 50
  },
  textStyle: {
    color: "#2b2d42",
    fontSize: 18
  },
  sectionHeader: {
    color: '#e1e1e1',
    padding: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#2b2d42',
    fontWeight: '600'
    
  },
})
