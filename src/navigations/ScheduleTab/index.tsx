import * as React from 'react';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScheduleScreen } from '/screens/ScheduleScreen';
import { ScheduleTabParamList } from '/navigations/types.tsx';

const Tab = createMaterialTopTabNavigator<ScheduleTabParamList>();

export const ScheduleTab: React.FC = () => {
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
        component={ ScheduleScreen }
        options={{
          tabBarLabel: 'リスト',
        }}
      />
      <Tab.Screen 
        name="CHART" 
        component={ ScheduleScreen }
        options={{
          tabBarLabel: 'チャート',
        }}
      />
    </Tab.Navigator>
  );
}
