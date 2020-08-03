import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import Svg, { Line, Text } from 'react-native-svg';
import { getDayCount, getActualWorkingHours, parseJsonToMoment, getTimeByDatetime } from '/services/Date/';
import * as constants from '/domain/constants';
import { Task } from '/screens/CreateTaskScreen';

import { Moment } from 'moment';

const moment = require('moment');

type Props = {
  task: Partial<Task>;
  index: number;
  leftEndDate: Moment;
};


const getTermWidth = (startDatetime: Moment, endDatetime: Moment): number => {

  return getDayCount(startDatetime, endDatetime) * constants.DAY_WIDTH;
};


export const GanttRow: React.FC<Props> = ({ task, index, leftEndDate }) => {

  const startPlanned = parseJsonToMoment(task.startDatetimePlanned);
  const endPlanned = parseJsonToMoment(task.endDatetimePlanned);

  /*
  const startResult = parseJsonToMoment(task.startDatetimeResult);
  const endResult = parseJsonToMoment(task.endDatetimeResult);
   */

  const lengthPlanned: number = getTermWidth(startPlanned, endPlanned);

  // 予定開始のX座標
  const xStartPlanned: number = getTermWidth(leftEndDate, startPlanned);
  // 予定終了のX座標
  const xEndPlanned: number = xStartPlanned + lengthPlanned;

  // 実績開始のX座標
  /*
  const xStartResult: number | null = JSON.parse(task.startDatetimeResult) == null
    ? null
    : getTermWidth(leftEndDate, startResult);

  let lengthResult: number | null;
  let xEndResult: number | null;

  if (xStartResult != null) {
    // 実績期間の長さ
    lengthResult = getTermWidth(startResult, endResult);
    // 実績終了のX座標
    xEndResult = xStartResult + lengthResult;
  }
   */

  // 上端の座標
  const yTop: number = 30 + 90 * index;

  return (
    <>
      <Text 
        x={xStartPlanned} 
        y={yTop} 
        fill="white"
      >
        { task.taskName }
      </Text>
      <Line 
        x1={xStartPlanned} 
        y1={yTop + 25} 
        x2={xEndPlanned} 
        y2={yTop + 25} 
        stroke="white" 
        strokeWidth="40" 
      />
      {
        /*
        xStartResult == null
          ? null
          : <Line 
              x1={xStartResult} 
              y1={yTop + 20} 
              x2={xEndResult} 
              y2={yTop + 20} 
              stroke="white" 
              strokeWidth="3" 
            />
         */
      }
    </>
  );
};
