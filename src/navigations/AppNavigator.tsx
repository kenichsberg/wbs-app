import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ScheduleScreen } from '/screens/ScheduleScreen';
import { CreateTaskScreen } from '/screens/CreateTaskScreen';
import { SettingsScreen } from '/screens/SettingsScreen';
import { ScheduleStackParamList } from '/navigations/types.tsx';
import { SettingsStackParamList } from '/navigations/types.tsx';


const ScheduleStack = createStackNavigator<ScheduleStackParamList>();

const ScheduleStackScreen: React.FC = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen name="TaskList" component={ScheduleScreen} />
      <ScheduleStack.Screen name="CreateTask" component={CreateTaskScreen} />
      <ScheduleStack.Screen name="EditTask" component={CreateTaskScreen} />
    </ScheduleStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackScreen: React.FC = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'スケジュール管理') {
            iconName = 'ios-list-box';
          } else if (route.name === '設定') {
            iconName = 'md-settings';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
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