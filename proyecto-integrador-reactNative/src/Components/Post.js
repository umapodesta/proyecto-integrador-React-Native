import { Component } from "react";
import {Text, View} from "react-native";
import NewPost from "../Screens/NewPost";

class Post extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            email:""
    }
    }
    render(){
        return (
            <View>
                <NewPost email={this.state.email}/>
            </View>
        );
    }
}

export default Post;
