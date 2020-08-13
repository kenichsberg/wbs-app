import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ScheduleStackScreen } from './ScheduleStack/';
import { SettingsStackScreen } from './SettingsStack/';


const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'スケジュール管理') {
            iconName = 'ios-list-box';
          } else if (route.name === '設定') {
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
        name="スケジュール管理"
        component={ ScheduleStackScreen }
        options={{
          title: 'スケジュール管理',
        }}
      />
      <Tab.Screen name="設定" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};
