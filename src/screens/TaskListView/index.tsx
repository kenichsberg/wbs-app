import * as React from 'react';
import 'react-native-gesture-handler';
import { AppStateContext } from '/contexts/AppStateContext';
import { ScrollView, TouchableOpacity } from 'react-native';
import { View, Body, Right, Text, Button, List, ListItem, Icon } from 'native-base';
import { getFormattedTasks } from '/domain/Task/';
import { Task } from '/domain/Task/';
import { ListTabProps } from '/navigations/types.tsx';
import { parseJsonToMoment } from '/services/Date/'; 
import { Color } from '/style/Color';


type Props = 
  {
    navigation: ListTabProps['navigation']
  }
  & {
    tasks: Array<Task>;
  };

type ListItemProps = {
  item: Task,
  index: number,
  navigation: ListTabProps['navigation']
};


const getDateString = (jsonDate = '"null"'): string => {
  if (jsonDate === '"null"') {
    return '-';
  }

  const date = parseJsonToMoment(jsonDate);
  
  return date.format('YYYY/MM/DD HH:mm');
};



export const TaskListView: React.FC<Props> = ({ navigation }) => {

  const { tasks, setTasks } = React.useContext(AppStateContext);

  const { categories, tasksFormatted } = getFormattedTasks(tasks);

  // リスト1つのJSXを取得
  const getTaskList: React.FC<ListItemProps> = ({ item, navigation }) => {
    return (
        <ListItem key={ item.id }>
          <Body>
            <TouchableOpacity
              data-test="edit-button"
              onPress={ () => navigation.navigate('EditTask', { task: item }) }
            >
              <Text>{ item.taskName }</Text>
              <View style={{ marginLeft: 20, marginTop: 5 }}>
                <Text note>
                  Start：{ getDateString(item.startDatetimePlanned) }
                </Text>
                <Text note>
                  End  ：{ getDateString(item.endDatetimePlanned) }
                </Text>
              </View>
            </TouchableOpacity>
          </Body>
          <Right>
            <Button
              transparent
              data-test="delete-button"
              onPress={ () => {
                const newTasks = tasks.filter(
                  task => task.id !== item.id
                );
                setTasks(newTasks);
              }}
            >
              <Icon 
                name="trash" 
                style={{ color: Color.red }}
              />
            </Button>
          </Right>
        </ListItem>
    );
  };

  return (
    <ScrollView>
      {
        tasks.length  === 0
          ? <ListItem>
              <Text >タスクを追加してください</Text>
            </ListItem>
          : categories.map(category => {
              return (
                <List key={ category }>
                  <ListItem itemDivider>
                    <Text>{ category }</Text>
                  </ListItem>
                  { 
                    tasksFormatted[category].map((item, index) => {
                      return (
                        getTaskList({ item, index , navigation})
                      );
                    })
                  }
                </List>
              )
            })
      }
    </ScrollView>
  );

}
