import { Component } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {db} from "../Firebase/config"

class NewPost extends Component {
    constructor(){
        super()
        this.state= {
            email:"",
            post:"",
            loading:true
         }
    }

    publish(email,post){
        db.collection('post').add ({
            owner:email,
            post:post,
            createdAt:Date.now()
        })
    }
    render() {
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
              onPress={() => this.publish(this.state.email,this.state.post)}>
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
        backgroundColor: "#28a745",
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