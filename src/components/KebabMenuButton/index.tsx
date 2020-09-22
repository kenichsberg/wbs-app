import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Alert, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import { Text, Button, Icon ,Card, CardItem, Body } from 'native-base';
import { useHeaderHeight } from '@react-navigation/stack';
import { Color } from '/style/Color';
import { firebase } from '/data-access/firebase';


type KebabMenuButtonProps = {
  onPress: (() => void);
};

type MenuOptionsProps = {
  visible: boolean;
  onBackdropPress: (() => void);
};


export const KebabMenuButton: React.FC<KebabMenuButtonProps> = ({ onPress }) => {

  return (
    <>
      <Button 
        data-test="create-button"
        hasText
        transparent
        onPress={ onPress }
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
            name="more-vertical" 
            type="Feather"
            style={{ 
              color: Color.white,
              marginRight: 5,
            }} 
          />
        </View>
      </Button>
    </>
  );
};


export const MenuOptions: React.FC<MenuOptionsProps> = ({ visible, onBackdropPress }) => {
  const headerHeight = useHeaderHeight();

  return (
    <Modal 
      transparent={ true }
      visible={ visible }
      animationType="fade"
      onRequestClose={ onBackdropPress }
    >  
      <TouchableOpacity
        activeOpacity={1} 
        onPressOut={ onBackdropPress }
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Card
            style={{
              marginTop: headerHeight,
              width: 150,
              height: 50,
              backgroundColor: Color.white,
            }}
          >
            <TouchableWithoutFeedback>
              <CardItem>
                <Body
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={ () => confirmLogout() }
                  >
                    <Text>ログアウト</Text>
                  </TouchableOpacity>
                </Body>
              </CardItem>
            </TouchableWithoutFeedback>
          </Card>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};


const confirmLogout = () => 
  Alert.alert(
    'ログアウト',
    'ログアウトします。よろしいですか？',
    [
      { text: 'OK', onPress: () => firebase.auth().signOut() },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      }
    ],
    { cancelable: true }
  );
