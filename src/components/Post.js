import React from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';

export const Post = ({items, onOpen}) => {
    return (
        <TouchableOpacity onLongPress={()=>alert('Не надо удерживать картинку чувак!')} onPress={()=>onOpen(items)} >
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{uri: items.img}}>
                    <View style={styles.textWrap}>
                        <Text style={styles.title}>{items.name}</Text>
                        {/* <Text style={styles.title}>{items.code}</Text> */}
                        {/* <Text style={styles.title}>{new Date().toLocaleDateString() === items.date ? 'AAA' : 'BBB'}</Text> */}
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: '#fff'
    }
});