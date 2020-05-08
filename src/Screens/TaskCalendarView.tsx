import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';


// 定数
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const paddingX = 20;
const paddingY = 30;

const chartWidth = windowWidth - paddingX * 2;
const chartHeight = windowHeight - paddingY * 2;

const dayWidth = chartWidth / 6;

const factor = 1000 * 60 * 60 * 24;

const getTaskLength = (diffMilliseconds: int): int => {
  const diffDays = diffMilliseconds / factor;
  const int = String(diffDays).split('.')[0];
  const decimal = diffDays - int;
  const ratio = Math.floor(decimal * 24 / 8);

  return int * dayWidth + ratio * dayWidth;
}

export default function TaskCalendarlView(props) {
  // 引数
  const {param, tasks} = props;

  const getGantt = (item, index) => {
    const origin = new Date(2020, 4, 5, 9, 0);
    const legthPlanned = getTaskLength(item.taskLength * 60 * 60 * 1000);
    const xStartPlanned = (item.startDatetimePlanned - origin) / factor * dayWidth;
    const xEndPlanned = xStartPlanned + legthPlanned;
    const xStartResult = (item.startDatetimeResult - origin) / factor * dayWidth;
    const lengthResult = (item.endDatetimeResult - item.startDatetimeResult) / factor * dayWidth;
    const xEndResult = xStartResult + lengthResult;
    const yTop = 30 + 40 * index;
    console.log(item.startDatetimePlanned, origin, item.startDatetimePlanned - origin, xStartPlanned);
    return (
      <>
        <Text x={xStartPlanned} y={yTop} fill="white">{item.taskName}</Text>
        <Line x1={xStartPlanned} y1={yTop + 10} x2={xEndPlanned} y2={yTop + 10} stroke="white" strokeWidth="2" />
        <Line x1={xStartResult} y1={yTop + 20} x2={xEndResult} y2={yTop + 20} stroke="white" strokeWidth="3" />
      </>
    );
  };

  const item ={
    taskName: 'sample Gantt',
    startDatetimePlanned: new Date(2020, 4, 5, 9, 0),
    endDatetimePlanned: new Date(2020, 4, 5, 21, 0),
    startDatetimeResult: new Date(2020, 4, 5, 9, 0),
    endDatetimeResult: new Date(2020, 4, 6, 11, 0),
    taskLength: 12
  };

  // JSX
  return (
    <>
      <View style={{backgroundColor: '#051B26', paddingLeft: paddingX, paddingRight: paddingX, paddingTop: paddingY, paddingButtom: paddingY }}>
        <Svg height="1300" width={windowWidth}>
          {/* 縦線 */}
          {[...Array(7).keys()].map(i => (
            <Line 
              key={i}
              x1={dayWidth * i} 
              y1="0" 
              x2={dayWidth * i} 
              y2={chartHeight} 
              stroke="#3E6B57" 
              strokeWidth="1" 
            />
          ))}
          {/* Gantt */}
          {getGantt(item, 0)}
        </Svg>
      </View>
    </>
  );

}
