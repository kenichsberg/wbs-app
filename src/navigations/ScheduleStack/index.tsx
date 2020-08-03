import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Button, Text, Icon } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleTab } from '/navigations/ScheduleTab';
import { ScheduleScreen } from '/screens/ScheduleScreen';
import { CreateTaskScreen } from '/screens/CreateTaskScreen';
import { ScheduleStackParamList } from '/navigations/types.tsx';


const ScheduleStack = createStackNavigator<ScheduleStackParamList>();

export const ScheduleStackScreen: React.FC = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen 
        name="TaskList" 
        //component={ ScheduleScreen }
        component={ ScheduleTab }
        options={{
          headerTitle: 'タスク一覧',
        }}
      />
      <ScheduleStack.Screen 
        name="CreateTask" 
        component={ CreateTaskScreen }
        options={{
          headerTitle: '新規タスク作成',
          /*
          headerRight: () => (
            <Button
              data-test="create-button"
              hasText
              transparent
              onPress={ ({ navigation, route }): void => {
                navigation.navigate('TaskList', { task: task });
              }}
              style={{ 
                marginRight: 20,
              }}
            >
              <View style={{ 
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Icon 
                  name="checkmark" 
                  style={{ 
                    color: '#1F5E56' ,
                    marginRight: 5,
                  }} 
                />
                <Text style={{ 
                    color: '#1F5E56',
                    fontWeight: "600",
                  }}
                >
                   作成
                </Text>
              </View>
            </Button>
          ),
           */
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
