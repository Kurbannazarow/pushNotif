import React from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { DATA } from "../data";

export const PostScreen = ({ navigation }) => {
  const post = navigation.getParam("post");


  const postData = DATA.filter((p) => p.id === post.id)[0];

  const notificationHandler = () => {
    Alert.alert(
      "Подключение уведомление",
      "Вы хотите подключить оповещение об экзамене?",
      [
        {
          text: postData.skill,
          style: "cancel",
        },
        {
          text: "Подключить",
          style: "destructive",
          onPress: () => {
            // registerNotification();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.center}>
      <Image style={styles.img} source={{ uri: postData.img }} />

      <View>
        <Text style={styles.tac}>Информация об образовательной программе</Text>
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
        <Text style={styles.tit}>{postData.lessons[0].name}</Text>
        <Text style={styles.tit}>{postData.lessons[1].name}</Text>
        <Text style={styles.tit}>{postData.lessons[2].name}</Text>
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
        <Text style={styles.subTitle}>ПРИЕМ ИНОСТРАННЫХ ГРАЖДАН</Text>
        <Text style={styles.title}>
          {postData.foreign ? "Возможен" : "Не возможен"}
        </Text>
      </View>

      <Button        style={styles.btn}
        title="Включить уведомление"
        color="green"
        onPress={notificationHandler}
      />
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
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  title: {
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  tit: {
    padding: 10,
    textAlign: "center",
  },
  btn: {
    padding: 1,
  },
});
