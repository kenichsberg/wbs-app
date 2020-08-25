import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//import { ScheduleTab } from '/navigations/ScheduleTab';
import { ScheduleScreen } from '/screens/ScheduleScreen';
import { CreateTaskScreen } from '/screens/CreateTaskScreen';
import { ScheduleStackParamList } from '/navigations/types.tsx';


const ScheduleStack = createStackNavigator<ScheduleStackParamList>();

export const ScheduleStackScreen: React.FC = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen 
        name="TaskList" 
        component={ ScheduleScreen }
        options={{
          headerTitle: 'タスク一覧',
        }}
      />
      <ScheduleStack.Screen 
        name="CreateTask" 
        component={ CreateTaskScreen }
        options={{
          headerTitle: '新規タスク作成',
        }}
      />
      <ScheduleStack.Screen 
        name="EditTask" 
        component={ CreateTaskScreen }
        options={{
          headerTitle: 'タスク編集',
        }}
      />
    </ScheduleStack.Navigator>
  );
}
