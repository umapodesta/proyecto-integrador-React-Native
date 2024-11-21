import { Component } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            registered: false,
            error: "",
        };
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                this.props.navigation.navigate('HomeMenu');
            }
            else {
                console.log("No puedes porque no estas logueado")
            }
        })
    }

    onSubmit(email, password, username) {
        if (email === "") {
            this.setState({ error: "El campo de email es obligatorio." });
            console.log("El email está vacío");
            return;
        }
    
        if (password === "") {
            this.setState({ error: "El campo de contraseña es obligatorio." });
            console.log("La contraseña está vacía");
            return;
        }
    
        if (username === "") {
            this.setState({ error: "El campo de nombre de usuario es obligatorio." });
            console.log("El nombre de usuario está vacío");
            return;
        }
    
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                db.collection("users").add({
                    email: email,
                    username: username,
                    createdAt: Date.now(),
                })
                .then(() => {
                    this.setState({ registered: true });
                    this.props.navigation.navigate('Login');
                });
            })
            .catch(error => {
                this.setState({ error: error.message });
                console.log(error.message);
            });
    }
    

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Formulario de Registro
                </Text>

                {/*Campos del formulario */}
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    keyboardType="email-adress"
                    placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>
                    
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        placeholder="Nombre de usuario"
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                    />
                </View>
                
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text style={styles.link}>Ir a login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("NewPost")}>
                    <Text style={styles.link}>Hacer un post</Text>
                </TouchableOpacity>

                {/* Mostrar el botón solo si todos los campos están completos */}
                {this.state.email !== "" && this.state.password !== "" && this.state.username !== "" ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.username)}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                    ) : (
                    <Text style={[styles.noButton]}>Registrarse</Text>
                    )}
                {/* Mensaje de error si hay campos vacíos */}
                <View>
                    {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9", 
        alignItems: "center",
        justifyContent: "center",
        padding: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#333", 
        marginBottom: 20,
    },
    link: {
        color: "#5C6BC0", 
        fontSize: 16,
        marginBottom: 20,
        textDecorationLine: "underline", 
    },
    inputContainer: {
        width: "100%",
        marginBottom: 25, 
    },
    input: {
        width: "100%",
        padding: 18, 
        fontSize: 18, 
        borderWidth: 2, 
        borderColor: "#B0BEC5", 
        borderRadius: 8, 
        backgroundColor: "#fff", 
    },
    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#5C6BC0",  
        paddingVertical: 16,
        paddingHorizontal: 120, 
        borderRadius: 35, 
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18, 
        fontWeight: "600", 
        textAlign: "center",
    },
    noButton: {
        color: "#B0BEC5",
        fontSize: 18, 
        fontWeight: "600", 
        textAlign: "center",
    },
    inactiveText: {
        color: "#999",
        fontSize: 16,
        marginTop: 30,
    },
});

export default Register;