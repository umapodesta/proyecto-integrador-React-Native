import { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from "../firebase/config";


class SearchUser extends Component{
    constructor(){
        super();
        this.state = {
            valorInput: "",
            users: [],
            mensajeError: "",
            usuariosFiltrados: []
        };
    }


    componentDidMount(){
      db.collection("users")
        .onSnapshot((usuarioBuscado) => {   
            let users = [];
            usuarioBuscado.forEach((doc)=> {
                users.push({
                    id: doc.id,
                    username: doc.data().username,
                    email: doc.data().email,
                })
            })
            this.setState({
              users: users,
              cargando: false
            })
    })}

    controladorDeCambios(text) {
        let nuevoArray = this.state.users.filter(user => {
          console.log(user);
          return user.username.toLowerCase().includes(text.toLowerCase())
          
        })
        this.setState({
          valorInput: text,
          usuariosFiltrados : nuevoArray
        })
        if (nuevoArray.length === 0) {
          this.setState({ mensajeError: "No se encontraron usuarios" });
          return;
      }
        else {
          this.setState({ mensajeError: "" })
        }

      }
      

      render() {
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Buscar usuario por email o nombre"
              onChangeText={(text) => this.controladorDeCambios(text)}
              value={this.state.valorInput}
            />
    
            {this.state.mensajeError ? (
              <Text style={styles.error}>{this.state.mensajeError}</Text>
            ) : null}
    
            <FlatList
              data={this.state.usuariosFiltrados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>{item.username} - {item.email}</Text>
                </View>
              )}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
      },
      error: {
        color: 'red',
        textAlign: 'center',
      },
      item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
    });
    
export default SearchUser;