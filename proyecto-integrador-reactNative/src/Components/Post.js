import { Component } from "react";
import {Text,StyleSheet, View} from "react-native";
import NewPost from "../screens/NewPost";

class Post extends Component {
    constructor(props) {  
        super(props);

    }
    render() {
        return (
            <View style={styles.post}>
                <Text style={styles.owner}>Publicado por: {this.props.post.data.owner}</Text>
                <Text style={styles.content}>{this.props.post.data.post}</Text>

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

});

export default Post;
