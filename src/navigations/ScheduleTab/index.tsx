import * as React from 'react';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { useNavigation } from '@react-navigation/native';
import { TaskChartView } from '/screens/TaskChartView';
import { TaskListView } from '/screens/TaskListView';
import { ScheduleTabParamList } from '/navigations/types.tsx';
//import { Task } from '/domain/Task/';

/*
type Props = {
  tasks: Array<Task>;
};
 */

const Tab = createMaterialTopTabNavigator<ScheduleTabParamList>();

//export const ScheduleTab: React.FC<Props> = ({ tasks }) => {
export const ScheduleTab: React.FC = () => {

/*
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setParams({
      tasks: tasks,
    });
  }, [navigation]);
 */

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontWeight: '600' },
        activeTintColor: '#1F5E56',
        inactiveTintColor: 'grey',
        indicatorStyle: { backgroundColor: '#1F5E56' },
        style: { backgroundColor: '#f9f9f9' },
      }}
    >
      <Tab.Screen 
        name="LIST" 
        component={ TaskListView }
        options={{
          tabBarLabel: 'リスト',
        }}
      />
      <Tab.Screen 
        name="CHART" 
        component={ TaskChartView }
        options={{
          tabBarLabel: 'チャート',
        }}
      />
    </Tab.Navigator>
  );
}
