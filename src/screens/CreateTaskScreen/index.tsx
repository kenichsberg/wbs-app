import * as React from 'react';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Text, View, Body, Right, Button, Form, Item, Input, Label, Picker, Icon, DatePicker, List, ListItem } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CreateTaskProps } from '/navigations/types.tsx';
import { getManHour, getEndDatetime } from '/services/Task';

const moment = require('moment');

export type Task = {
  id: number;
  category: string;
  taskName: string;
  startDatetimePlanned: string;
  manHour: number;
  endDatetimePlanned: string;
  //startDatetimeResult: string;
  //endDatetimeResult: string;
  selectedDocument: number;
};

type DatePickerVisibilities = {
  startDatetimePlanned: boolean;
  endDatetimePlanned: boolean;
  //startDatetimeResult: boolean;
  //endDatetimeResult: boolean;
};


export const CreateTaskScreen: React.FC<CreateTaskProps> = ({ navigation, route }) => {
  // id
  const [id, setId] = React.useState<number | null>(null);
  // 分類
  const [category, setCategory] = React.useState<string>('');
  // タスク名
  const [taskName, setTaskName] = React.useState<string>('');

  // datetime初期値を設定
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  // 予定開始日時
  const [startDatetimePlanned, setStartDatetimePlanned] = React.useState<Date>(now);
  // 工数
  const [manHour, setManHour] = React.useState<string>('0');
  // 予定終了日時
  const [endDatetimePlanned, setEndDatetimePlanned] = React.useState<Date>(now);
  // 実績開始日時
  //const [startDatetimeResult, setStartDatetimeResult] = React.useState<Date | null>(null);
  // 実績終了日時
  //const [endDatetimeResult, setEndDatetimeResult] = React.useState<Date | null>(null);
  // 成果物
  const [selectedDocument, setSelectedDocument] = React.useState<number | null>(null);


  // 日時選択モーダル　表示・非表示
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
    selectedDocument: selectedDocument
  };


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
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon 
              name="checkmark" 
              style={{ 
                color: '#1F5E56' ,
                marginRight: 5,
              }} 
            />
            <Text style={{ 
                color: '#1F5E56',
                fontWeight: "600",
              }}
            >
               作成
            </Text>
          </View>
        </Button>
      ),
    });
  }, [navigation]);


  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.task) {
      const values: Task = route.params.task;

      setId(values.id);
      setCategory(values.category);
      setTaskName(values.taskName);
      setStartDatetimePlanned(new Date(JSON.parse(values.startDatetimePlanned)));
      setManHour(values.manHour.toString());
      setEndDatetimePlanned(new Date(JSON.parse(values.endDatetimePlanned)));

      /*
      const startDatetimeResult = JSON.parse(values.startDatetimeResult) == null
        ? now
        : new Date(JSON.parse(values.startDatetimeResult));
      setStartDatetimeResult(startDatetimeResult);

      const endDatetimeResult = JSON.parse(values.endDatetimeResult) == null
        ? now
        : new Date(JSON.parse(values.endDatetimeResult));
      setEndDatetimeResult(endDatetimeResult);
       */

      setSelectedDocument(values.selectedDocument);

    }
  }, [route.params?.task]);


  // 日時選択モーダルの表示・非表示切り替え
  const handleDatePicker = (shouldShow: boolean, name: string): void => {
    setDatePickerVisibilities({ ...datePickerVisibilities, [name]: shouldShow });
  };

  // map of name -> setState()
  const nameToSetStateFunc: Map<string, (Date)=>any> = new Map([
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

    setEndDatetimePlanned(endDatetime.toDate());
  }

  // 工数フォーカス時の処理
  const handleManHourFocus = ():void => {
    if (manHour === '0') {
      setManHour('');
    }
  }

  // 日時選択モーダル　選択時の処理
  const handleConfirm = (date: Date, name: string): void => {
    const func = nameToSetStateFunc.get(name);
    func(date);

    handleDatePicker(false, name);
  };

  // datetime型入力フィールドを取得
  const getDatetimeInputField = (value: Date, name: string, label: string): JSX.Element => {
    return (
      <Item stackedLabel>
        <Label>{ label }</Label>
        <DateTimePickerModal
          isVisible={ datePickerVisibilities[name] }
          mode="datetime"
          date={ value }
          onConfirm={ event => handleConfirm(event, name) }
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

            { getDatetimeInputField(startDatetimePlanned, 'startDatetimePlanned', '予定開始日時') }

            <Item stackedLabel>
              <Label>工数</Label>
              <View
                style={{
                  flexDirection: "row",
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

            <Item stackedLabel picker last>
              <Label>成果物</Label>
              <Picker
                mode="dropdown"
                iosIcon={ <Icon name="arrow-down" /> }
                style={{ width: undefined }}
                placeholder="選択してください"
                placeholderStyle={{ color: "#bfc6ea" }}
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
          </Form>
        </Content>
        {/*
        <Button
          data-test="create-button"
          block
          rounded
          onPress={ () => {
            navigation.navigate('TaskList', { task: task });
          }}
          style={{ 
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: '#1F5E56'
          }}
        >
          <Text style={{ fontWeight: "600" }}>作成する</Text>
        </Button>
         */}
      </Container>
    </>
  );
}
