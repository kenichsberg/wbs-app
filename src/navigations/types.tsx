import { StackScreenProps } from '@react-navigation/stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Task } from '/screens/CreateTaskScreen';

// type of navigator
export type ScheduleStackParamList = {
  TaskList: { task: Task } | undefined;
  CreateTask: { task: Task } | undefined;
  EditTask: { task: Task } | undefined;
};

// type of screen
export type TaskListProps = StackScreenProps<ScheduleStackParamList, 'TaskList'>;
export type CreateTaskProps = StackScreenProps<ScheduleStackParamList, 'CreateTask'>;


// type of navigator
export type ScheduleTabParamList = {
  LIST: { task: Task } | undefined;
  CALENDAR: { task: Task } | undefined;
};

// type of screen
export type ListTabProps = StackScreenProps<ScheduleTabParamList, 'LIST'>;
export type CalendarTabProps = StackScreenProps<ScheduleTabParamList, 'CALENDAR'>;


// type of navigator
export type SettingsStackParamList = {
  Settings: undefined;
};

// type of screen
export type SettingsProps = StackScreenProps<SettingsStackParamList, 'Settings'>;
