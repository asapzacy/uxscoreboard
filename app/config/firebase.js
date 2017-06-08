import firebase from 'firebase/app'
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'uxscoreboard.firebaseapp.com',
  databaseURL: 'https://uxscoreboard.firebaseio.com',
  projectId: 'uxscoreboard',
  storageBucket: 'uxscoreboard.appspot.com',
  messagingSenderId: '201013847832'
}

export const ref = firebase.initializeApp(config).database().ref()
