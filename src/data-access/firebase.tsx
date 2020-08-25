import * as firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

//import 'firebase/auth';
import 'firebase/database';
//import 'firebase/firestore';
//import 'firebase/functions';
//import 'firebase/storage';


firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;

export const db = firebase.database();
