// import firebase  from 'firebase/app'
// import 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyAihsF-90Je7ETJf2OodDQo72CHjU7Nwfw",
//     authDomain: "otp-send-hiyafashion.firebaseapp.com",
//     projectId: "otp-send-hiyafashion",
//     storageBucket: "otp-send-hiyafashion.appspot.com",
//     messagingSenderId: "372642342777",
//     appId: "1:372642342777:web:9981776d0ca7491ae9b1a8",
//     measurementId: "G-BQTNX7E2YQ"
// };

// firebase.initializeApp(firebaseConfig);
// export default  firebase


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAihsF-90Je7ETJf2OodDQo72CHjU7Nwfw",
  authDomain: "otp-send-hiyafashion.firebaseapp.com",
  projectId: "otp-send-hiyafashion",
  storageBucket: "otp-send-hiyafashion.appspot.com",
  messagingSenderId: "372642342777",
  appId: "1:372642342777:web:9981776d0ca7491ae9b1a8",
  measurementId: "G-BQTNX7E2YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider} ;
// const analytics = getAnalytics(app);