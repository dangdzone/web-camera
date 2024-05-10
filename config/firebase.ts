// Cấu hình firebase để xác thực người dùng
'use client'

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_RNof0LmWRRaGGwhWaeI_CFN3fSEfEDM",
  authDomain: "web-camera-6b694.firebaseapp.com",
  projectId: "web-camera-6b694",
  storageBucket: "web-camera-6b694.appspot.com",
  messagingSenderId: "511750761",
  appId: "1:511750761:web:761b4005e01ab72cd4a8f8",
  measurementId: "G-2EHY9YYHLC"
};


const FirebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(FirebaseApp)
export const FirebaseAuth = getAuth(FirebaseApp)