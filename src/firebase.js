import { initializeApp } from 'firebase';

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyDL0cJw3-4RYHa8reRTSl4VbUANNyWL7ig",
    authDomain: "cleqcolleague.firebaseapp.com",
    databaseURL: "https://cleqcolleague.firebaseio.com/",
    projectId: "cleqcolleague",
    storageBucket: "cleqcolleague.appspot.com",
    messagingSenderId: "363919585209"
});

export const db = app.database();
export const namesRef = db.ref('colleague');