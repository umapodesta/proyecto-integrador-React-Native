import React, { Component } from "react";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Profile from '../components/Profile';  
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';


const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(){
        super();
    }
    render() {
        return ( 
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Profile" component={Profile}
                    options={{ tabBarIcon: () => (<FontAwesome name="post-add" size={24} color="black" />) }} />
                <Tab.Screen name="Home" component={Home}
                    options={{ tabBarIcon: () => (<AntDesign name="post-add" size={24} color="black" />) }} />
                <Tab.Screen name="NewPost" component={NewPost}
                    options={{ tabBarIcon: () => (<MaterialIcons name="post-add" size={24} color="black" />) }} />
            </Tab.Navigator>
        );

}}

export default HomeMenu;