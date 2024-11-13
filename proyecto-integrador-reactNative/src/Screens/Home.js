import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import Post from '../components/Post';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],     
            loading: true
        };
    }

    componentDidMount() { 
        if (!firebase.auth().currentUser) {
            console.log("No hay usuario logueado.");
            return;
        }

        db.collection('post')
        .orderBy('createdAt', 'desc')
        .onSnapshot(docs => {
        let post=[]
        docs.forEach(docs => post.push({
        id: docs.id,
        data: docs.data()
            }))
        this.setState({
        post: post,
        loading: false
        })
        }) }

        render() {
            return (
                <View>
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
          
                </View>
            );
        }
}


export default Home;
