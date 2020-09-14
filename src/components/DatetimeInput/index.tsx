import * as React from 'react';
import 'react-native-gesture-handler';
import { Text, Button, ListItem } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Color } from '/style/Color';
import { Moment } from 'moment';


const moment = require('moment');

type Props = {
  value: Moment;
  setDate: (date: Moment) => void;
  withConfirm: (date: Moment) => void;
};


export const DatetimeInput: React.FC<Props> = ({
  value,
  setDate,
  withConfirm
}) => {

  const [isVisible, setVisibility] = React.useState<boolean>(false);

  return (
    <>
      <DateTimePickerModal
        isVisible={ isVisible }
        mode="datetime"
        date={ value.toDate() }
        onConfirm={ (date: Date) => {
          setDate(moment(date));
          withConfirm(moment(date));
          setVisibility(false);
        }}
        onCancel={ () => setVisibility(false) }
        headerTextIOS="選択してください"
        confirmTextIOS="OK"
        cancelTextIOS="キャンセル"
      />
      <ListItem onPress={ () => setVisibility(true) } >
        <Text>
          { moment(value).format('YYYY/MM/DD HH:mm') }
        </Text>
        <Button 
          small
          primary
          transparent
          onPress={ () => setVisibility(true) }
        >
          <Text style={{ fontWeight: '600', color: Color.semiDark }}>
            タップして変更
          </Text>
        </Button>
      </ListItem>
    </>
  );
}
