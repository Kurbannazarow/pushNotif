import React, {useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert, Linking
} from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from "expo";
import moment from "moment";
import { DATA } from "../data";
import {Button} from 'react-native-elements';
import { THEME } from "../theme";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {AppHeaderBack, IconList, IconPrice, AppHeaderIcon} from '../components/AppHeaderIcon';

export const PostScreen = ({ navigation }) => {
  const post = navigation.getParam("post");

  const postData = DATA.filter((p) => p.id === post.id)[0];

  let expoToken = "";

  const notificationHandler = () => {
    Alert.alert(
      "Подключение уведомление",
      "Вы хотите подключить оповещение об экзамене?",
      [
        {
          text: 'Не надо',
          style: "cancel",
        },
        {
          text: "Подключить",
          style: "destructive",
          onPress: () => {
            registerForPushNotificationsAsync();
            alert("Уведомление настроено");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      expoToken = token;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
    getLessons();
  };
  const getLessons = async () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    let lessons = postData.lessons;
    for (let i = 0; i < lessons.length; i++) {
      await scheduleNotification(lessons[i].name, lessons[i].date, 3);
      await scheduleNotification(lessons[i].name, lessons[i].date, 24);
    }
  };
  const scheduleNotification = async (name, date, hourBefore) => {
    //Before 3 hours
    const localNotification = {
      title: "In " + hourBefore +  " hours - " + name,
      body: date,
      data: { type: "delayed" },
      sound: true,
    };
    const schedulingOptions = {
      time: new Date(date).getTime() - (hourBefore*60*60*1000)
    };
    let currentDate = new Date(date).getTime() - (hourBefore*60*60*1000);
    console.log(currentDate);
    // console.log('Scheduling delayed notification:', { localNotification, schedulingOptions })

    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled(3hoursBefore) (${id}) at ${moment(
            schedulingOptions.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));
  };
  const url = 'https://old.mospolytech.ru/index.php?id=6453#2.2.7';
  const openURL = () => {
    Linking.openURL(url);
  }

  return (
    <ScrollView style={styles.center} showsVerticalScrollIndicator={false}>
    {/* <View>
      <Text style={styles.tac}>Информация об образовательной программе</Text>
    </View> */}
    <View style={styles.mainWrapper}>
      <Image style={styles.img} source={{ uri: postData.img }} />
      <Text style={styles.postName}>{post.name}</Text>
    </View>
    <View style={styles.line}/>
    <View style={styles.mainWrapper}>
    <Button
      title="Включит"
      type="solid"
      onPress={notificationHandler}
    />
    <Button
      title="перейти"
      type="outline"
      color="green"
      backgroundColor="green"
      onPress={openURL}
    />
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-barcode"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>КОД НАПРАВЛЕНИЯ ПОДГОТОВКИ</Text>
        <Text style={styles.title}>{postData.code}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-pricetags"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>СТОИМОСТЬ</Text>
        <Text style={styles.title}>{postData.cost}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-calendar"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>СРОК ОБУЧЕНИЯ</Text>
        <Text style={styles.title}>{postData.period}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-key"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>ВСТУПИТЕЛЬНЫЕ ИСПЫТАНИЯ И МИНИМАЛЬНЫЕ БАЛЛЫ</Text>
        {postData.lessons.map((prop, key) => {
       return (
         <Text style={styles.tit} key={key}>{prop.name}</Text>
       );
    })}
        </View>
    </View>

    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-cash"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>БЮДЖЕТНЫХ МЕСТ</Text>
        <Text style={styles.title}>{postData.budget}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-checkmark-circle"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>ПЛАТНЫХ МЕСТ</Text>
        <Text style={styles.title}>{postData.paid}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-home"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>ОСНОВНОЙ КОРПУС</Text>
        <Text style={styles.title}>{postData.main}</Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-finger-print"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>ПРИЕМ ИНОСТРАННЫХ ГРАЖДАН</Text>
        <Text style={styles.title}>
        {postData.foreign ? "Возможен" : "Не возможен"}
      </Text>
      </View>
    </View>
    <View style={styles.listWrapper}>
      <HeaderButtons HeaderButtonComponent={IconList}>
        <Item 
          iconName="ios-person"  
        />
      </HeaderButtons>
      <View style={styles.list}>
        <Text style={styles.subTitle}>РУКОВОДИТЕЛЬ</Text>
        <Text style={styles.title}>{postData.teacher}</Text>
      </View>
    </View>
    <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</Text>
        <Text style={styles.infoSubtitle}>{postData.information}</Text>
        <Button type="outline" title="см. пункт 2.2.7" onPress={openURL}/>
    </View>
    
  </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const post = navigation.getParam("post");
  return {
    headerTitle: "подробности",
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR,      
    },
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
     title="go back"
     iconName="ios-arrow-dropleft" 
     onPress={()=>navigation.popToTop()}
     />
     </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  mainWrapper: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20

  },
  postName: {
    width:100
  },
  line: {
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: 10
  },
  btnTop: {
    backgroundColor: 'red'
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 200
  },
  listWrapper:{
    display: 'flex',
    flexDirection:'row',
    paddingHorizontal: 20
  },
  list:{
    display: 'flex',
    flexDirection:'column',
    alignItems: 'stretch',
    padding: 20
  },
  tac: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
    fontWeight: "bold",
    fontSize: 17,
    color: "blue",
  },
  subTitle: {
    fontWeight: "bold",
  },
  textWrap: {
    padding: 10,
  },
  textWrapper: {
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 10,
    //   height: 5,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,

    // elevation: 5,
  },
  title: {
    borderBottomWidth: 1,
  },
  tit: {
  },
  btn: {
    padding: 1,
    marginBottom: 30
  },
  infoWrapper:{
    display: 'flex',
    textAlign: "center",
    alignItems:'center',
    margin:10
  },
  infoTitle: {
    fontWeight: 'bold'
  },
  infoSubtitle: {
    padding:5
  }
})