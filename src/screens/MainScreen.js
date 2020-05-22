import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {DATA} from '../data';
import {Post} from '../components/Post';


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




MainScreen.navigationOptions = {
    headerTitle: 'Все направлений'
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    }
});