import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/firebase/config'; 
import Login from './src/screens/Login';
import Profile from './src/components/Profile';
import NewPost from './src/screens/NewPost';
import Post from './src/components/Post';
import Register from './src/screens/Register';
import SearchUser from './src/screens/SearchUser';
import HomeMenu from './src/components/HomeMenu';

const Stack = createNativeStackNavigator(); // Definir el Stack

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false, 
    };
  }

  componentDidMount() {
    // Verificamos el estado de autenticación del usuario 
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true }); // Si hay usuario, está logueado
      } else {
        this.setState({ isAuthenticated: false }); // Si no hay usuario, no está logueado
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isAuthenticated ? (
            // Si está logueado, muestra las pantallas de la aplicación
          <React.Fragment>
            <Stack.Screen name="HomeMenu" component={HomeMenu} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="NewPost" component={NewPost} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="SearchUser" component={SearchUser} />
  
          </React.Fragment>   
          ) : (
            // Si no está logueado, muestra las pantallas de Login y Registro
            <React.Fragment>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </React.Fragment>
             
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
