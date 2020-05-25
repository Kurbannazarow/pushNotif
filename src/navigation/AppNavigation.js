import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator} from 'react-navigation-drawer';
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { AboutScreen } from "../screens/AboutScreen";
// import { BlurView } from "expo-blur";
import { THEME } from "../theme";
import { LinkScreen } from "../screens/LinkScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    headerTitleAlign: "center",
  }
}

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: {
      screen: PostScreen,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: '#fff',
      },
    },
  },
  navigatorOptions
);

const AboutNavigator = createStackNavigator({
  About: AboutScreen,
}, navigatorOptions);
const LinkNavigator = createStackNavigator({
  About: LinkScreen,
}, navigatorOptions); 

const MainNavigator = createDrawerNavigator({
  PostTabs: {
    screen: PostNavigator,
    navigationOptions: {
      drawerLabel: "Главная",
      drawerIcon: <MaterialCommunityIcons name="home-account" size={16}  color={THEME.MAIN_COLOR} />
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      drawerLabel: "О приложении",
      drawerIcon: <MaterialCommunityIcons name="cellphone-information" size={16} color={THEME.MAIN_COLOR} />
    }
  },
  Link: {
    screen: LinkNavigator,
    navigationOptions: {
      drawerLabel: "Информация",
      drawerIcon: <MaterialCommunityIcons name="school" size={16} color={THEME.MAIN_COLOR} />,
    }
  }
}, {
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
    labelStyle: {
      fontSize: 15
    }
  }
})

export const AppNavigation = createAppContainer(MainNavigator);
