import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import { TaskListView } from '/screens/ScheduleScreen/TaskListView';
import { TaskCalendarView } from '/screens/ScheduleScreen/TaskCalendarView';


export const ScheduleScreen: React.FC = ({ navigation, route }) => {

  // プロセスオブジェクトを保持するstate
  const [tasks, setTasks] = React.useState([]);

  // ビュー切り替え用state
  const [viewType, setViewType] = React.useState('LIST');

  // 引数を格納する変数
  let param = {};

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

  // リストビュー
  const taskList = <TaskListView tasks={tasks} navigation={navigation} />;

  // カレンダービュー
  const calendar = <TaskCalendarView tasks={tasks} />;

  // JSX
  return (
    <Container>
      <Segment>
        <Button 
          first 
          active={viewType === 'LIST'}
          onPress={() => setViewType('LIST')}
        >
          <Icon name="md-list" />
        </Button>
        <Button 
          last 
          active={viewType === 'CALENDAR'}
          onPress={() => setViewType('CALENDAR')}
        >
          <Icon name="md-calendar" />
        </Button>
      </Segment>
      <Content>
        { 
          viewType === 'LIST'
            ? taskList 
            : calendar
        }
      </Content>

      <Fab 
        position="bottomRight"
        active={false}
        containerStyle={{ }}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Icon name="ios-add" />
      </Fab>
    </Container>
  );
}
