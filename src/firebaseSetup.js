import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAACJedKqYEBGtZshqT6_BnO2eWtJuoChQ",
    authDomain: "ledger-ee398.firebaseapp.com",
    databaseURL: "https://ledger-ee398.firebaseio.com",
    projectId: "ledger-ee398",
    storageBucket: "ledger-ee398.appspot.com",
    messagingSenderId: "656866228281",
    appId: "1:656866228281:web:cf30f8585c9149c94f75e8",
    measurementId: "G-LWR9BC1M7N"
}

  export const configDatabase = firebase.initializeApp(firebaseConfig);
