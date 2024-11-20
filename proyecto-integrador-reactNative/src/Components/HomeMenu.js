import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Profile from '../components/Profile';  
import NewPost from '../screens/NewPost';
import Home from "../screens/Home";


const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(){
        super();
    }
    render() {
        return ( 
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Profile" component={Profile}
                    options={{ tabBarIcon: () => (<AntDesign name="profile" size={24} color="black" />) }} />
                <Tab.Screen name="Home" component={Home}
                    options={{ tabBarIcon: () => (<FontAwesome name="home" size={24} color="black" />) }} />
                <Tab.Screen name="NewPost" component={NewPost}
                    options={{ tabBarIcon: () => (<MaterialIcons name="post-add" size={24} color="black" />) }} />
            </Tab.Navigator>
        );

}}

export default HomeMenu;