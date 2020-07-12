import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { FormatTasks } from '/components/FormatTasks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GanttChart } from '/components/GanttChart';
import { TaskListProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';
import { PartialTask } from './index';

type Props = {
  tasks: Array<PartialTask>;
};

const TopTab = createMaterialTopTabNavigator();


export const TaskCalendarView: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = FormatTasks(tasks);

  return (
    <GanttChart tasks={ tasks } />
  );
};

  /*
    <TopTab.Navigator>
      <TopTab.Screen name="Home" component={HomeScreen} />
      <TopTab.Screen name="Settings" component={SettingsScreen} />
    </TopTab.Navigator>
    */

