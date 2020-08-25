import * as React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppNavigator } from '/navigations/AppNavigator';
import { AppStateProvider } from '/contexts/AppStateContext';


export const Root: React.FC = () => { 
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
    return <View></View>;
  }

  return (
    <AppStateProvider>
      <AppNavigator />
    </AppStateProvider>
  );
}
