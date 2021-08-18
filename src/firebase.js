import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyDHcP3x0HRA48PB2MubK7sUN_gDnuXcyWo",
    authDomain: "sisters-farm-website.firebaseapp.com",
    projectId: "sisters-farm-website",
    storageBucket: "sisters-farm-website.appspot.com",
    messagingSenderId: "308172499517",
    appId: "1:308172499517:web:e5992f490f41be20729854",
    measurementId: "G-TJD7KH17EE"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default };