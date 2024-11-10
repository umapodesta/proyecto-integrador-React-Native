import { Component } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { auth, db } from "../Firebase/config";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            error: "",
        };
    }
    
    onSubmit(email, password, username) {
        auth.createUserWithEmailAndPassword(email, password)
          .then((response) => {
            db.collection("users").add({
                email: email,
                username: username,
                createdAt: Date.now(),
            })
          .then(response => {
            this.setState({ registered: true });
            this.props.navigation.navigate('Login');
            })      
          })
          .catch(error => {
            this.setState({ error: 'Fallo en el registro.' });
          });
      }

    render(){
        return(
            <View>
                <Text>
                    Formulario de Registro
                </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text>Ir a login</Text>
                </TouchableOpacity>

                {/*Campos del formulario */}
                <TextInput
                    keyboardType="email-adress"
                    placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                />

                <TextInput
                     keyboardType="default"
                     placeholder="Contraseña"
                     secureTextEntry={true}
                     onChangeText={(text) => this.setState({ password: text })}
                     value={this.state.password}
                />

                <TextInput
                     keyboardType="default"
                     placeholder="Nombre de usuario"
                     onChangeText={(text) => this.setState({ username: text })}
                     value={this.state.username}
                />

                {/* Mensaje de error si hay campos vacíos */}



                {/*Boton para Registrarse si está todo el formulario completo */}
                <TouchableOpacity
                onPress={() => {
                    if(this.state.email && this.state.password && this.state.username){
                        this.onSubmit(this.state.email, this.state.password, this.state.username);
                    }
                }}
                disabled={!(this.state.email && this.state.password && this.state.username)}>
                    <Text> Registrarse </Text>
                </TouchableOpacity>

            </View>
        )
    }
}
export default Register;