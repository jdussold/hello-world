// Import necessary modules and components from React Native and Firebase
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

// Background Color options for Chat screen
const backgroundColors = {
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#d8d1d8" },
  green: { backgroundColor: "#94ae89" },
};

// A component that displays a transparent overlay when a color is selected
const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

// The main Start component
const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (!name.trim()) {
      setError("Please enter your name to continue.");
      return;
    }
    setError("");
    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Chat", {
          name: name.trim(),
          color: color || "#FFFFFF",
          userID: user.uid,
        });
      })
      .catch(() => {
        setError("Could not sign in. Please try again.");
      });
  };

  // Destructure background color styles from backgroundColors object
  const { black, purple, grey, green } = backgroundColors;
  // Define default color if none selected
  const defaultColor = "#FFFFFF";

  // Map over backgroundColors object to create color options for user to choose from
  const colorOptions = Object.entries(backgroundColors).map(([key, value]) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.color,
        value,
        color === value.backgroundColor && styles.colorSelected,
      ]}
      onPress={() => setColor(value.backgroundColor)}
    >
      {color === value.backgroundColor && <SelectedColorOverlay />}
    </TouchableOpacity>
  ));

  return (
    <Pressable
      // Web has no soft keyboard; tap-to-dismiss only applies to native.
      // Without the platform gate, click events bubble from TextInput to this
      // Pressable and Keyboard.dismiss() blurs the just-focused input.
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
      style={styles.container}
    >
      <Image
        source={require("../assets/background-image.png")}
        style={[
          StyleSheet.absoluteFillObject,
          { width: "100%", height: "100%" },
        ]}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Hello World!</Text>
        <View style={styles.box}>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setName(text);
                if (error) setError("");
              }}
              value={name}
              placeholder="Your Name"
              placeholderTextColor="#ADADAD"
              returnKeyType="done"
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.colorContainer}>
            <Text style={styles.colorLabel}>Choose your background color</Text>
            <View style={styles.colorOptions}>{colorOptions}</View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
  },
  box: {
    backgroundColor: "#FFFFFF",
    width: "88%",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "column",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
    gap: 16,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  errorText: {
    width: "100%",
    color: "#C0392B",
    fontSize: 13,
    paddingHorizontal: 4,
  },
  input: {
    height: 50,
    flex: 1,
  },
  inputImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    opacity: 0.6,
  },
  colorContainer: {
    width: "100%",
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#757083",
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColorOverlay: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "transparent",
    top: -4,
    left: -4,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#757083",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
