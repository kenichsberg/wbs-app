import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';


// 日付文字列を取得
const getPeriodString = (jsonDateStart: String, jsonDateEnd: String): String => {
  const dateStart = JSON.parse(jsonDateStart);
  const dateEnd = JSON.parse(jsonDateEnd);

  if (dateStart == null && dateEnd == null) {
    return '未入力';
  }

  const dateStartString = dateStart == null 
    ? ''
    : moment(JSON.parse(jsonDateStart)).format('YYYY年MM月DD日 HH:mm');

  const dateEndString = dateEnd == null 
    ? '対応中'
    : moment(JSON.parse(jsonDateEnd)).format('YYYY年MM月DD日 HH:mm');

  return `${dateStartString} 〜 ${dateEndString}`;

}



export default function TaskListView(props) {
  // 引数
  const {tasks, navigation} = props;

  // tasks配列を表示用に整形
  // categoryのセット(の配列)を取得
  const categories = Array.from(new Set(tasks.map(task => task.category)));

  // 一旦、category毎の配列にする
  const tasksArranged = categories.map(category => {
    return tasks.filter(task => task.category === category);
  });

  // 各categoryをキーとするオブジェクトに上記配列を割り当てる
  let tasksDisplay = {};

  tasksArranged.forEach(taskList => {
    tasksDisplay = {...tasksDisplay, [taskList[0].category]: taskList}
  });
  console.log(tasksDisplay);
  console.log(tasks);

  // タスクリストのJSXを取得
  const getTaskList = (item, index) => {
    return (
        <ListItem key={`ListItem-${index}`}>
          <Body>
            <Text>{item.taskName}</Text>
            <Text note>予定：{getPeriodString(item.startDatetimePlanned, item.endDatetimePlanned)}</Text>
            <Text note>実績：{getPeriodString(item.startDatetimeResult, item.endDatetimeResult)}</Text>
            <Text note>成果物: {item.selectedDocument}</Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon 
                name="ios-create" 
                style={{color: 'tomato'}}
                onPress={() => navigation.navigate('編集', {values: item })}
              />
            </Button>
          </Right>
        </ListItem>
    );
  };

  // JSX
  return (
    <>
      {
        tasks.length  === 0
          ? <ListItem>
              <Text >タスクを追加してください</Text>
            </ListItem>
          : categories.map (category => {
              return (
                <List key={category}>
                  <Separator bordered key={`Separator-${category}`}>
                    <Text>{category}</Text>
                  </Separator>
                  {tasksDisplay[category].map ((item, index) => getTaskList(item, index))}
                </List>
              )
            })
      }
    </>
  );

}
