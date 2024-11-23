import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase/config"; 
import Post from "../components/Post";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: auth.currentUser?.email || "", 
            userName: "",                            
            posteos: [],                             
            cargando: true,                          
        };
    }


    componentDidMount() {
        // Obtener el username del usuario 
        db.collection("users")
            .where("email", "==", this.state.userEmail)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.setState({ userName: doc.data().username });
                });
            });


        // Obtener todos los posteos del usuario
        db.collection("post")
            .where("owner", "==", auth.currentUser.email)
            //.orderBy("createdAt", "desc")

            .onSnapshot(docs => {
                let posteos = [];
                docs.forEach(doc => {
                    console.log(doc)
                    posteos.push({ id: doc.id, data: doc.data() });
                    
                });
                this.setState({
                    posteos: posteos,
                    cargando: false, 
                });
            });
    }


    borrarPosteo(postId) {
        db.collection("post").doc(postId).delete(); 
        
    }


    logout() {
        auth.signOut()
            .then(() => {
                console.log("Sesión cerrada exitosamente.");
                this.props.navigation.navigate("Login"); 
            })
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil del Usuario</Text>


               
                <Text style={styles.info}>Nombre de usuario: {this.state.userName || "Cargando..."}</Text>
                <Text style={styles.info}>Email: {this.state.userEmail}</Text>
                <Text style={styles.info}>Total de posteos: {this.state.posteos.length}</Text>


               
                {this.state.cargando ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.post}>
                                <Post post={item} />
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => this.borrarPosteo(item.id)}
                                >
                                    <Text style={styles.deleteText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}


              
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
    post: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        width: "100%",
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
});


export default Profile;
