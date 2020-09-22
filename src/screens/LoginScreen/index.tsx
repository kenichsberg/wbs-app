import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Button } from 'native-base';
import { getGithubToken } from '/components/Login/';
import { firebase } from '/data-access/firebase';
import { UserCredential } from '@firebase/auth-types/';


export const LoginScreen: React.FC = () => {

const loginWithGithub = async (param: undefined | string)
  : Promise<undefined | UserCredential> => 
{
  try {
    const token = param ??  await getGithubToken();
    console.log('token: ', token);

    if (!token) return undefined;

    AsyncStorage.setItem('githubToken', token);

    const credential = await firebase.auth.GithubAuthProvider.credential(token);
    console.log('credential: ', credential);

    return firebase.auth().signInWithCredential(credential);

  } catch (error) {
    console.log(error);
    return undefined;

  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ログイン画面</Text>
      <Button
        onPress={ () => loginWithGithub(undefined) }
      >
        <Text>GitHubログイン</Text>
      </Button>
    </View>
  );
}
