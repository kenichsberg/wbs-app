import * as React from 'react';
import { View, Text, Button } from 'native-base';
import { SettingsProps } from '/navigations/types.tsx';

export const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>設定画面</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
