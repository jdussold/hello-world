import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

// A dictionary of color options, where each key is a color name and each value is a style object
const backgroundColors = {
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#d8d1d8" },
  green: { backgroundColor: "#94ae89" },
};

// A component that displays a transparent overlay when a color is selected
const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

// The main Start component
export default class Start extends Component {
  constructor(props) {
    super(props);
    // Initialize the component's state with an empty name and no selected color
    this.state = { name: "", color: "" };
  }

  render() {
    // Extract the name and color properties from the component's state
    const { name, color } = this.state;
    // Extract the individual color options from the backgroundColors dictionary
    const { black, purple, grey, green } = backgroundColors;
    // Get the height of the device's screen
    const windowHeight = Dimensions.get("window").height;
    // Calculate the desired height of the box containing the input fields and color options
    const boxHeight = windowHeight * 0.44;
    // Set a default background color for the chat screen if the user doesn't select a color
    const defaultColor = "#FFFFFF";

    // Map over the backgroundColors dictionary to create a list of color options
    const colorOptions = Object.entries(backgroundColors).map(
      ([key, value]) => (
        <TouchableOpacity
          key={key}
          // Apply the color option's style to the TouchableOpacity
          style={[
            styles.color,
            value,
            // If this color is currently selected, also apply the "selected" style
            color === value.backgroundColor && styles.colorSelected,
          ]}
          onPress={() => this.setState({ color: value.backgroundColor })}
        >
          {/* If this color is currently selected, display the overlay */}
          {color === value.backgroundColor && <SelectedColorOverlay />}
        </TouchableOpacity>
      )
    );

    return (
      // Dismiss the keyboard when the user taps outside of the input fields
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/background-image.png")}
            style={styles.image}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Hello World!</Text>
            </View>
            <View style={[styles.box, { height: boxHeight }]}>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.inputImage}
                />
                <TextInput
                  style={styles.input}
                  // Update the component's state with the new name value
                  onChangeText={(name) => this.setState({ name })}
                  value={name}
                  placeholder="Your Name"
                  placeholderTextColor="#ADADAD"
                />
              </View>
              <View style={styles.colorContainer}>
                <Text style={styles.colorLabel}>
                  Choose your Background Color:
                </Text>
                <View style={styles.colorOptions}>{colorOptions}</View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  // Navigate to the Chat screen and pass in the user's name and selected color (or default color if none selected)
                  this.props.navigation.navigate("Chat", {
                    name,
                    color: color || defaultColor,
                  })
                }
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: "45%",
  },
  box: {
    backgroundColor: "#FFFFFF",
    width: "88%",
    alignItems: "center",
    marginBottom: "6%",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  inputContainer: {
    width: "88%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DBDBDB",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    flex: 1,
  },
  inputImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
    opacity: 0.6,
  },
  colorContainer: {
    width: "88%",
    flex: 1,
  },
  colorLabel: {
    fontSize: 18,
    fontWeight: "300",
    color: "#757083",
    marginBottom: 10,
    marginTop: "10%",
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
    width: "88%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
