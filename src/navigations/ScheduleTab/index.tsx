import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Button, Text, Icon } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '/screens/ScheduleScreen';
import { TaskListView } from '/screens/TaskListView';
import { TaskCalendarView } from '/screens/TaskCalendarView';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
        name="CALENDAR" 
        component={ ScheduleScreen }
        options={{
          tabBarLabel: 'チャート',
        }}
      />
    </Tab.Navigator>
  );
}
