import React from 'react';
import {Platform} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {HeaderButton} from 'react-navigation-header-buttons';
import { THEME } from '../theme';


export const AppHeaderIcon = props => {
    return (
        <HeaderButton 
         {...props}
         iconSize={24} 
         IconComponent={Ionicons}
         color={'#fff'}/>
    );
}

export const AppHeaderIcon2 = props => {
    return (
        <HeaderButton 
         {...props}
         iconSize={24} 
         IconComponent={MaterialCommunityIcons}
         color={Platform.OS==='android'?'#fff':THEME.MAIN_COLOR}/>
    );
}
export const AppComponent = props => {
    return (
        <HeaderButton 
         {...props}
         iconSize={24} 
         IconComponent={Ionicons}
         color={Platform.OS==='ios'?'#fff':THEME.MAIN_COLOR}/>
    );
}
export const IconList = props => {
    return (
        <HeaderButton 
         {...props}
         iconSize={30} 
         IconComponent={Ionicons}
         color={'gray'}/>
    );
}
export const IconPrice = props => {
    return (
        <HeaderButton 
         {...props}
         iconSize={24} 
         IconComponent={Ionicons}
         color={THEME.MAIN_COLOR}/>
    );
}