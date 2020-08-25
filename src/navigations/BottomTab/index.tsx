import * as React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ScheduleStackScreen } from '/navigations/ScheduleStack/';
import { SettingsStackScreen } from '/navigations/SettingsStack/';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Schedule') {
            iconName = 'ios-list-box';
          } else if (route.name === 'Settings') {
            iconName = 'md-settings';
          }

          // You can return any component that you like here!
          return <Ionicons name={ iconName } size={ size } color={ color } />;
        },
      })}
      tabBarOptions={{
        //activeTintColor: 'tomato',
        activeTintColor: '#912221',
        inactiveTintColor: 'gray',
        labelStyle: { fontWeight: '600' },
        style: { backgroundColor: '#f9f9f9' },
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ ScheduleStackScreen }
        options={{
          title: 'スケジュール管理',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStackScreen}
        options={{
          title: '設定',
        }}
      />
    </Tab.Navigator>
  );
};
