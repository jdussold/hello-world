// Import libraries and components
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

// Ignore expo warning messages
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from",
  "Cannot connect to Metro",
]);

// Create a navigator using createStackNavigator
const Stack = createStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD80gTYOsQnNFBXLsJH0BW0rKUy-tmHyPQ",
    authDomain: "hello-world-c79f6.firebaseapp.com",
    projectId: "hello-world-c79f6",
    storageBucket: "hello-world-c79f6.appspot.com",
    messagingSenderId: "351256636874",
    appId: "1:351256636874:web:c91cdee283f73310153333",
  };

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Render the app with NavigationContainer and Stack.Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Define two screens using Stack.Screen, with Start and Chat components as their respective components */}
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
