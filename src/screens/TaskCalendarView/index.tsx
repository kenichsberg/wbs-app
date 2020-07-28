import * as React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { getFormattedTasks } from '/domain/Task/';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GanttChart } from '/domain/Gantt/GanttChart';
import { TaskListProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';

type Props = {
  tasks: Array<Partial<Task>>;
};

const TopTab = createMaterialTopTabNavigator();


export const TaskCalendarView: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = getFormattedTasks(tasks);

  return (
    <GanttChart tasks={ tasks } />
  );
};

