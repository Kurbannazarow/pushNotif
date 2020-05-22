import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


export const AboutScreen = ({navigation}) => {
    return (
        <View style={styles.center}>
            <Text>AboutScreen</Text>
            <Button title="go back to Main screen" onPress={()=>navigation.popToTop()}/>
        </View>
    );
}

AboutScreen.navigationOptions = {
    headerTitle: 'Мой блок о приложухе',
    headerStyle: {
        backgroundColor: 'green'
    }
};

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
});