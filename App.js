// Import React and necessary components from react-native
import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

// Import Start and Chat components from components directory
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import react-native gesture handler library
import "react-native-gesture-handler";

// Import NavigationContainer and createStackNavigator from react-navigation library
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Create a navigator using createStackNavigator
const Stack = createStackNavigator();

// Define the App component as a subclass of React.Component
export default class App extends React.Component {
  // Render the app with NavigationContainer and Stack.Navigator
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          {/* Define two screens using Stack.Screen, with Start and Chat components as their respective components */}
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
