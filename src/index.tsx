import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Left, Body, Title, Right, Content, List, ListItem, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ToDoList from '@components/toDoList';

export default function Contents(): React.FC {
  return (
    <Container>
      <Header>
        <Left></Left>
        <Body>
          <Title>ToDoアプリ1</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <ToDoList />
      </Content>
    </Container>
  );
}

