import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Index from 'index';
import ScheduleScreen from '@Screens/ScheduleScreen';
import CreateTaskScreen from '@Screens/CreateTaskScreen';



function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>設定画面</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params ?? '';
  const { otherParam } = route.params ?? '';

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const ScheduleStack = createStackNavigator();

function ScheduleStackScreen() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen name="タスク一覧" component={ScheduleScreen} />
      <ScheduleStack.Screen name="新規作成" component={CreateTaskScreen} />
      <ScheduleStack.Screen name="編集" component={CreateTaskScreen} />
    </ScheduleStack.Navigator>
  )
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="設定" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App(): React.FC {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  async function init() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }

  React.useEffect(() => {
    init();
  }, []);

  if (!isReady) {
    return (
      <View></View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'スケジュール管理') {
              iconName = 'ios-list-box';
            } else if (route.name === '設定') {
              iconName = 'md-settings'
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
            title: 'スケジュール管理'
          }}
        />
        <Tab.Screen name="設定" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

