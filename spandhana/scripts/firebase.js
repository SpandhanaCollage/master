// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyARwHHcbBlXYtkRg1-3L_dcudBt8_C85YQ",
    authDomain: "spandhana-collage-blog.firebaseapp.com",
    databaseURL: "https://spandhana-collage-blog.firebaseio.com",
    projectId: "spandhana-collage-blog",
    storageBucket: "spandhana-collage-blog.appspot.com",
    messagingSenderId: "238815691560",
    appId: "1:238815691560:web:cbf802e1bf3702327b861d",
    measurementId: "G-MY58E8Y2V9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const database = firebase.firestore();