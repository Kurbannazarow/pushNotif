import React from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {DATA} from '../data';
import {AppHeaderIcon, AppHeaderIcon2} from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';


export const MainScreen = ({navigation}) => {
  const openPostHandler = items => {
    navigation.navigate('Post', {post: items});
  }
  return <PostList data={DATA} onOpen={openPostHandler}/>;
}

const congurate = () => Alert.alert(
    "Поздравление",
    "Я лишь приложение, хочу Вас поздравить с выбором университета \"МОСКОВСКИЙ ПОЛИТЕХ\"!",
    [
      {
        text: '',
        style: "cancel",
      },
      {
        text: "Спасибо",
        style: "destructive",
        onPress: () => {
          console.log(1)
        },
      },
    ],
    { cancelable: false }
  );


MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Все направлений',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item 
         title="Take photo"
         iconName="logo-ionic" 
         onPress={()=>congurate()}
         />
    </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon2}>
    <Item 
     title="Take photo"
     iconName="hamburger" 
     onPress={()=>navigation.toggleDrawer()}
     />
</HeaderButtons>
});

