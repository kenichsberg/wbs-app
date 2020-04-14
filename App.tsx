import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Index from 'index';

export default function App(): React.FC {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  async function init() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }

  React.useEffect(() => {
    init();
  }, []);

  if (!isReady) {
    return (
      <View></View>
    );
  }

  return (
    <Index/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

