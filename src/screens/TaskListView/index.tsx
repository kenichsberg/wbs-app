import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import { getFormattedTasks } from '/domain/Task/';
import { ListTabProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';

/*
type Props = 
  {
    parentProps: ListTabProps
  }
  & {
    tasks: Array<Task>;
  };
 */
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

const moment = require('moment');

// 日付（期間）の文字列を取得
const getPeriodString = (jsonDateStart:string = '', jsonDateEnd: string = ''): string => {

  const dateStart = JSON.parse(jsonDateStart);
  const dateEnd = JSON.parse(jsonDateEnd);

  if (dateStart == null && dateEnd == null) {
    return '未入力';
  }

  const dateStartString = dateStart == null 
    ? ''
    : moment(JSON.parse(jsonDateStart)).format('YYYY年MM月DD日 HH:mm');

  const dateEndString = dateEnd == null 
    ? '対応中'
    : moment(JSON.parse(jsonDateEnd)).format('YYYY年MM月DD日 HH:mm');

  return `${ dateStartString } 〜 ${ dateEndString }`;

}



//export const TaskListView: React.FC<Props> = ({ tasks, parentProps }) => {
export const TaskListView: React.FC<Props> = ({ tasks, navigation }) => {

  //const { navigation } = parentProps;

  const { categories, tasksFormatted } = getFormattedTasks(tasks);

  // リスト1つのJSXを取得
  const getTaskList: React.FC<ListItemProps> = ({ item, index, navigation }) => {
    return (
        <ListItem key={ item.id }>
          <Body>
            <Text>{ item.taskName }</Text>
            <Text note>予定：{ getPeriodString(item.startDatetimePlanned, item.endDatetimePlanned) }</Text>
            {/*
            <Text note>実績：{ getPeriodString(item.startDatetimeResult, item.endDatetimeResult) }</Text>
              */}
            <Text note>成果物: { item.selectedDocument }</Text>
          </Body>
          <Right>
            <Button
              transparent
              data-test="edit-button"
              onPress={ () => navigation.navigate('EditTask', { task: item }) }
            >
              <Icon 
                name="ios-create" 
                //style={{ color: 'tomato' }}
                style={{ color: '#912221' }}
              />
            </Button>
          </Right>
        </ListItem>
    );
  };

  // JSX
  return (
    <>
      {
        tasks.length  === 0
          ? <ListItem>
              <Text >タスクを追加してください</Text>
            </ListItem>
          : categories.map(category => {
              return (
                <List key={ category }>
                  <Separator bordered>
                    <Text>{ category }</Text>
                  </Separator>
                  { tasksFormatted[category].map((item, index) => getTaskList({ item, index , navigation})) }
                </List>
              )
            })
      }
    </>
  );

}
