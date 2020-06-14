import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { FormatTasks } from '/components/FormatTasks';
import { PartialTask } from '/screens/ScheduleScreen';

type Props = {
  tasks: Array<PartialTask>;
};


// 定数
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const paddingX = 20;
const paddingY = 30;

// グラフ領域のサイズ
const chartWidth = windowWidth - paddingX * 2;
const chartHeight = windowHeight - paddingY * 2;

// １日あたりの幅
const dayWidth = chartWidth / 6;

// milliSeconds -> days 換算
const factor = 1000 * 60 * 60 * 24;


// 期間の長さに応じて、画面上のグラフの長さを計算する
const getTaskLength = (diffMilliseconds: number): number => {
  const diffDays: number = diffMilliseconds / factor;
  //const int = String(diffDays).split('.')[0];
  const diffDaysInt: number = parseInt(String(diffDays));
  const diffDaysDecimal: number = diffDays - diffDaysInt;
  const lastDayRatio: number = Math.floor(diffDaysDecimal * 24 / 8);

  return diffDaysInt * dayWidth + lastDayRatio * dayWidth;
}


export const GanttChart: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = FormatTasks(tasks);

  const getGantt = (item, index) => {
    // 左端日付
    const origin: Date = new Date(2020, 4, 5, 9, 0);
    const legthPlanned: number = getTaskLength(item.taskLength * 60 * 60 * 1000);
    // 予定開始のX座標
    const xStartPlanned: number = (item.startDatetimePlanned.getTime() - origin.getTime()) / factor * dayWidth;
    // 予定終了のX座標
    const xEndPlanned: number = xStartPlanned + legthPlanned;
    // 実績開始のX座標
    const xStartResult: number = (item.startDatetimeResult.getTime() - origin.getTime()) / factor * dayWidth;
    // 実績期間の長さ
    const lengthResult: number = (item.endDatetimeResult - item.startDatetimeResult) / factor * dayWidth;
    // 実績終了のX座標
    const xEndResult: number = xStartResult + lengthResult;
    // 上端の座標
    const yTop: number = 30 + 40 * index;
    console.log(item.startDatetimePlanned, origin, item.startDatetimePlanned.getTime() - origin.getTime(), xStartPlanned);

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
      <View style={{backgroundColor: '#051B26', paddingLeft: paddingX, paddingRight: paddingX, paddingTop: paddingY, paddingBottom: paddingY }}>
        <Svg height="1300" width={windowWidth}>
          {/* 縦線 */}
          { 
            [...Array(7).keys()].map(i => (
              <Line 
                key={i}
                x1={dayWidth * i} 
                y1="0" 
                x2={dayWidth * i} 
                y2={chartHeight} 
                stroke="#3E6B57" 
                strokeWidth="1" 
              />
            ))
          }
          {/* Gantt */}
          {getGantt(item, 0)}
        </Svg>
      </View>
    </>
  );

}
