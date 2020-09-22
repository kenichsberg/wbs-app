import * as React from 'react';
import { AppLoading } from 'expo';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@firebase/auth-types/';
import { AppNavigator } from '/navigations/AppNavigator';
import { AppStateProvider } from '/contexts/AppStateContext';
import { LoginScreen } from '/screens/LoginScreen/';
import { firebase } from '/data-access/firebase';

import '/data-access/fixtimerbug';


export const Root: React.FC = () => { 
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const init = async() => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }

  React.useEffect(() => {
    init();

    firebase.auth().onAuthStateChanged((user: User | null) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <AppStateProvider>
      <AppNavigator />
    </AppStateProvider>
  );
}
