import React, {useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert, Linking
} from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from "expo";
import moment from "moment";
import { DATA } from "../data";

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
  

  return (
    <ScrollView style={styles.center}>
      <Image style={styles.img} source={{ uri: postData.img }} />

      <View>
        <Text style={styles.tac}>Информация об образовательной программе</Text>
      </View>
      
      <View style={styles.textWrap}>
        <Text style={styles.subTitle}>КВАЛИФИКАЦИЯ</Text>
        <Text style={styles.title}>{postData.skill}</Text>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.subTitle}>НАИМЕНОВАНИЕ НАПРАВЛЕНИЯ</Text>
        <Text style={styles.title}>{postData.name}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>КОД НАПРАВЛЕНИЯ ПОДГОТОВКИ</Text>
        <Text style={styles.title}>{postData.code}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>СТОИМОСТЬ</Text>
        <Text style={styles.title}>{postData.cost}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>СРОК ОБУЧЕНИЯ</Text>
        <Text style={styles.title}>{postData.period}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>
          ВСТУПИТЕЛЬНЫЕ ИСПЫТАНИЯ И МИНИМАЛЬНЫЕ БАЛЛЫ
        </Text>
        <View style={styles.date}>
          <Text style={styles.tit}>{postData.lessons[0].name}</Text>
          <Text style={styles.tite}>{new Date(postData.lessons[0].date).toLocaleString()}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.tit}>{postData.lessons[1].name}</Text>
          <Text style={styles.tite}>{new Date(postData.lessons[1].date).toLocaleString()}</Text>
        </View>
        <View style={styles.date}>
        <Text style={styles.tit}>{postData.lessons[2].name}</Text>
          <Text style={styles.tite}>{new Date(postData.lessons[2].date).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.btn}>
      <Button
        title="Включить уведомление"
        color="green"
        onPress={notificationHandler}
      />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>БЮДЖЕТНЫХ МЕСТ</Text>
        <Text style={styles.title}>{postData.budget}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>ПЛАТНЫХ МЕСТ</Text>
        <Text style={styles.title}>{postData.paid}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>ОСНОВНОЙ КОРПУС</Text>
        <Text style={styles.title}>{postData.main}</Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>РУКОВОДИТЕЛЬ</Text>
        <Text style={styles.title}>
          {postData.teacher}
        </Text>
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.subTitle}>ПРИЕМ ИНОСТРАННЫХ ГРАЖДАН</Text>
        <Text style={styles.title}>
          {postData.foreign ? "Возможен" : "Не возможен"}
        </Text>
      </View>

      <View style={styles.btn}>
      <Button
        title="Включить уведомление"
        color="green"
        onPress={notificationHandler}
      />
      </View>
      
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const post = navigation.getParam("post");
  return {
    headerTitle: post.name,
    
    headerStyle: {
      backgroundColor: "green",
      
    },
  };
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
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
    textAlign: "center",
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
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  tit: {
    paddingTop: 15,
    textAlign: "center",
  },
  tite: {
    paddingTop: 5,
    textAlign: "center",
    color: 'green'
  },
  btn: {
    padding: 1,
    marginBottom: 30
  },
  date: {
    padding: 1,
    marginBottom: 30
  },
});
