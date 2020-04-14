import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Content, List, ListItem, CheckBox, Body, Text, Item, Input, Button, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function ToDoList(): React.FC {

  type ListItem = {
    checked: boolean;
    text: string;
  };

  const [toDoList, setToDoList] = useState<ListItem[] | null>([
    {
      checked: false,
      text: '',
    }
  ]);

  const [doneList, setDoneList] = useState<ListItem[] | null>([]);

  const handleInput = (text: string, item: ListItem, index: number): void => {
    switch(item['checked']) {
      case false:
        toDoList[index]['text'] = text;
        setToDoList([...toDoList]);
        break;
      case true:
        doneList[index]['text'] = text;
        setDoneList([...doneList]);
        break;
      default:
        break;
    }
  };

  const addNewItem = (): void => {
    setToDoList([
      ...toDoList, 
      {
        checked: false,
        text: '',
      }
    ]);
  };

  const deleteItem = (item: ListItem, number: number): void => {
    let newList = [];
    switch(item['checked']) {
      case false:
        newList = toDoList.filter((toDo: ListItem[], index: number): ListItem[] => index !== number );
        setToDoList(newList);
        break;
      case true:
        newList = doneList.filter((done: ListItem[], index: number): ListItem[] => index !== number )
        setDoneList(newList);
        break;
      default:
        break;
    }
  };

  const toggleChecked = (item: ListItem, number: number): void => {
    let filteredList = [];
    switch(item['checked']) {
      case false:
        filteredList = toDoList.filter((toDo: ListItem[], index: number): ListItem[] => index !== number );
        setToDoList(filteredList);
        setDoneList([
          ...doneList,
          {
            checked: true,
            text: item['text'],
          }
        ]);
        break;
      case true:
        filteredList = doneList.filter((done: ListItem[], index: number): ListItem[] => index !== number );
        setDoneList(filteredList);
        setToDoList([
          ...toDoList,
          {
            checked: false,
            text: item['text'],
          }
        ]);
        break;
      default:
        break;
    }
    
  };

  const makeList = (targetItems: ListItem[]) => {
    return targetItems.map((element: ListItem, index: number) => {
      const item = targetItems[index];
      return (
        <ListItem key={ index }>
          <CheckBox 
            checked={ item['checked'] }
            onPress={ () => toggleChecked(element, index) }
          />
          <Body>
            <Item>
              <Input
                value={ item['text'] }
                onChangeText={ (text: string) => handleInput(text, element, index) }
                textDecorationLine={ item['checked'] ? "line-through" : "" }
              />
            </Item>
          </Body>
          <Button 
            transparent
            onPress={ () => deleteItem(element, index) }
          >
            <Icon name='ios-close' />
          </Button>
        </ListItem>
      );
    });
  };

  console.log(toDoList, doneList);

  return (
    <>
      <List>
        { makeList(toDoList) }
        <ListItem key="button">
          <Button 
            light
            onPress={ () => addNewItem() }
          >
            <Icon name='ios-add' />
          </Button>
        </ListItem>
      </List>
      <List>
        { makeList(doneList) }
      </List>
    </>
  );
}

