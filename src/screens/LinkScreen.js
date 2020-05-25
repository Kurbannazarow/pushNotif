import React, {useCallback} from 'react';
import { View, Text, StyleSheet, Linking, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon2} from '../components/AppHeaderIcon';
import { THEME } from "../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export const LinkScreen = ({navigation}) => {
    const url1 = 'https://old.mospolytech.ru/index.php?id=6453#2.2.7';
    const url2 = 'https://old.mospolytech.ru/index.php?id=2412';
    const url3 = 'https://old.mospolytech.ru/index.php?id=2406';

    const OpenSettingsButton = ({ children, url }) => {
        const handlePress = useCallback(async () => {
        await Linking.openURL(url);
        }, []);
        return <Button title={children} onPress={handlePress} color={THEME.MAIN_COLOR}/>;
    };


    return (
        <View style={styles.center}>
            
      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</Text>
        <Text style={styles.title}>
        *WS – результат демонстрационного экзамена по стандартам Ворлдскиллс Россия, сданного выпускником СПО по соответствующей УГСН (см. пункт 2.2.7 Правил приема).
        </Text>
        <OpenSettingsButton url={url1} >см. пункт 2.2.7</OpenSettingsButton>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>День открытых дверей в Московском Политехе</Text>
        <Text style={styles.subDay}>20</Text>
        <Text style={styles.title}>
            Июня в 13:00
        </Text>
        <OpenSettingsButton url={url3} >Зарегистрироваться</OpenSettingsButton>
      </View>


      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>ОБ УНИВЕРСИТЕТЕ</Text>
        <Text style={styles.title}>
        </Text>
        <OpenSettingsButton url={url2}>перейти</OpenSettingsButton>
      </View>

        </View>
    );
}



LinkScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Об обучении',
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
        fontFamily: 'open-bold'
    },
    
  subTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  subDay: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 29,
  },
  textWrapper: {
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  title: {
    padding: 10,
    textAlign: "center",
  },
});
