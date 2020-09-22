import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, Input } from 'native-base';
import { Color } from '/style/Color';


type Props = {
  manHour: string;
  setManHour: (manHour: string) => void;
  withManHourChange: (manHour: string) => void;
};


export const ManHourInput: React.FC<Props> = ({
  manHour,
  setManHour,
  withManHourChange
})=> {

  const handleManHourFocus = () => {
    if (manHour === '0') {
      setManHour('');
    }
  }

  const handleManHourBlur = () => {
    if (manHour === '') {
      setManHour('0');
      withManHourChange('0');
    }
  };

  return(
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
        onChangeText={ (text: string) => {
          setManHour(text);
          withManHourChange(text);
        }}
        onFocus={ handleManHourFocus }
        onBlur={ handleManHourBlur }
        style={{ textAlign: 'right', paddingRight: 40 }}
      />
      <Text style={{ fontWeight: '500', color: Color.semiDark }}>
        h
      </Text>
    </View>
  );
};
