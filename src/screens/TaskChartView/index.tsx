import * as React from 'react';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { GanttChart } from '/domain/Gantt/GanttChart';
//import { Task } from '/domain/Task/';
import { AppStateContext } from '/contexts/AppStateContext';

/*
type Props = {
  tasks: Array<Task>;
};
 */


//export const TaskChartView: React.FC<Props> = ({ tasks }) => {
export const TaskChartView: React.FC = () => {
  const { tasks } = React.useContext(AppStateContext);

  return (
    <ScrollView>
      <GanttChart tasks={ tasks } />
    </ScrollView>
  );
};
