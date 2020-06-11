import * as React from 'react';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Text, View, Body, Right, Button, Form, Item, Input, Label, Picker, Icon, DatePicker, List, ListItem } from 'native-base';
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CreateTaskProps } from '/navigations/types.tsx';


export type Task = {
  id: number;
  category: string;
  taskName: string;
  startDatetimePlanned: string;
  endDatetimePlanned: string;
  startDatetimeResult: string;
  endDatetimeResult: string;
  selectedDocument: number;
};

type DatePickerVisibilities = {
  startDatetimePlanned: boolean;
  endDatetimePlanned: boolean;
  startDatetimeResult: boolean;
  endDatetimeResult: boolean;
};


export const CreateTaskScreen: React.FC<CreateTaskProps> = ({ navigation, route }) => {
  // id
  const [id, setId] = React.useState<number | null>(null);
  // 分類
  const [category, setCategory] = React.useState<string>('');
  // プロセス名
  const [taskName, setTaskName] = React.useState<string>('');

  // datetime初期値を設定
  const now = new Date;
  now.setMinutes(0);
  // 予定開始日時
  const [startDatetimePlanned, setStartDatetimePlanned] = React.useState<Date>(now);
  // 予定終了日時
  const [endDatetimePlanned, setEndDatetimePlanned] = React.useState<Date>(now);
  // 実績開始日時
  const [startDatetimeResult, setStartDatetimeResult] = React.useState<Date | null>(null);
  // 実績終了日時
  const [endDatetimeResult, setEndDatetimeResult] = React.useState<Date | null>(null);
  // 成果物
  const [selectedDocument, setSelectedDocument] = React.useState<number | null>(null);


  // 日時選択モーダル　表示・非表示
  const [datePickerVisibilities, setDatePickerVisibilities] = React.useState<DatePickerVisibilities>({
    startDatetimePlanned: false,
    endDatetimePlanned: false,
    startDatetimeResult: false,
    endDatetimeResult: false,
  });


  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.task) {
      const values = route.params.task;

      setId(values.id);
      setCategory(values.category);
      setTaskName(values.taskName);
      setStartDatetimePlanned(new Date(JSON.parse(values.startDatetimePlanned)));
      setEndDatetimePlanned(new Date(JSON.parse(values.endDatetimePlanned)));
      setStartDatetimeResult(new Date(JSON.parse(values.startDatetimeResult)));
      setEndDatetimeResult(new Date(JSON.parse(values.endDatetimeResult)));
      setSelectedDocument(values.selectedDocument);

    }
  }, [route.params?.task]);


  // 日時選択モーダルの表示・非表示切り替え
  const handleDatePicker = (shouldShow: boolean, name: string): void => {
    setDatePickerVisibilities({...datePickerVisibilities, [name]: shouldShow});
  };

  // 日時選択モーダル　選択時の処理
  const handleConfirm = (date: Date, name: string): void => {
    const nameToSetStateFunc = new Map([
      ['startDatetimePlanned', setStartDatetimePlanned],
      ['endDatetimePlanned', setEndDatetimePlanned],
      ['startDatetimeResult', setStartDatetimeResult],
      ['endDatetimeResult', setEndDatetimeResult]
    ]);

    const func = nameToSetStateFunc.get(name);
    func(date);

    handleDatePicker(false, name);
  };

  // datetime型入力フィールドを取得
  const getDatetimeInputField = (value: Date, name: string, label: string): JSX.Element => {
    return (
      <Item stackedLabel>
        <Label>{label}</Label>
        <DateTimePickerModal
          isVisible={datePickerVisibilities[name]}
          mode="datetime"
          date={value}
          onConfirm={event => handleConfirm(event, name)}
          onCancel={() => handleDatePicker(false, name)}
          headerTextIOS="選択してください"
          confirmTextIOS="OK"
          cancelTextIOS="キャンセル"
        />
        <ListItem onPress={() => handleDatePicker(true, name)} >
          <Text>
            {moment(value).format('YYYY年MM月DD日 HH:mm')}
          </Text>
          <Button 
            small
            primary
            transparent
            onPress={() => handleDatePicker(true, name)}
          >
            <Text>変更する</Text>
          </Button>
        </ListItem>
      </Item>
    );
  }

  const task: Task = {
    id: id,
    category: category,
    taskName: taskName,
    startDatetimePlanned: JSON.stringify(startDatetimePlanned),
    endDatetimePlanned: JSON.stringify(endDatetimePlanned),
    startDatetimeResult: startDatetimeResult
      ? JSON.stringify(startDatetimeResult)
      : 'null',
    endDatetimeResult: endDatetimeResult
      ? JSON.stringify(endDatetimeResult)
      : 'null',
    selectedDocument: selectedDocument
  };

  // JSX
  return (
    <>
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>分類</Label>
              <Input
                value={category}
                onChangeText={setCategory}
              />
            </Item>
            <Item stackedLabel>
              <Label>プロセス名</Label>
              <Input
                value={taskName}
                onChangeText={setTaskName}
              />
            </Item>

            {getDatetimeInputField(startDatetimePlanned, 'startDatetimePlanned', '予定開始日時')}
            {getDatetimeInputField(endDatetimePlanned, 'endDatetimePlanned', '予定終了日時')}
            {route.params?.task == null
                ? null
                : getDatetimeInputField(startDatetimeResult, 'startDatetimeResult', '実績開始日時')}
            {route.params?.task == null
                ? null
                : getDatetimeInputField(endDatetimeResult, 'endDatetimeResult', '実績終了日時')}

            <Item stackedLabel picker last>
              <Label>成果物</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="選択してください"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selectedDocument}
                onValueChange={event => setSelectedDocument(event)}
              >
                <Picker.Item label="設計書" value="0" />
                <Picker.Item label="単体検査項目" value="1" />
                <Picker.Item label="開発" value="2" />
                <Picker.Item label="総合テスト実績" value="3" />
                <Picker.Item label="移行チェックシート" value="4" />
              </Picker>
            </Item>
          </Form>
          <Button
            data-test="create-button"
            block
            onPress={() => {
              navigation.navigate('TaskList', { task: task });
            }}
            style={{ marginTop: 60 }}
          >
            <Text>作成する</Text>
          </Button>
        </Content>
      </Container>
    </>
  );
}
