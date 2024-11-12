import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: "",     
            loading: true
        };
    }

    componentDidMount() { 
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(docs => {
        let post=[]
        docs.forEach(doc => post.push({
        id: doc.id,
        data: doc.data()
            }))
        this.setState({
        post: post,
        loading: false
        })
        }) }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={this.state.post}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post post={item} />}
                    />
                )}
                <TouchableOpacity 
                    style={styles.postButton} 
                    onPress={() => this.props.navigation.navigate('Post')}
                >
                    <Text style={styles.postButtonText}>Hacer un post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    postButton: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Home;
