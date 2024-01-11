import RootNavigation from './src/screens/RootNavigation';
import { UserContextProvider } from './src/context/UserContext';
import { TodoContextProvider } from './src/context/TodoContext';




export default function App() {
  return (
    <UserContextProvider>
    <TodoContextProvider>
    <RootNavigation/>
    </TodoContextProvider>
    </UserContextProvider>
  )
}

