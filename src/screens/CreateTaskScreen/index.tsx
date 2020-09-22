import * as React from 'react';
import 'react-native-gesture-handler';
import { AppStateContext } from '/contexts/AppStateContext';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { CreateTaskProps } from '/navigations/types.tsx';
import { parseJsonToMoment } from '/services/Date/'; 
import { getManHour, getEndDatetime } from '/services/Task/';
import { Task, getTaskById } from '/domain/Task/';
import { TaskPicker } from '/components/TaskPicker/';
import { DatetimeInput } from '/components/DatetimeInput/';
import { ManHourInput } from '/components/ManHourInput/';
import { HeaderSaveButton } from '/components/HeaderSaveButton/';
import { Moment } from 'moment';


const moment = require('moment');


export const CreateTaskScreen: React.FC<CreateTaskProps> = ({ navigation, route }) => {

  const { tasks } = React.useContext(AppStateContext);

  const [id, setId] = React.useState<string | number | null>(null);

  const [category, setCategory] = React.useState<string>('');

  const [taskName, setTaskName] = React.useState<string>('');

  const [predecessorTaskId, setPredecessorTaskId] = React.useState<string | number | null>(null);


  // datetime init value
  const now = moment(new Date()).minute(0).second(0);

  const [startDatetimePlanned, setStartDatetimePlanned] = React.useState<Moment>(now);

  const [manHour, setManHour] = React.useState<string>('0');

  const [endDatetimePlanned, setEndDatetimePlanned] = React.useState<Moment>(now);


  const task: Task = {
    id: id,
    category: category,
    taskName: taskName,
    predecessorTaskId: predecessorTaskId,
    startDatetimePlanned: JSON.stringify(startDatetimePlanned),
    manHour: parseFloat(manHour),
    endDatetimePlanned: JSON.stringify(endDatetimePlanned),
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderSaveButton
          task={ task }
          navigation={ navigation }
        />
      ),
    });
  }, [navigation, task]);


  React.useEffect(() => {
    if (route.params?.task) {
      const task: Task = route.params.task;

      setId(task.id);
      setCategory(task.category);
      setTaskName(task.taskName);
      setPredecessorTaskId(task.predecessorTaskId);
      setStartDatetimePlanned(parseJsonToMoment(task.startDatetimePlanned));
      setManHour(task.manHour?.toString() ?? '');
      setEndDatetimePlanned(parseJsonToMoment(task.endDatetimePlanned));
    }
  }, [route.params?.task]);


  const setDatetimeByPredecessorTask = (
    tasks: Array<Task>,
    manHour: string
  ) => (
    taskId: string | number | null
  ): void => {

    const predecessorTask = getTaskById(taskId, tasks);
    if (predecessorTask === undefined) return;

    const startDatetime = parseJsonToMoment(predecessorTask.endDatetimePlanned);

    setStartDatetimePlanned(startDatetime);
    setEndDatetimeByManHour(startDatetime)(manHour);
  };

  const setEndDatetimeByManHour = (
    startDatetime: Moment
  ) => (manHour: string): void => {
    if (isNaN(parseFloat(manHour))) return;

    const endDatetime = getEndDatetime(
      moment(startDatetime, 'YYYY-MM-DD HH:mm:ss'),
      parseFloat(manHour)
    );

    setEndDatetimePlanned(endDatetime);
  };

  const setManHourByDatetime = (
    startDatetime: Moment | undefined,
    endDatetime: Moment | undefined
  ) => ( date: Moment ): void => {

    startDatetime = startDatetime ?? date;
    endDatetime = endDatetime ?? date;

    const hour = getManHour(startDatetime, endDatetime);

    setManHour(hour.toString());
  };


  return (
    <Container>
      <Content padder>
        <Form>

          <Item stackedLabel>
            <Label>分類</Label>
            <Input
              value={ category }
              onChangeText={ setCategory }
              style={{ textAlign: 'center' }}
            />
          </Item>

          <Item stackedLabel>
            <Label>タスク名</Label>
            <Input
              value={ taskName }
              onChangeText={ setTaskName }
              style={{ textAlign: 'center' }}
            />
          </Item>
          
          <Item stackedLabel>
            <Label>先行タスク</Label>
            <TaskPicker
              tasks={ tasks }
              excludeIds={ [task.id] }
              defaultValue={ task.predecessorTaskId }
              setValue={ setPredecessorTaskId }
              withValueChange={ 
                setDatetimeByPredecessorTask(tasks, manHour) 
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>予定開始日時</Label>
            <DatetimeInput
              value={ moment(startDatetimePlanned) }
              setDate={ setStartDatetimePlanned }
              withConfirm={ 
                setManHourByDatetime(
                  undefined,
                  endDatetimePlanned
                ) 
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>工数</Label>
            <ManHourInput 
              manHour={ manHour }
              setManHour={ setManHour }
              withManHourChange={ 
                setEndDatetimeByManHour(startDatetimePlanned) 
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>予定終了日時</Label>
            <DatetimeInput
              value={ moment(endDatetimePlanned) }
              setDate={ setEndDatetimePlanned }
              withConfirm={ 
                setManHourByDatetime(
                  startDatetimePlanned,
                  undefined
                ) 
              }
            />
          </Item>

        </Form>
      </Content>
    </Container>
  );
}
