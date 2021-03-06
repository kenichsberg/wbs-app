import { RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { Task } from '/domain/Task/';


// ScheduleStack
export type ScheduleStackParamList = {
  TaskList: { task: Task } | undefined;
  CreateTask: { task: Task } | undefined;
  EditTask: { task: Task } | undefined;
};

type TaskListRouteProp = RouteProp<ScheduleStackParamList, 'TaskList'>;
type TaskListNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'TaskList'
>;
export type TaskListProps = {
  route: TaskListRouteProp;
  navigation: TaskListNavigationProp;
};

type CreateTaskRouteProp = RouteProp<ScheduleStackParamList, 'CreateTask'>;
type CreateTaskNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'CreateTask'
>;
export type CreateTaskProps = {
  route: CreateTaskRouteProp;
  navigation: CreateTaskNavigationProp;
};


// ScheduleTab
export type ScheduleTabParamList = {
  LIST: { tasks: Array<Task> };
  CHART: { tasks: Array<Task> };
};

type ListTabRouteProp = RouteProp<ScheduleTabParamList, 'LIST'>;
type ListTabNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ScheduleTabParamList, 'LIST'>,
  StackNavigationProp<ScheduleStackParamList>
>;
export type ListTabProps = {
  route: ListTabRouteProp;
  navigation: ListTabNavigationProp;
};

type ChartTabRouteProp = RouteProp<ScheduleTabParamList, 'CHART'>;
type ChartTabNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ScheduleTabParamList, 'CHART'>,
  StackNavigationProp<ScheduleStackParamList>
>;
export type ChartTabProps = {
  route: ChartTabRouteProp;
  navigation: ChartTabNavigationProp;
};


// SettingsScreen
export type SettingsStackParamList = {
  Settings: undefined;
  Details: undefined;
};

type SettingScreenRouteProp = RouteProp<SettingsStackParamList, 'Settings'>;
type SettingsNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;
export type SettingsProps = {
  route: SettingScreenRouteProp;
  navigation: SettingsNavigationProp;
};
