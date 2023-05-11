// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOvG_LFdPhn4LADY2XmZz7HUx5h0ncD3k",
  authDomain: "taskmanagerstudentproject.firebaseapp.com",
  projectId: "taskmanagerstudentproject",
  storageBucket: "taskmanagerstudentproject.appspot.com",
  messagingSenderId: "279481926865",
  appId: "1:279481926865:web:08035d19149893a18171f0",
  measurementId: "G-YT6E7D3DWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);

//ja nesto dodao
// initializeApp({
//   serviceAccountId: 'firebase-adminsdk-6yimq@taskmanagerstudentproject.iam.gserviceaccount.com',
// });
export {auth};
