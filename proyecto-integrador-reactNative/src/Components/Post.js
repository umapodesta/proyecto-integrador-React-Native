import { Component } from "react";
import {Text,TouchableOpacity, StyleSheet, View} from "react-native";
import {db, auth} from "../firebase/config"
import firebase from 'firebase'
import AntDesign from '@expo/vector-icons/AntDesign';


class Post extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            like: false,
    }
    }
    like(post){
        db.collection('post')
        .doc(post)
        .update({
           likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
       })
       .then(()=>{
        this.setState({
          like:true
        })
       
       })
    }
    
    dislike(post){
      db.collection('post')
      .doc(post)
      .update({
         likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
     })
     .then(()=>{
      this.setState({
        like:false
      })
     })
    }

    render() {
        return (
            <View style={styles.post}>
                <Text style={styles.owner}>Publicado por: {this.props.post.data.owner}</Text>
                <Text style={styles.content}>{this.props.post.data.post}</Text>
                {
                    this.state.like ? 
                    <TouchableOpacity onPress={() => this.dislike(this.props.post.id)}>
                        <AntDesign name="dislike2" style={styles.likeIcon} color="black" />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => this.like(this.props.post.id)}>
                        <AntDesign name="like2" style={styles.likeIcon} color="black" />
                    </TouchableOpacity>
                }
            
            </View>
        );
    }
}
const styles = StyleSheet.create({
    post: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    owner: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    content: {
        marginBottom: 10,
    },
    likeIcon: {
        fontSize: 16, 
        padding: 5,   
    }

});

export default Post;
