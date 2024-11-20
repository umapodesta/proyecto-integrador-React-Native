import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import Post from '../components/Post';
import HomeMenu from '../components/HomeMenu';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],     
            loading: true,
            authenticated: false,
        };
    }

    componentDidMount() { 
        if (firebase.auth().currentUser) {
            this.setState({ authenticated: true }); 

            db.collection('post')
                .orderBy('createdAt', 'desc')
                .onSnapshot(docs => {
                    let post = [];
                    docs.forEach(doc => post.push({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    this.setState({
                        post: post,
                        loading: false,
                    });
                });
        } else {
            console.log("No hay usuario logueado.");
            this.setState({ loading: false }); 
        }
    }

        render() {
            
            return (
                <View>
                    
                    <TouchableOpacity 
                        style={styles.postButton} 
                        onPress={() => this.props.navigation.navigate('SearchUser')}
                    >
                        <Text style={styles.postButtonText}>Buscar usuario</Text>
                    </TouchableOpacity>
                    

                    {this.state.loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={this.state.post}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Post post={item} email={this.props.email} />}
                        />
                    )}

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("NewPost")}>
                        <Text >Hacer un post </Text>
                    </TouchableOpacity>
                    
                    
                    <HomeMenu/>
          
                </View>

            );
        }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postButton: {
        backgroundColor: "#5C6BC0",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    postButtonText: {
        color: "white",
        fontWeight: "bold",
    },
})


export default Home;
