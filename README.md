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

The entry point for the application is `App.js`, which sets up the navigator for the application. The `Start` component is responsible for rendering the screen where users can enter their name and choose a background color for the chat screen. The `Chat` component is responsible for rendering the chat screen, where users can exchange messages, images and location data.

Credits
-------

This application was created by John Dussold.
