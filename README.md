React Native Chat App: "Hello World!"
=====================

This is a simple chat application built using React Native. It allows users to enter a chat room and exchange messages, images and location data with their friends and family. The application stores data both online and offline, allowing users to read their messages even when offline.

User Stories
------------

The application aims to fulfill the following user stories:

-   As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
-   As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
-   As a user, I want to send images to my friends to show them what I'm currently doing.
-   As a user, I want to share my location with my friends to show them where I am.
-   As a user, I want to be able to read my messages offline so I can reread conversations at any time.
-   As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

Key Features
------------

The application provides the following key features:

-   A page where users can enter their name and choose a background color for the chat screen before joining the chat.
-   A page displaying the conversation, as well as an input field and submit button.
-   The chat must provide users with two additional communication features: sending images and location data.
-   Data gets stored online and offline.

Getting Started
---------------

To get started with the application, follow these steps:

1.  Clone the repository to your local machine.
2.  Install the dependencies by running `npm install`.
3.  Start the application by running `npm start`.

Technical Information
---------------------

The application is built using React Native and uses the following dependencies:

-   react
-   react-native
-   react-native-gesture-handler
-   @react-navigation/native
-   @react-navigation/stack

Components
----------

App
===

The `App` component is the main component of the React Native chat app. It sets up the navigation and handles the connection to the Firebase database.

Dependencies
------------

The `App` component requires the following dependencies to be installed:

-   `@react-navigation/native`
-   `@react-navigation/stack`
-   `react-native-gesture-handler`
-   `firebase/app`
-   `firebase/firestore`
-   `firebase/storage`
-   `@react-native-community/netinfo`

Usage
-----

To use the `App` component, import it into your React Native project and include it in your app:

javascriptCopy code

`import App from './App';

export default function MyChatApp() {
  return (
    <App />
  );
}`

Props
-----

The `App` component does not accept any props.

Components
----------

The `App` component imports and renders two other components:

-   `Start`: The start screen where the user enters their name and chooses a background color.
-   `Chat`: The chat screen where the user can send and receive messages.

Firebase Configuration
----------------------

The `App` component requires a Firebase configuration object with the following properties:

javascriptCopy code

`const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>"
};`

To set up Firebase, you need to create a project in the Firebase Console, enable the Firestore and Storage services, and then copy the configuration object to your app. For more information, see the Firebase documentation.

Network Status
--------------

The `App` component uses the `useNetInfo` hook from `@react-native-community/netinfo` to monitor changes in the network connection status. If the device loses connection, the app disables the Firestore network and displays an alert to the user.

Stack Navigator
---------------

The `App` component uses `createStackNavigator` from `@react-navigation/stack` to set up the navigation between the `Start` and `Chat` screens.

Firestore and Storage
---------------------

The `App` component initializes the Firebase app, Firestore database, and Storage instance using the `initializeApp`, `getFirestore`, and `getStorage` functions from `firebase/app`, `firebase/firestore`, and `firebase/storage`, respectively.

Alert and LogBox
----------------

The `App` component uses `Alert` from `react-native` to display an alert when the network connection is lost. It also uses `LogBox` from `react-native` to ignore warning messages related to AsyncStorage and Metro.

Credits
-------

This application was created by John Dussold.
