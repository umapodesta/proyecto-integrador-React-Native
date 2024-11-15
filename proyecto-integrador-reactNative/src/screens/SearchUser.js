import { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from "../firebase/config";


class SearchUser extends Component{
    constructor(){
        super();
        this.state = {
            valorInput: "",
            usuarios: [],
            mensajeError: ""
        };
    }

    controladorDeCambios(text) {
        this.setState({ valorInput: text }, () => {
          this.filtrarUsuarios(text);
        });
      }
      
    filtrarUsuarios(valorInput){
        //para que no se realice el pedido si el campo está en blanco
        if(valorInput === ""){
            this.setState({ usuariosFiltrados: [], mensaje: "" });
        return;
        }
        db.collection("users")
        .where("username", ">=", valorInput)
        .onSnapshot((usuarioBuscado) => {   
            let usuarios = [];
            usuarioBuscado.forEach((doc)=> {
                usuarios.push({
                    id: doc.id,
                    username: doc.data().username,
                    email: doc.data().email,
                })
            })
            // Si no se encuentran usuarios, se muestra el mensaje de error
            if (usuarios.length === 0) {
              this.setState({ usuarios: [], mensajeError: "No se encontraron usuarios" });
            } else {
              this.setState({ usuarios: usuarios, mensajeError: "" });
            }
          }, (error) => {
            console.log("Error al obtener usuarios:", error);
            this.setState({ mensajeError: "Error al buscar usuarios" });
          });
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
              data={this.state.usuarios}
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