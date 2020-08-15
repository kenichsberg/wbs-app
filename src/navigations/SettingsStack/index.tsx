import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '/screens/SettingsScreen';
import { SettingsStackParamList } from '/navigations/types.tsx';


const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen: React.FC = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}
