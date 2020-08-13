import { RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { Task } from '/screens/CreateTaskScreen';


type ScheduleStackParamList = {
  TaskList: { task: Task } | undefined;
  CreateTask: { task: Task } | undefined;
  EditTask: { task: Task } | undefined;
};

type ScheduleTabParamList = {
  LIST: { task: Task } | undefined;
  CALENDAR: { task: Task } | undefined;
};


type ListTabRouteProp = RouteProp<ScheduleTabParamList, 'LIST'>;

type CalendarTabRouteProp = RouteProp<ScheduleTabParamList, 'CALENDAR'>;

type TaskListRouteProp = RouteProp<ScheduleStackParamList, 'TaskList'>;

type ListTabNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ScheduleTabParamList, 'LIST' >,
  StackNavigationProp<ScheduleStackParamList>
>;

type CalendarTabNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<ScheduleTabParamList, 'CALENDAR' >,
  StackNavigationProp<ScheduleStackParamList>
>;

/*
export type TaskListProps = {
  route: TaskListRouteProp;
  navigation: TaskListNavigationProp;
};
 */


export type ListTabProps = {
  route: ListTabRouteProp;
  navigation: ListTabNavigationProp;
};

export type CalendarTabProps = {
  route: CalendarTabRouteProp;
  navigation: CalendarTabNavigationProp;
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


