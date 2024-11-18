import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config"; // Importa Firebase Auth y Firestore.

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: null,  // Email del usuario autenticado
            userName: null,   // Nombre de usuario (username)
            posteos: [],      // Lista de posteos del usuario
            totalPosteos: 0,  // Contador de posteos
        };
    }

    componentDidMount() {
        // Observa el estado de autenticación.
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ userEmail: user.email });

                // Obtener el username asociado al email del usuario
                db.collection('users')
                    .where('email', '==', user.email)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            const userData = querySnapshot.docs[0].data();
                            this.setState({ userName: userData.username });
                        } else {
                            console.log("No se encontró el usuario en Firestore.");
                        }
                    })
                    .catch(error => {
                        console.error("Error al obtener el username:", error);
                    });

                // Obtener los posteos del usuario
                this.obtenerPosteos(user.email);
            } else {
                // Si no hay usuario autenticado, redirige a Login.
                this.props.navigation.navigate('Login');
            }
        });
    }

    // Obtener los posteos del usuario
    obtenerPosteos(email) {
        db.collection('post')
            .where('owner', '==', email)
            .get()
            .then(querySnapshot => {
                const posteos = [];
                querySnapshot.forEach(doc => {
                    posteos.push({ id: doc.id, data: doc.data() });
                });
                this.setState({
                    posteos: posteos,
                    totalPosteos: posteos.length, // Actualiza el contador de posteos
                });
            })
            .catch(error => {
                console.error("Error al obtener los posteos:", error);
            });
    }

    // Eliminar un posteo
    borrarPosteo(postId) {
        db.collection('post')
            .doc(postId)
            .delete()
            .then(() => {
                console.log("Posteo eliminado");
                // Actualizar el estado para eliminar el posteo de la lista y restar 1 al contador
                this.setState(prevState => ({
                    posteos: prevState.posteos.filter(post => post.id !== postId),
                    totalPosteos: prevState.totalPosteos - 1,
                }));
            })
            .catch(error => {
                console.error("Error al eliminar el posteo:", error);
            });
    }

    logout() {
        // Método para cerrar sesión.
        auth.signOut()
            .then(() => {
                console.log("Sesión cerrada exitosamente.");
                this.props.navigation.navigate('Login'); // Redirige a Login después del logout.
            })
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil del usuario</Text>

                {/* Mostrar username si está disponible */}
                {this.state.userName && (
                    <Text style={styles.info}>Nombre de usuario: {this.state.userName}</Text>
                )}

                {/* Mostrar email si está disponible */}
                {this.state.userEmail && (
                    <Text style={styles.info}>Email: {this.state.userEmail}</Text>
                )}

                {/* Mostrar cantidad de posteos */}
                <Text style={styles.info}>Total de posteos: {this.state.totalPosteos}</Text>

                {/* Listar los posteos del usuario */}
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.owner}>Posteo: {item.data.post}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => this.borrarPosteo(item.id)}
                            >
                                <Text style={styles.deleteText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* Botón de logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: "#5C6BC0",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    },
    post: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        width: '100%',
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteText: {
        color: "white",
        textAlign: "center",
    }
});

export default Profile;



