import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Text, View, Body, Right, Button, Form, Item, Input, Label, Picker, Icon, DatePicker, List, ListItem } from 'native-base';
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateProcessScreen({ navigation, route }) {
  // 分類
  const [category, setCategory] = React.useState('');
  // プロセス名
  const [processName, setProcessName] = React.useState('');

  // datetime初期値を設定
  const now = new Date;
  now.setMinutes(0);
  // 開始日時
  const [startDatetime, setStartDatetime] = React.useState(now);
  // 終了日時
  const [endDatetime, setEndDatetime] = React.useState(now);
  // 成果物
  const [selectedDocument, setSelectedDocument] = React.useState('');

  // 開始日時選択モーダル　表示・非表示
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = React.useState(false);
  // 終了日時選択モーダル　表示・非表示
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = React.useState(false);

  // 日時選択モーダルの表示・非表示切り替え
  const handleDatePicker = (shouldShow, type) => {
    switch (type) {
      case 'startDatetime':
        setStartDatePickerVisibility(shouldShow);
        break;
      case 'endDatetime':
        setEndDatePickerVisibility(shouldShow);
        break;
      default:
        break;
    }
  };

  // 日時選択モーダル　選択時の処理
  const handleConfirm = (date, type) => {
    switch (type) {
      case 'startDatetime':
        setStartDatetime(date);
        handleDatePicker(false, 'startDatetime');
        break;
      case 'endDatetime':
        setEndDatetime(date);
        handleDatePicker(false, 'endDatetime');
        break;
      default:
        break;
    }
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
                value={processName}
                onChangeText={setProcessName}
              />
            </Item>
            <Item stackedLabel>
              <Label>予定開始日時</Label>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="datetime"
                date={startDatetime}
                onConfirm={event => handleConfirm(event, 'startDatetime')}
                onCancel={() => handleDatePicker(false, 'startDatetime')}
                headerTextIOS="選択してください"
                confirmTextIOS="OK"
                cancelTextIOS="キャンセル"
              />
              <ListItem>
                <Text>
                  {moment(startDatetime).format('YYYY年MM月DD日 HH:mm')}
                </Text>
                <Button 
                  small
                  transparent
                  onPress={() => handleDatePicker(true, 'startDatetime')} 
                >
                  <Text>変更する</Text>
                </Button>
              </ListItem>
            </Item>
            <Item stackedLabel>
              <Label>予定終了日時</Label>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                date={endDatetime}
                onConfirm={event => handleConfirm(event, 'endDatetime')}
                onCancel={() => handleDatePicker(false, 'endDatetime')}
                headerTextIOS="選択してください"
                confirmTextIOS="OK"
                cancelTextIOS="キャンセル"
              />
              <ListItem>
                <Text>
                  {moment(endDatetime).format('YYYY年MM月DD日 HH:mm')}
                </Text>
                <Button 
                  small
                  transparent
                  onPress={() => handleDatePicker(true, 'endDatetime')} 
                >
                  <Text>変更する</Text>
                </Button>
              </ListItem>
            </Item>
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
            full
            onPress={() => {
              navigation.navigate('工程リスト', {
                create: {
                  [category]: [
                    {
                      categoryName: category,
                      processName: processName,
                      startDatetime: moment(startDatetime).format('YYYY年MM月DD日 HH:mm'),
                      endDatetime: moment(endDatetime).format('YYYY年MM月DD日 HH:mm'),
                      selectedDocument: selectedDocument
                    }
                  ]
                }
              });
            }}
            style={{ marginTop: 30 }}
          >
            <Text>この内容で作成する</Text>
          </Button>
        </Content>
      </Container>
    </>
  );
}
