import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import HomeMenu from '../components/HomeMenu';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],     
            loading: true,
        };
    }

    componentDidMount() { 
            db.collection('post')
                .orderBy('createdAt', 'desc') //ordenamos los post de manera descendiente
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
        } 

        render() {
            return (
                <View>  
                      {/* Boton para buscar usuario */}
                    <TouchableOpacity 
                        style={styles.postButton} 
                        onPress={() => this.props.navigation.navigate('SearchUser')}
                    >
                        <Text style={styles.postButtonText}>Buscar usuario</Text>
                    </TouchableOpacity>
                    

                    {this.state.loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        //listado de todos los posts en donde se puede ver quien lo hizo y el post que realizo
                        <FlatList
                            style={styles.postList}
                            data={this.state.post}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Post post={item} email={this.props.email}
                            />}
                        />
                    )}
                    
                     {/* Opcion de ver los iconos abajo del todo */}
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
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 25, 
        marginVertical: 15, 
        justifyContent: "center",
        alignItems: "center",
    },

    postButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    postList: {
        flex: 1,
    }

})


export default Home;
