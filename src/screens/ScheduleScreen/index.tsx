import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import { TaskListView } from '/screens/TaskListView';
import { TaskCalendarView } from '/screens/TaskCalendarView';
import { TaskListProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';

export type PartialTask = Partial<Task>;

type ViewType = 'LIST' | 'CALENDAR';

export const ScheduleScreen: React.FC<TaskListProps> = ({ navigation, route }) => {

  // プロセスオブジェクトを保持するstate
  const [tasks, setTasks] = React.useState<Array<PartialTask>>([]);

  // ビュー切り替え用state
  const [viewType, setViewType] = React.useState<ViewType>('LIST');

  // 引数を格納する変数
  let param: PartialTask = {};

  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.task) {
      param = route.params.task;

      // idがない場合は採番
      param.id = param.id ?? tasks.length;
      // paramと同じidがある場合は取り除く
      const tasksUnique = tasks.filter(task => task.id !== param.id);
      
      setTasks([...tasksUnique, param]);
    }
  }, [route.params?.task]);


  // ビューの切り替え
  let view: JSX.Element; 
  switch (viewType) {
    case 'LIST':
      view = <TaskListView tasks={tasks} navigation={navigation} />;
      break;
    case 'CALENDAR':
      view = <TaskCalendarView tasks={tasks} />;
      break;
    default:
      view = <Text>error</Text>;
  }

  // JSX
  return (
    <Container>
      <Segment>
        <Button 
          first 
          active={viewType === 'LIST'}
          onPress={() => setViewType('LIST')}
          data-test="list-view-button"
        >
          <Icon name="md-list" />
        </Button>
        <Button 
          last 
          active={viewType === 'CALENDAR'}
          onPress={() => setViewType('CALENDAR')}
          data-test="calendar-view-button"
        >
          <Icon name="md-calendar" />
        </Button>
      </Segment>
      <Content>
        { view }
      </Content>

      <Fab 
        position="bottomRight"
        active={false}
        containerStyle={{ }}
        onPress={() => navigation.navigate('CreateTask')}
        data-test="fab"
      >
        <Icon name="ios-add" />
      </Fab>
    </Container>
  );
}
