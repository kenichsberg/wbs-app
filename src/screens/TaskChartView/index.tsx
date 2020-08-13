import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GanttChart } from '/domain/Gantt/GanttChart';
import { ChartTabProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';

type Props = {
  tasks: Array<Task>;
};


export const TaskChartView: React.FC<Props> = ({ tasks }) => {
  return (
    <GanttChart tasks={ tasks } />
  );
};

