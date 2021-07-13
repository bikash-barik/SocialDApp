import { auth , provider, storage} from "../firebase";
import {SET_USER  , SET_LOADING_STATUS , GET_ARTICLES } from "./actionType";
import db from '../firebase';
import firebase from 'firebase';

export const setUser = (payload) => ({
    type:SET_USER,
    user:payload
});

export const setLoading = (status) => ({
    type:SET_LOADING_STATUS,
    status: status,
});
export const getArticles = (payload) =>({
    type: GET_ARTICLES,
    payload:payload,
});

export function signInAPI() {

    return (dispatch) =>{
        auth
        .signInWithPopup(provider)
        .then((payload)=>{
                dispatch(setUser(payload.user));
                console.log(payload.user);

       //create a realtime database
       var currentUserKey = '';
       var userProfile = {email:'', name:'' , photoURL: ''};
       userProfile.email = payload.user.email;
       userProfile.name  =  payload.user.displayName;
       userProfile.photoURL = payload.user.photoURL;
       
       var db1 = firebase.database().ref('users');
       var flag = false;
       db1.on('value', function (users) {
           users.forEach(function(data){
            var user = data.val();
            console.log(user);
            if (user.email === userProfile.email)
              currentUserKey= data.key 
            flag =true;
           });
           if (flag === false) {
            firebase.database().ref('users').push(userProfile);
           }else {
               
           }
       })
       
       
        })
        .catch((error)=> alert(error.message));
    };
}

export function getUserAuth() {
    return(dispatch) => {
        auth.onAuthStateChanged(async (user) =>{
            if (user){

                dispatch(setUser(user));
            }
        });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() =>{
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        });
    };
}

export function postArticleAPI(payload) {
    return (dispatch) =>{
        dispatch(setLoading(true));

        if ( payload.image !== '' ) {
            const upload = storage.ref(`images/${payload.image.name}`)
            .put(payload.image);
            upload.on('state_change', (snapshot) =>{
         const progress = 
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log(`progress: ${progress}%`);
         if (snapshot.state === 'RUNNING' ) {
             console.log(`progress: ${progress}%`);
         }
        }, error => console.log( error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          console.log(" this much clear");
          console.log(payload);
        db.collection("articles").add({
            actor: {
                description : payload.user.email,
                title: payload.user.displayName,
                date:firebase.firestore.FieldValue.serverTimestamp(),
                image: payload.user.photoURL,
            
            },
            
            video: payload.video,
            sharedImg: downloadURL,
            comments : 0,
            description:payload.description,
        });
        dispatch(setLoading(false));
        }
        );
         
        }else if (payload.video) {
            db.collection('articles').add({
                actor: {
                    description : payload.user.email,
                    title: payload.user.displayName,
                    date:firebase.firestore.FieldValue.serverTimestamp(),
                    image: payload.user.photoURL,
                
                },
                video: payload.video,
                sharedImg: "",
                comments : 0,
                description:payload.description,
            });
            dispatch(setLoading(false));
        }
    };
}
export function getArticlesAPI() {
    return (dispatch) => {
        let payload ;
        db.collection('articles').orderBy('actor.date' , 'desc' )
        .onSnapshot((snapshot) => {
            payload =snapshot.docs.map((doc)=> doc.data());
            //console.log(payload);
            dispatch(getArticles(payload));
        });
    };
}
export function getFrind(){
    var db1 = firebase.database().ref('users');
    var list = '';
    var flag = false;
    db1.on('value', function (users) {
        if (users.hasChildren) {
            
        }
        users.forEach(function(data){
         var user = data.val();
        
         console.log();
         
        });
    })  
}

