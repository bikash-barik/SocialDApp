import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB-5HD-CoQdd3Pwlv8liDJzYZBKn5iSk74",
    authDomain: "social-react-app-76c4e.firebaseapp.com",
    databaseURL: "https://social-react-app-76c4e-default-rtdb.firebaseio.com",
    projectId: "social-react-app-76c4e",
    storageBucket: "social-react-app-76c4e.appspot.com",
    messagingSenderId: "785193600309",
    appId: "1:785193600309:web:b41ddac44723b56e97f87c"
  };

  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth , provider , storage } ;
  export default db ;
