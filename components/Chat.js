// Import necessary modules and components from React and React Native
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

// Function to customize the appearance of chat bubbles
const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#51A3DF",
        },
        left: {
          backgroundColor: "#E1E5E6",
        },
      }}
    />
  );
};

// Define the Chat component as the default export of the module
export default function Chat({ navigation, route, db }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Retrieve the name and color values from the navigation prop
    let name = route.params.name;
    let color = route.params.color;

    // Set the header title to the name value
    navigation.setOptions({ title: name });

    // Set the header background color to the color value
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });

    // Listen for updates on the "messages" collection in real-time
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        const fetchedMessage = doc.data();
        fetchedMessage.createdAt = new Date(
          fetchedMessage.createdAt.seconds * 1000
        );
        fetchedMessages.push(fetchedMessage);
      });
      setMessages(fetchedMessages);
    });

    // Clean up the listener
    return () => {
      unsubscribe();
    };
  }, [navigation, route.params.name, route.params.color, db]);

  // Function that adds a new message to the "messages" collection in Firestore when the user sends a message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), {
      ...newMessages[0],
      createdAt: new Date(),
      user: {
        _id: route.params.userID,
        name: route.params.name,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={onSend}
        user={{
          _id: route.params.userID,
          name: route.params.name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      <Button title="Leave Chat" onPress={() => navigation.navigate("Start")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
