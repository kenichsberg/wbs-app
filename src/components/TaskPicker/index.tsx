import * as React from 'react';
import 'react-native-gesture-handler';
import { Picker, Icon } from 'native-base';
import { Task } from '/domain/Task/';

type Props = {
  tasks: Array<Task>;
  excludeIds?: Array<string | number | null>;
  defaultValue?: string | number | null;
  setValue: (value: string | number | null) => void;
  withValueChange: (value: string | number | null) => void;
};

export const TaskPicker: React.FC<Props> = ({ 
    tasks, 
    excludeIds = [], 
    defaultValue = null, 
    setValue,
    withValueChange
  }) => {

  const pickerList = tasks.filter(task =>
      !excludeIds.includes(task.id))
    .map(task => ({
      label: `[${task.category}]: ${task.taskName}`, 
      value: task.id
    }));

  return (
    <>
      <Picker
        mode="dropdown"
        iosIcon={ <Icon name="arrow-down" /> }
        style={{ width: undefined }}
        placeholder="選択してください"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={ defaultValue }
        onValueChange={ (value: string | number | null) => {
          setValue(value);
          withValueChange(value);
        }}
      >
        <Picker.Item
          label={ '-----' }
          value={ null }
        />
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
