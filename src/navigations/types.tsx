import { StackScreenProps } from '@react-navigation/stack';

export type ScheduleStackParamList = {
  TaskList: undefined;
  CreateTask: undefined;
  EditTask: undefined;
};

export type TaskListProps = StackScreenProps<ScheduleStackParamList, 'TaskList'>;
export type CreateTaskProps = StackScreenProps<ScheduleStackParamList, 'CreateTask'>;

export type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsProps = StackScreenProps<SettingsStackParamList, 'Settings'>;
