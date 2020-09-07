import * as React from 'react';
import 'react-native-gesture-handler';
import { Container, Icon, Fab } from 'native-base';
import { ScheduleTab } from '/navigations/ScheduleTab';
import { TaskListProps } from '/navigations/types';
import { Task } from '/domain/Task/';
import { AppStateContext } from '/contexts/AppStateContext';
import { db } from '/data-access/firebase';
import { Color } from '/style/Color';


const tasksRef = db.ref('tasks/');

export const ScheduleScreen: React.FC<TaskListProps> = ({ navigation, route }) => {
  const { setTasks } = React.useContext(AppStateContext);
  
  /*
  const handleTaskRefChange = React.useCallback((arg) => {
    setTasks(arg);
  }, []);
   */

  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.task) {
      const param: Task = route.params.task;

      // idがない場合は採番
      param.id = param.id ?? tasksRef.push().key;

      const updates = {
        ['' + param.id]: param
      };

      tasksRef.update(updates);
    }

    tasksRef.on('value', (snapshot) => {
      const tasksStore = snapshot.val() ?? [];
      console.log('tasksStore', tasksStore);
      setTasks(Object.values(tasksStore));
      //handleTaskRefChange(Object.values(tasksStore));
    });
    /*
    tasksRef.once('value')
      .then((snapshot) => {
      const tasksStore = snapshot.val() ?? [];
      console.log('tasksStore', tasksStore);
      setTasks(Object.values(tasksStore));
      //handleTaskRefChange(Object.values(tasksStore));
    });
     */

    return () => tasksRef.off('value');

  }, [route.params?.task]);


  return (
    <Container>
      <ScheduleTab/>
      <Fab 
        position="bottomRight"
        active={ false }
        containerStyle={{ }}
        onPress={ () => navigation.navigate('CreateTask') }
        data-test="fab"
        style={{
          backgroundColor: Color.light
        }}
      >
        <Icon name="ios-add" />
      </Fab>
    </Container>
  );
}
