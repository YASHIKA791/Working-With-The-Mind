// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import {getAuth,signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjhBpqc_Hcx0oqJLno0BGNkKlPCu17WJA",
    authDomain: "working-with-the-mind.firebaseapp.com",
    databaseURL: "https://working-with-the-mind-default-rtdb.firebaseio.com",
    projectId: "working-with-the-mind",
    storageBucket: "working-with-the-mind.appspot.com",
    messagingSenderId: "100441606725",
    appId: "1:100441606725:web:d72a9938a45863c59d312c"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
signin.addEventListener('click',(e)=>{
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    const dt = new Date();
     update(ref(database, 'users/' + user.uid),{
      last_login: dt,
    })

     alert('User loged in!');
    window.location.href ="/" ;
    // ...
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
});

});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
if (user) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/firebase.User
const uid = user.uid;
// ...
} else {
// User is signed out
// ...
}
});


forgotPass.addEventListener('click',(e)=>{
e.preventDefault();
const email = document.getElementById("email").value
sendPasswordResetEmail(auth,email)
.then(() => {
    alert("Reset link sent to your email id")
})
.catch((error) => {
    const errorCode = error.code;
const errorMessage = error.message;
    document.getElementById("error").innerHTML = error.message
});
});