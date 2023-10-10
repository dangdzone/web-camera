// Cấu hình firebase để xác thực người dùng
'use client'

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAUwf5pLNrdsYlNp-12988HoHYFczTqcBY",
  authDomain: "client-menu-v1.firebaseapp.com",
  projectId: "client-menu-v1",
  storageBucket: "client-menu-v1.appspot.com",
  messagingSenderId: "212501025453",
  appId: "1:212501025453:web:1d92a37ff08749860aec24",
  measurementId: "G-SVZRM7M7ES"
};


const FirebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(FirebaseApp)
export const FirebaseAuth = getAuth(FirebaseApp)