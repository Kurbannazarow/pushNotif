import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { BlurView } from "expo-blur";
import { THEME } from "../theme";
const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    About: AboutScreen,
    Post: {
      screen: PostScreen,
      navigationOptions: {
        headerTitleAlign: "center",
        
      },
    },
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS==='android' ? THEME.MAIN_COLOR : '#fff',
            
        },
        headerTintColor: Platform.OS==='android' ? '#fff' : THEME.MAIN_COLOR,
        headerTitleAlign: "center",
    }
  }
);

export const AppNavigation = createAppContainer(PostNavigator);
