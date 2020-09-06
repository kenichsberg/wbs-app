import * as React from 'react';
import 'react-native-gesture-handler';
import { AppStateContext } from '/contexts/AppStateContext';
import { Container, Content, Text, View, Button, Form, Item, Input, Label, Icon, ListItem } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CreateTaskProps } from '/navigations/types.tsx';
import { parseJsonToMoment } from '/services/Date/'; 
import { getManHour, getEndDatetime } from '/services/Task/';
import { Task } from '/domain/Task/';
import { TaskPicker } from '/component/TaskPicker/';
import { Moment } from 'moment';
import { Color } from '/style/Color';


const moment = require('moment');

type DatePickerVisibilities = {
  [key: string]: boolean,
  startDatetimePlanned: boolean;
  endDatetimePlanned: boolean;
  //startDatetimeResult: boolean;
  //endDatetimeResult: boolean;
};


export const CreateTaskScreen: React.FC<CreateTaskProps> = ({ navigation, route }) => {

  const { tasks } = React.useContext(AppStateContext);

  // id
  const [id, setId] = React.useState<string | number | null>(null);
  // 分類
  const [category, setCategory] = React.useState<string>('');
  // タスク名
  const [taskName, setTaskName] = React.useState<string>('');
  // 先行タスクid
  const [predecessorTaskId, setPredecessorTaskId] = React.useState<string | number | null>(null);

  // datetime init value
  const now = moment(new Date()).minute(0).second(0);

  // 予定開始日時
  const [startDatetimePlanned, setStartDatetimePlanned] = React.useState<Moment>(now);
  // 工数
  const [manHour, setManHour] = React.useState<string>('0');
  // 予定終了日時
  const [endDatetimePlanned, setEndDatetimePlanned] = React.useState<Moment>(now);
  // 実績開始日時
  //const [startDatetimeResult, setStartDatetimeResult] = React.useState<Moment | null>(null);
  // 実績終了日時
  //const [endDatetimeResult, setEndDatetimeResult] = React.useState<Moment | null>(null);
  // 成果物
  //const [selectedDocument, setSelectedDocument] = React.useState<number | undefined>(undefined);
  //const [selectedDocument, setSelectedDocument] = React.useState<number | null>(null);


  // 日時選択モーダル表示・非表示
  const [datePickerVisibilities, setDatePickerVisibilities] = React.useState<DatePickerVisibilities>({
    startDatetimePlanned: false,
    endDatetimePlanned: false,
    //startDatetimeResult: false,
    //endDatetimeResult: false,
  });

  const task: Task = {
    id: id,
    category: category,
    taskName: taskName,
    predecessorTaskId: predecessorTaskId,
    startDatetimePlanned: JSON.stringify(startDatetimePlanned),
    manHour: parseFloat(manHour),
    endDatetimePlanned: JSON.stringify(endDatetimePlanned),
    /*
    startDatetimeResult: startDatetimeResult
      ? JSON.stringify(startDatetimeResult)
      : 'null',
    endDatetimeResult: endDatetimeResult
      ? JSON.stringify(endDatetimeResult)
      : 'null',
     */
    //selectedDocument: selectedDocument
  };


  // 引数を受け取った時の処理
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

      /*
      const startDatetimeResult = JSON.parse(task.startDatetimeResult) == null
        ? now
        : new Date(JSON.parse(task.startDatetimeResult));
      setStartDatetimeResult(startDatetimeResult);

      const endDatetimeResult = JSON.parse(task.endDatetimeResult) == null
        ? now
        : new Date(JSON.parse(task.endDatetimeResult));
      setEndDatetimeResult(endDatetimeResult);
       */

      //setSelectedDocument(task.selectedDocument);

    }
  }, [route.params?.task]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          data-test="create-button"
          hasText
          transparent
          onPress={ (): void => {
            navigation.navigate('TaskList', { task: task });
          }}
          style={{ 
            marginRight: 20,
          }}
        >
          <View style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Icon 
              name="checkmark" 
              style={{ 
                color: Color.headerButton,
                marginRight: 5,
              }} 
            />
            <Text style={{ 
                color: Color.headerButton,
                fontWeight: '800',
              }}
            >
              作成
            </Text>
          </View>
        </Button>
      ),
    });
  }, [navigation, task]);


  // 日時選択モーダルの表示・非表示切り替え
  const handleDatePicker = (shouldShow: boolean, name: string): void => {
    setDatePickerVisibilities({ ...datePickerVisibilities, [name]: shouldShow });
  };

  // map of name -> setState()
  const nameToSetStateFunc: Map<string, (arg0: Moment) => void> = new Map([
    ['startDatetimePlanned', setStartDatetimePlanned],
    ['endDatetimePlanned', setEndDatetimePlanned],
    //['startDatetimeResult', setStartDatetimeResult],
    //['endDatetimeResult', setEndDatetimeResult]
  ]);

  // 工数入力時の処理
  const handleManHourInput = (text: string): void => {
    setManHour(text);
    if (isNaN(parseFloat(text))) return;

    const endDatetime = getEndDatetime(moment(startDatetimePlanned, 'YYYY-MM-DD HH:mm:ss'), parseFloat(text));

    setEndDatetimePlanned(endDatetime);
  }

  // 工数フォーカス時の処理
  const handleManHourFocus = (): void => {
    if (manHour === '0') {
      setManHour('');
    }
  }

  // 終了日時入力時の処理
  const handleDatetimeInput = (date: Moment, name: string): void => {
    const startDatetime = name === 'startDatetimePlanned'
      ? moment(date, 'YYYY-MM-DD HH:mm:ss')
      : moment(startDatetimePlanned, 'YYYY-MM-DD HH:mm:ss');

    const endDatetime = name === 'endDatetimePlanned'
      ? moment(date, 'YYYY-MM-DD HH:mm:ss')
      : moment(endDatetimePlanned, 'YYYY-MM-DD HH:mm:ss');

    const hour = getManHour(startDatetime, endDatetime);

    setManHour(hour.toString());
  };

  // 日時選択モーダル選択時の処理
  const handleConfirm = (date: Moment, name: string): void => {
    const func: ((arg0: Moment) => void) | undefined  = nameToSetStateFunc.get(name);

    if (func === undefined) return;

    func(date);

    handleDatetimeInput(date, name);

    handleDatePicker(false, name);
  };

  // datetime型入力フィールドを取得
  const getDatetimeInputField = (value: Moment, name: string, label: string): JSX.Element => {
    return (
      <Item stackedLabel>
        <Label>{ label }</Label>
        <DateTimePickerModal
          isVisible={ datePickerVisibilities[name] }
          mode="datetime"
          date={ value.toDate() }
          onConfirm={ event => handleConfirm(moment(event), name) }
          onCancel={ () => handleDatePicker(false, name) }
          headerTextIOS="選択してください"
          confirmTextIOS="OK"
          cancelTextIOS="キャンセル"
        />
        <ListItem onPress={ () => handleDatePicker(true, name) } >
          <Text>
            { moment(value).format('YYYY年MM月DD日 HH:mm') }
          </Text>
          <Button 
            small
            primary
            transparent
            onPress={ () => handleDatePicker(true, name) }
          >
            <Text style={{ fontWeight: '600', color: '#8FAFC4' }}>タップして変更</Text>
          </Button>
        </ListItem>
      </Item>
    );
  }

  // JSX
  return (
    <>
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
              <TaskPicker
                tasks={ tasks }
                excludeIds={ [task.id] }
                defaultValue={ task.predecessorTaskId }
                callback={ setPredecessorTaskId }
              />
            </Item>


            { getDatetimeInputField(startDatetimePlanned, 'startDatetimePlanned', '予定開始日時') }

            <Item stackedLabel>
              <Label>工数</Label>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  paddingRight: 120,
                  alignItems: 'center'
                }}
              >
                <Input
                  keyboardType="decimal-pad"
                  value={ manHour }
                  //onChangeText={ setManHour }
                  onChangeText={ handleManHourInput }
                  onFocus={ handleManHourFocus }
                  style={{ textAlign: 'right', paddingRight: 40 }}
                />
                <Text style={{ fontWeight: '600', color: '#6B453E' }}>h</Text>
              </View>
            </Item>

            { getDatetimeInputField(endDatetimePlanned, 'endDatetimePlanned', '予定終了日時') }
            {/*
            { route.params?.task == null
                ? null
                : getDatetimeInputField(startDatetimeResult, 'startDatetimeResult', '実績開始日時') }
            { route.params?.task == null
                ? null
                : getDatetimeInputField(endDatetimeResult, 'endDatetimeResult', '実績終了日時') }
              */}

            {/*
            <Item stackedLabel picker last>
              <Label>成果物</Label>
              <Picker
                mode="dropdown"
                iosIcon={ <Icon name="arrow-down" /> }
                style={{ width: undefined }}
                placeholder="選択してください"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={ selectedDocument }
                onValueChange={ event => setSelectedDocument(event) }
              >
                <Picker.Item label="設計書" value="0" />
                <Picker.Item label="単体検査項目" value="1" />
                <Picker.Item label="開発" value="2" />
                <Picker.Item label="総合テスト実績" value="3" />
                <Picker.Item label="移行チェックシート" value="4" />
              </Picker>
            </Item>
              */}
          </Form>
        </Content>
      </Container>
    </>
  );
}
