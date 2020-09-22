import * as firebaseApp from 'firebase/app';
import { firebaseConfig } from 'data-access/config/firebaseConfig';
import 'firebase/database';
import 'firebase/auth';

firebaseApp.initializeApp(firebaseConfig);
//firebase.analytics();

export const firebase = firebaseApp;

export const db = firebase.database();
