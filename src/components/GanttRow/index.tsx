import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { FormatTasks } from '/components/FormatTasks/';
import { getTermWidth } from '/components/getTaskWidth/';
import * as consts from '/components/GanttChart/consts';
import { PartialTask } from '/screens/ScheduleScreen/';

type Props = {
  task: PartialTask;
  index: number;
};


const parseJsonToDate = (jsonDateString: string): Date => {
  return new Date(JSON.parse(jsonDateString));
};


export const GanttRow: React.FC<Props> = ({ task, index }) => {

  const startPlanned = parseJsonToDate(task.startDatetimePlanned);
  const endPlanned = parseJsonToDate(task.endDatetimePlanned);

  const startResult = parseJsonToDate(task.startDatetimeResult);
  const endResult = parseJsonToDate(task.endDatetimeResult);

  //const legthPlanned: number = getTaskWidth(task.taskLength);
  const legthPlanned: number = getTermWidth(startPlanned, endPlanned);

  // 予定開始のX座標
  const xStartPlanned: number = getTermWidth(consts.ORIGIN_DATE, startPlanned);
  // 予定終了のX座標
  const xEndPlanned: number = xStartPlanned + legthPlanned;

  // 実績開始のX座標
  const xStartResult: number | null = JSON.parse(task.startDatetimeResult) == null
    ? null
    : getTermWidth(consts.ORIGIN_DATE, startResult);

  let lengthResult: number | null;
  let xEndResult: number | null;

  if (xStartResult != null) {
    // 実績期間の長さ
    lengthResult = getTermWidth(startResult, endResult);
    // 実績終了のX座標
    xEndResult = xStartResult + lengthResult;
  }

  // 上端の座標
  const yTop: number = 30 + 40 * index;

  return (
    <>
      <Text x={xStartPlanned} y={yTop} fill="white">{task.taskName}</Text>
      <Line x1={xStartPlanned} y1={yTop + 10} x2={xEndPlanned} y2={yTop + 10} stroke="white" strokeWidth="2" />
      {
        xStartResult == null
          ? null
          : <Line x1={xStartResult} y1={yTop + 20} x2={xEndResult} y2={yTop + 20} stroke="white" strokeWidth="3" />
      }
    </>
  );
};
