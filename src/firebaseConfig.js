import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBXHOJbstgzyFtZkbVDB8za156PMpmW1Z4',
  authDomain: 'blog-399c1.firebaseapp.com',
  projectId: 'blog-399c1',
  storageBucket: 'blog-399c1.appspot.com',
  messagingSenderId: '410055442084',
  appId: '1:410055442084:web:c3d1438addd6ef4cd4b031',
  measurementId: 'G-N7QW216WMS',
};

const app = initializeApp(firebaseConfig);

export const storeDB = getStorage(app);
export const db = getFirestore(app);
