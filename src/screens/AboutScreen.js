import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon2} from '../components/AppHeaderIcon';
import { THEME } from "../theme";

export const AboutScreen = ({navigation}) => {
    return (
        <View style={styles.center}>
            <Text>Это лучшее приложение для абитуриентов </Text>
            <Text>Версия приложения <Text style={styles.version}>1.0.0</Text></Text>
            {/* <Button title="go back to Main screen" onPress={()=>navigation.goBack()}/> */}
        </View>
    );
}


AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'О приложении',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon2}>
    <Item 
     title="Take photo"
     iconName="hamburger" 
     onPress={()=>navigation.toggleDrawer()}
     />
</HeaderButtons>
});

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    version: {
        fontWeight: 'bold',
        color: THEME.MAIN_COLOR,
        fontFamily: 'open-bold'
    }
});