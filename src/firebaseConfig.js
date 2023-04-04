import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpJu2-3HoBpHHuyDP9MNMYEzhMrDiTa0g",
  authDomain: "arkun-7c012.firebaseapp.com",
  projectId: "arkun-7c012",
  storageBucket: "arkun-7c012.appspot.com",
  messagingSenderId: "631202514966",
  appId: "1:631202514966:web:029f6799866c45da908d37"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);