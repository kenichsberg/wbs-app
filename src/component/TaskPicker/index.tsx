import * as React from 'react';
import 'react-native-gesture-handler';
import { Label, Picker, Icon } from 'native-base';
import { Task } from '/domain/Task/';

type Props = {
  labelName?: string;
  tasks: Array<Task>;
  excludeIds?: Array<string | number | null>;
  defaultValue?: string | number | null;
  callback: (value: string | number | null) => void;
};

export const TaskPicker: React.FC<Props> = ({ 
    labelName = '先行タスク', 
    tasks, 
    excludeIds = [], 
    defaultValue = null, 
    callback 
  }) => {

  const pickerList = tasks.filter(task =>
      !excludeIds.includes(task.id))
    .map(task => ({
      label: `[${task.category}]: ${task.taskName}`, 
      value: task.id
    }));

  return (
    <>
      <Label>{ labelName }</Label>
      <Picker
        mode="dropdown"
        iosIcon={ <Icon name="arrow-down" /> }
        style={{ width: undefined }}
        placeholder="選択してください"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={ defaultValue }
        onValueChange={ callback }
      >
        {
          pickerList.map(item => {
            return (
              <Picker.Item
                key={ item.value }
                label={ item.label }
                value={ item.value }
              />
            );
          })
        }
      </Picker>
    </>
  );
};
