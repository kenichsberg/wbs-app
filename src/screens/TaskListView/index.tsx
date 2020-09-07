import * as React from 'react';
import 'react-native-gesture-handler';
import { AppStateContext } from '/contexts/AppStateContext';
import { ScrollView } from 'react-native';
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



//export const TaskListView: React.FC<ListTabProps> = ({ navigation, route }) => {
export const TaskListView: React.FC<Props> = ({ navigation }) => {

  //const { tasks } = route.params;
  const { tasks } = React.useContext(AppStateContext);
  console.log(tasks);

  const { categories, tasksFormatted } = getFormattedTasks(tasks);

  // リスト1つのJSXを取得
  const getTaskList: React.FC<ListItemProps> = ({ item, navigation }) => {
    return (
        <ListItem key={ item.id }>
          <Body>
            <Text>{ item.taskName }</Text>
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text note>
                Start：{ getDateString(item.startDatetimePlanned) }
              </Text>
              <Text note>
                End  ：{ getDateString(item.endDatetimePlanned) }
              </Text>
              {/*
              <Text note>成果物: { item.selectedDocument }</Text>
                */}
            </View>
          </Body>
          <Right>
            <Button
              transparent
              data-test="edit-button"
              onPress={ () => navigation.navigate('EditTask', { task: item }) }
            >
              <Icon 
                name="ios-create" 
                style={{ color: Color.semiLight }}
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
