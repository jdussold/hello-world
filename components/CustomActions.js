import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// CustomActions component for handling different actions like image picking, taking photo, and sending location
const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  storage,
  onSend,
  userID,
}) => {
  // Initialize action sheet
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];

    // Action sheet options and handling the selected option
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
            return;
        }
      }
    );
  };

  // Upload image to Firebase storage and send it
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  // Pick image from media library
  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync();
      if (!canceled) await uploadAndSendImage(assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // Take photo using camera
  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      const { assets, canceled } = await ImagePicker.launchCameraAsync();
      if (!canceled) await uploadAndSendImage(assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // Get current location
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { longitude, latitude } = location.coords;
        onSend({
          location: {
            longitude,
            latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  // Generate unique reference string for image storage
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // Render a touchable button with a '+' icon that triggers the action sheet when pressed
  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#B2B2B2",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#B2B2B2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
