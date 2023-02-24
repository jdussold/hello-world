import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default class Chat extends React.Component {
  componentDidMount() {
    // Retrieve the name and color values from the navigation prop
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;

    // Set the header title to the name value
    this.props.navigation.setOptions({ title: name });

    // Set the header background color to the color value
    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          // Set the background color of the chat screen to the color value
          { backgroundColor: this.props.route.params.color },
        ]}
      >
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
