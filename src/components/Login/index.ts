import { githubConfig } from '/data-access/config/githubConfig';
import 'firebase/auth';
import { AuthSession } from 'expo';


const REDIRECT_URL = AuthSession.getRedirectUrl();

const githubFields = ['user', 'public_repo'];

const authUrlWithId = (id: string, fields: string[]): string => {
  return 'https://github.com/login/oauth/authorize' +
    `?client_id=${ id }` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    `&scope=${ encodeURIComponent(fields.join(' ')) }`;
}

const createTokenWithCode = async (code: string) => {

  const url = 'https://github.com/login/oauth/access_token' +
    `?client_id=${ githubConfig.id }` +
    `&client_secret=${ githubConfig.secret }` +
    `&code=${ code }`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  
  return res.json();
}


export const getGithubToken = async (): Promise<string | null> => {
  try {
    AuthSession.dismiss()

    const result = await AuthSession.startAsync({
      authUrl: authUrlWithId(githubConfig.id, githubFields),
    });

    if (result.type !== 'success') return null;

    if (result.params.error) {
      const { error, error_discription } = result.params;

      throw new Error(`GitHub Auth: ${ error } ${ error_discription }`);
    }

    const res = await createTokenWithCode(result.params.code);

    return res.access_token;

  } catch (error) {
    console.log(error);
    return null;
  }
};
