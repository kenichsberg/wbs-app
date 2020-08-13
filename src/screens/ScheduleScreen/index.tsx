import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import { TaskListView } from '/screens/TaskListView';
import { TaskCalendarView } from '/screens/TaskCalendarView';
import { ListTabProps, CalendarTabProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';


export type ViewType = 'LIST' | 'CALENDAR';

//export const ScheduleScreen: React.FC<ListTabProps | CalendarTabProps> = (Props) => {
export const ScheduleScreen: React.FC<ListTabProps | CalendarTabProps> = ({ navigation, route }) => {
  //const { navigation, route } = Props;

  const currentView: ViewType = route.name === 'CALENDAR'
    ? 'CALENDAR'
    : 'LIST';

  // ビュー切り替え用state
  //const [viewType, setViewType] = React.useState<ViewType>(currentView);
  const [viewType, setViewType] = React.useState<ViewType>(route.name);

  // プロセスオブジェクトを保持するstate
  const [tasks, setTasks] = React.useState<Array<Task>>([]);

  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.task) {
      const param: Task = route.params.task;

      // idがない場合は採番
      param.id = param.id ?? tasks.length;
      // paramと同じidがある場合は取り除く
      const tasksUnique = tasks.filter(task => task.id !== param.id);
      
      setTasks([...tasksUnique, param]);
    }
  }, [route.params?.task]);


  // ビューの切り替え
  let view: JSX.Element; 
  /*
  switch (viewType) {
    case 'LIST':
      view = <TaskListView tasks={ tasks } navigation={ navigation } />;
      break;
    case 'CALENDAR':
      view = <TaskCalendarView tasks={ tasks } />;
      break;
    default:
      view = <Text>error</Text>;
  }
   */
  /*
  const isListTab = (props: any): props is ListTabProps => 
    props.navigation && props.route.name === 'LIST';

  const isCalendarTab = (props: any): props is CalendarTabProps => 
    props.navigation && props.route.name === 'CALENDAR';

  if (isListTab(Props)) {
    view = <TaskListView tasks={ tasks } parentProps={ Props } />;

  } else if (isCalendarTab(Props)) {
    view = <TaskCalendarView tasks={ tasks } />;

  } else {
    view = <Text>error</Text>;

  }
   */
  const isListTabNavigation = (props: any): props is ListTabProps['navigation'] => 
    props.navigate && route.name === 'LIST';

  const isCalendarTabNavigation = (props: any): props is CalendarTabProps['navigation'] => 
    props.navigate && route.name === 'CALENDAR';

  if (isListTabNavigation(navigation)) {
    view = <TaskListView tasks={ tasks } navigation={ navigation } />;

  } else if (isCalendarTabNavigation(navigation)) {
    view = <TaskCalendarView tasks={ tasks } />;

  } else {
    view = <Text>error</Text>;

  }


  // JSX
  return (
    <Container>
      {/*
      <Segment>
        <Button 
          first 
          active={ viewType === 'LIST' }
          onPress={ () => setViewType('LIST') }
          data-test="list-view-button"
        >
          <Icon name="md-list" />
        </Button>
        <Button 
          last 
          active={ viewType === 'CALENDAR' }
          onPress={ () => setViewType('CALENDAR') }
          data-test="calendar-view-button"
        >
          <Icon name="md-calendar" />
        </Button>
      </Segment>
        */}
      <Content>{ view }</Content>

      <Fab 
        position="bottomRight"
        active={ false }
        containerStyle={{ }}
        onPress={ () => navigation.navigate('CreateTask') }
        data-test="fab"
        style={{
          backgroundColor: '#1F5E56'
        }}
      >
        <Icon name="ios-add" />
      </Fab>
    </Container>
  );
}
