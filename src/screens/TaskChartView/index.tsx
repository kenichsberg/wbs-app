import * as React from 'react';
import 'react-native-gesture-handler';
import { GanttChart } from '/domain/Gantt/GanttChart';
import { Task } from '/screens/CreateTaskScreen';

type Props = {
  tasks: Array<Task>;
};


export const TaskChartView: React.FC<Props> = ({ tasks }) => {
  return (
    <GanttChart tasks={ tasks } />
  );
};

