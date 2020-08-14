import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Content, Text,  Icon, Fab } from 'native-base';
import { TaskListView } from '/screens/TaskListView';
import { TaskChartView } from '/screens/TaskChartView';
import { ListTabProps, ChartTabProps } from '/navigations/types.tsx';
import { Task } from '/screens/CreateTaskScreen';


export type ViewType = 'LIST' | 'CHART';

//export const ScheduleScreen: React.FC<ListTabProps | ChartTabProps> = (Props) => {
export const ScheduleScreen: React.FC<ListTabProps | ChartTabProps> = ({ navigation, route }) => {
  //const { navigation, route } = Props;

  /*
  const currentView: ViewType = route.name === 'CHART'
    ? 'CHART'
    : 'LIST';

  // ビュー切り替え用state
  //const [viewType, setViewType] = React.useState<ViewType>(currentView);
  const [viewType, setViewType] = React.useState<ViewType>(route.name);
   */

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
    case 'CHART':
      view = <TaskChartView tasks={ tasks } />;
      break;
    default:
      view = <Text>error</Text>;
  }
   */
  /*
  const isListTab = (props: any): props is ListTabProps => 
    props.navigation && props.route.name === 'LIST';

  const isChartTab = (props: any): props is ChartTabProps => 
    props.navigation && props.route.name === 'CHART';

  if (isListTab(Props)) {
    view = <TaskListView tasks={ tasks } parentProps={ Props } />;

  } else if (isChartTab(Props)) {
    view = <TaskChartView tasks={ tasks } />;

  } else {
    view = <Text>error</Text>;

  }
   */
  const isListTabNavigation = (props: ListTabProps['navigation'] | ChartTabProps['navigation']): props is ListTabProps['navigation'] => 
    props.navigate && route.name === 'LIST';

  const isChartTabNavigation = (props: ListTabProps['navigation'] | ChartTabProps['navigation']): props is ChartTabProps['navigation'] => 
    props.navigate && route.name === 'CHART';

  if (isListTabNavigation(navigation)) {
    view = <TaskListView tasks={ tasks } navigation={ navigation } />;

  } else if (isChartTabNavigation(navigation)) {
    view = <TaskChartView tasks={ tasks } />;

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
          active={ viewType === 'CHART' }
          onPress={ () => setViewType('CHART') }
          data-test="chart-view-button"
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
