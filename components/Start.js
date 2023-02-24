import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const backgroundColors = {
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#d8d1d8" },
  green: { backgroundColor: "#94ae89" },
};

const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" };
  }

  render() {
    const { name, color } = this.state;
    const { black, purple, grey, green } = backgroundColors;

    const colorOptions = Object.entries(backgroundColors).map(
      ([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.color,
            value,
            color === value.backgroundColor && styles.colorSelected,
          ]}
          onPress={() => this.setState({ color: value.backgroundColor })}
        >
          {color === value.backgroundColor && <SelectedColorOverlay />}
        </TouchableOpacity>
      )
    );

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          style={styles.image}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hello World!</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/icon.png")}
                style={styles.inputImage}
              />
              <TextInput
                style={styles.input}
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
                this.props.navigation.navigate("Chat", { name, color })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
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
    flex: 1,
    justifyContent: "center",
    marginBottom: "4%",
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
    height: "44%",
    alignItems: "center",
    marginBottom: "6%",
    paddingTop: 20,
    paddingBottom: 20,
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
