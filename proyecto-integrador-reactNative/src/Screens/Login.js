import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            loading: true,
        };
    }

    componentDidMount() {
        // Verificar si ya hay un usuario autenticado
        auth.onAuthStateChanged(user => {
            if (user) {
              console.log(user)
                this.props.navigation.navigate("HomeMenu");
            } 
            else {
                console.log("No puedes porque no estas logueado")
                }
                this.setState({ loading: false });

            });
    }


    onSubmit(email, password) {
        if (email === "") {
            this.setState({ error: "El email es obligatorio" });
            return;
        }
        if (password === "") {
            this.setState({ error: "La contraseña es obligatoria" });
            return;
        }
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("HomeMenu");
            })
            .catch(() => {
                this.setState({ error: "Credenciales inválidas." });
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        // Si ya está logueado, muestra mensaje y permite redirigir a HomeMenu
        if (auth.currentUser) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Ya estás logueado</Text>
                    <Text style={styles.message}>¡Hola! Ya tienes una sesión activa.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("HomeMenu")}
                    >
                        <Text style={styles.buttonText}>Ir a Home</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Formulario de Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSubmit(this.state.email, this.state.password)}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                </View>
            </View>
        );
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
    message: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        textAlign: "center",
    },
});

export default Login;
