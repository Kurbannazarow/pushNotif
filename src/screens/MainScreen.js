import React from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {DATA} from '../data';
import {Post} from '../components/Post';
import {AppHeaderIcon, AppHeaderIcon2} from '../components/AppHeaderIcon';


export const MainScreen = ({navigation}) => {

    const openPostHandler = items => {
        navigation.navigate('Post', {post: items});
    }

    return (
        <View style={styles.wrapper}>
            <FlatList 
             data={DATA} 
             keyExtractor={item => item.id}
             renderItem={({item}) =>  <Post items={item} onOpen={openPostHandler}/>}
            />
        </View>
    );
}

const congurate = () => Alert.alert(
    "Поздравление",
    "Я приложение, хочу лишь Вас поздравить с выбором университета!",
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


MainScreen.navigationOptions = {
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
     onPress={()=>congurate()}
     />
</HeaderButtons>
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    }
});