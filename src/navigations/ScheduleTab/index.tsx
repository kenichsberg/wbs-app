import * as React from 'react';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { useNavigation } from '@react-navigation/native';
import { TaskChartView } from '/screens/TaskChartView';
import { TaskListView } from '/screens/TaskListView';
import { ScheduleTabParamList } from '/navigations/types.tsx';
import { Color } from '/style/Color';
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
        activeTintColor: Color.dark,
        inactiveTintColor: 'grey',
        indicatorStyle: { backgroundColor: Color.dark },
        style: { backgroundColor: Color.white },
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
