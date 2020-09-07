import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, Button, Icon } from 'native-base';
import { Task } from '/domain/Task/';
import { CreateTaskProps } from '/navigations/types.tsx';
import { Color } from '/style/Color';


type Props = {
  task: Task
  navigation: CreateTaskProps['navigation'];
};


export const HeaderSaveButton: React.FC<Props> = ({ task, navigation })=> (
  <Button 
    data-test="create-button"
    hasText
    transparent
    onPress={ () => {
      navigation.navigate('TaskList', { task: task });
    }}
    style={{ 
      marginRight: 20,
    }}
  >
    <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Icon 
        name="checkmark" 
        style={{ 
          color: Color.headerButton,
          marginRight: 5,
        }} 
      />
      <Text style={{ 
          color: Color.headerButton,
          fontWeight: '800',
        }}
      >
        作成
      </Text>
    </View>
  </Button>
);
