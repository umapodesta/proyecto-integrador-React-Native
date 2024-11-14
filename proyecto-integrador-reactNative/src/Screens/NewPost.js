import { Component } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {db, auth} from "../firebase/config"
import firebase from 'firebase'

class NewPost extends Component {
    constructor(){
        super()
        this.state= {
            post:"",
            authenticated: false,
   
         }
    }

    publish() {   
      if (firebase.auth().currentUser) {
        this.setState({ authenticated: true });
    
        db.collection('post').add({
            owner: firebase.auth().currentUser.email,  
            post: this.state.post,
            createdAt: Date.now()
        })
        .then(() => {
            console.log("Post creado con éxito");
            this.setState({ post: "" });
    
            this.props.navigation.navigate("Home");
        })
        .catch((error) => console.log("Error al crear el post:", error));
      } else {
        console.log("No hay usuario logueado.");
        this.setState({ loading: false });
      }
    }
   
  render() {
    if (!this.state.authenticated) {
      return (
          <View style={styles.container}>
              <Text style={styles.header}>Debes estar logueado para crear un post.</Text>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("Login")}>
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
          </View>
      );
  }
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Publicar un Nuevo Post</Text>
    
            {/* Input para el contenido del Post */}
            <TextInput
              style={styles.inputComment}
              keyboardType='default'
              placeholder="Escribe tu post..."
              onChangeText={text => this.setState({post:text})}
              value={this.state.post}
            
            />


            {/* Botón para publicar */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.publish()}>
              <Text style={styles.buttonText}>
                Publicar
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        flex: 1,
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      inputComment: {
        height: 100,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: "#5C6BC0",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
      },
      buttonText: {
        color: "#fff",
        textAlign: "center",
      },
    });


export default NewPost;