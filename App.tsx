/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

import Insights_and_Budget from './component/Insights_and_Budget';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Settings from './component/Settings';
import { App_Colors, App_Size } from './constant/Theme';
const Tab = createMaterialTopTabNavigator();

const App = ({ }) => {

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
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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


export default App;
