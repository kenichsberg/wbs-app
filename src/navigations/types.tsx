import { StackScreenProps } from '@react-navigation/stack';
import { Task } from '/screens/CreateTaskScreen';

export type ScheduleStackParamList = {
  TaskList: { task:Task } | undefined;
  CreateTask: { task: Task } | undefined;
  EditTask: { task: Task } | undefined;
};

export type TaskListProps = StackScreenProps<ScheduleStackParamList, 'TaskList'>;
export type CreateTaskProps = StackScreenProps<ScheduleStackParamList, 'CreateTask'>;

export type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsProps = StackScreenProps<SettingsStackParamList, 'Settings'>;
