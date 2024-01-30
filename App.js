import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

import Insights_and_Budget from './component/Insights_and_Budget';
import Settings from './component/Settings';
import Chart from "./component/Chart"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { App_Colors, App_Size } from './constant/Theme';
import messaging from '@react-native-firebase/messaging';

// Create a material top tab navigator
const Tab = createMaterialTopTabNavigator();

// Main App Component
const App = ({ }) => {

  // useEffect hook to get FCM token on component mount
  useEffect(() => {
    const getToken = async () => {
      try {
        // Request permission to receive push notifications
        await messaging().requestPermission();

        // Get the FCM token
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
      } catch (error) {
        console.error('Error getting FCM token:', error);
        // FCM Token: fISx7GemTe27p5NL8QswdR: APA91bFnRl_fgB - HJTg2UUnxBysf66Remd3QHf4W8sKzYU5QCUTF8VT25ogH7Y5vOhdFMdwrNuq3Zo0FNMwa75S_BWcKyhlp2Jfgv10nsJDdtkCi0mKYMBXjB0OmeoR3EkbRUNHbW7KO
      }
    };

    getToken();

    // Listen for token refresh events
    const unsubscribeTokenRefresh = messaging().onTokenRefresh((newToken) => {
      console.log('FCM Token Refreshed:', newToken);
      // Handle the refreshed token as needed (e.g., update it in your backend)
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      unsubscribeTokenRefresh();
    };
  }, []);

  // Header component
  function _Header() {
    return (
      <View style={style.header}>
        <View style={style.headerText_view}>
          <Text style={style.headerText}>Budget</Text>
        </View>
        <View style={style.header_num_view}>
          <Text style={style.header_num}>1</Text>
        </View>
      </View>
    )
  }

  // Return the main component structure
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="black"
      />
      {_Header()}

      <Tab.Navigator>
        <Tab.Screen name="All" component={Insights_and_Budget} />
        <Tab.Screen name="personal" component={Settings} />
        <Tab.Screen name="Work" component={Chart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles for the component
const style = StyleSheet.create({
  header: {
    height: 90,
    width: '100%',
    backgroundColor: App_Colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15

  },
  headerText_view: {
    width: App_Size.width / 2,

  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: App_Colors.black
  },
  header_num_view: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: App_Colors.black,
    alignItems: "center",
    justifyContent: "center"
  },
  header_num: {
    fontSize: 20,
    color: App_Colors.black
  },
})

// Export the App component as the default export
export default App;
