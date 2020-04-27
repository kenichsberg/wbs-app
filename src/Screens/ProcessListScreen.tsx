import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Segment, Content, View, Body, Right, Text, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';

const getProcessList = (item, index) => {
  return (
      <ListItem key={`ListItem-${index}`}>
        <Body>
          <Text>{item.processName}</Text>
          <Text note>予定：{item.startDatetime}〜{item.endDatetime}</Text>
          <Text note>実績：{item.startDatetime}〜{item.endDatetime}</Text>
          <Text note>成果物: {item.selectedDocument}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="ios-create" />
          </Button>
        </Right>
      </ListItem>
  );
};


export default function ProcessListScreen({ navigation, route }) {
  // プロセスリストを保持するstate
  const [processes, setProcesses] = React.useState({});

  let param = {};
  // 引数を受け取った時の処理
  React.useEffect(() => {
    if (route.params?.create) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      param = route.params.create;

      const paramKey = Object.keys(param)[0];

      paramKey in processes
        ? setProcesses({...processes, [paramKey]:[...processes[paramKey], ...param[paramKey]]})
        : setProcesses({...processes, [paramKey]:[...paramKey]});
    }
  }, [route.params?.create]);

  console.log(processes);

  const keys = Object.keys(processes);

  const processList = param === {}
          ? <View></View>
          : keys.map (key => {
              return (
                <List key={key}>
                  <Separator bordered key={`Separator-${key}`}>
                    <Text>{key}</Text>
                  </Separator>
                  {processes[key].map ((item, index) => getProcessList(item, index))}
                </List>
              )
            });
  console.log(processList, keys);

  return (
    <Container>
      <Segment>
        <Button first active>
          <Icon name="md-list" />
        </Button>
        <Button last>
          <Icon name="md-calendar" />
        </Button>
      </Segment>
      <Content>
        { processList }
      </Content>

      <Fab 
        position="bottomRight"
        active={false}
        direction=""
        containerStyle={{ }}
        large
        primary
        onPress={() => navigation.navigate('新規作成')}
      >
        <Icon name="ios-add" secondary />
      </Fab>
    </Container>
  );
}
